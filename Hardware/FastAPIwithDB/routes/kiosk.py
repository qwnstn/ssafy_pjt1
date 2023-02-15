import asyncio
import json

import requests
from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from core.config import BASE_URL, KIOSK_ID
from crud.crud import select_products_with_rfid
from db.connection import get_db
from functions.barcode_test import SessionStorage
from functions.serial_test import RFID_Serial_Trans
from routes.models import BarcodeList, CardId, CardList, RFIDList
from routes.websocket import send

sessionStore = SessionStorage()

router = APIRouter(
    prefix="/api/kiosk",  # url 앞에 고정적으로 붙는 경로추가
)  # Route 분리
cardInfo = {
    "userId": 123,
    "defaultCardId": 3,
    "cardList": [{
        "cardId": 2,
        "cardName": "현대",
        "cardNo": "1234"
    },
        {
        "cardId": 3,
        "cardName": "ibk",
        "cardNo": "8513"
    },
        {
        "cardId": 4,
        "cardName": "우리",
        "cardNo": "9128"
    }]
}
productInfo = [{
    "productId": 4234,
    "name": "꺼깔콘",
    "price": 3000,
    "rfid": "3124875",
    "barcode": None,
    "image": "img.jpg",
    "isAdult": False
},
    {
    "productId": 5137,
    "name": "바밤바",
    "price": 3000,
    "rfid": None,
    "barcode": "8803154372",
    "image": "img.jpg",
    "isAdult": False
},
    {
    "productId": 4124,
    "name": "커카콜라",
    "price": 3110,
    "rfid": "3116875",
    "barcode": None,
    "image": "img.jpg",
    "isAdult": False
}]


def reset_info():
    global cardInfo, productInfo
    cardInfo = dict()
    productInfo = list()


@router.get("")
def 키오스크_아이디(request: Request):
    # reset_info()
    asyncio.run(sessionStore.startThread())
    return {"kioskId": KIOSK_ID}


@router.post("/qr")
def 키오스크_QR읽기(request: Request):
    userInfo = asyncio.run(request.json())
    url = f"{BASE_URL}/api/user/qr"
    headers = {
        "Authorization": f"Bearer {userInfo['token']}",
        # "Content-Type": "applicaation/json"
    }
    payload = {
        "kioskId": KIOSK_ID,
        "datetime": int(userInfo["datetime"])
    }
    r = requests.post(url=url, headers=headers, json=payload, )
    if r.status_code == 200:
        print("정상적인 QR코드")
        asyncio.run(send("next"))
    else:
        print("이딴걸 QR이라고 보냈냐", r.status_code)


@router.post("/cardinfo")
def 카드정보전송(request: Request, CardList: CardList):
    global cardInfo
    cardInfo = asyncio.run(request.json())
    return {"message": "OK"}


@router.get("/rfid")
def RFID_리딩(request: Request, db: Session = Depends(get_db)):
    # RFID 시작
    rfid_uids = asyncio.run(RFID_Serial_Trans().main())
    # rfid 상품정보를 이용해서 DB 조회
    products = select_products_with_rfid(rfid_uids, db)
    global productInfo
    productInfo = products
    asyncio.run(send(json.dumps({
        "userId": cardInfo["userId"],
        "defaultCardId": cardInfo["defaultCardId"],
        "cardList": cardInfo["cardList"],
        "itemList": products,
    })))



# @router.post("/rfid")
# def 장바구니_상품담기_RFID(request: Request, RFIDList: RFIDList):
#     data = asyncio.run(request.json())
#     kioskId = data["kioskId"]   # 꼭 필요한가?
#     rfid_list = data["rfid"]    # 문자열 리스트
#     ###
#     # 웹소켓 자리
#     ###
#     return {"message": "미완성 API"}


# @router.post("/barcode")
# def 장바구니_상품담기_Barcode(request: Request, BarcodeList: BarcodeList):
#     data = asyncio.run(request.json())
#     kioskId = data["kioskId"]   # 꼭 필요한가?
#     barcode = data["barcode"]   # 문자열 1개
#     ###
#     # 웹소켓 자리
#     ###
#     return {"message": "미완성 API"}


@router.get("/cardinfo")
def 카드리스트_요청(request: Request):
    return {"cardInfo": cardInfo}
