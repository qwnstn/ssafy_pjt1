import asyncio
import json
from datetime import datetime

import requests
from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from core.config import BASE_URL, KIOSK_ID
from crud.crud import select_products_with_rfid
from db.connection import get_db
from functions.barcode_test import SessionStorage
from routes.models import BarcodeList, CardId, CardList, RFIDList
from routes.websocket import send

try:
    from functions.serial_test import RFID_Serial_Trans
except:
    pass


sessionStore = SessionStorage()

router = APIRouter(
    prefix="/api/kiosk",  # url 앞에 고정적으로 붙는 경로추가
)  # Route 분리
cardInfo = {
	"userId" : 123,
	"defaultCardId" : 3,
	"cardList" : [{
		"cardId" : 2,
		"cardName" : "현대",
		"cardNo" : "1234"
	},
	{
		"cardId" : 3,
		"cardName" : "ibk",
		"cardNo" : "8513"
	}, 
	{
		"cardId" : 4,
		"cardName" : "우리",
		"cardNo" : "9128"
	}]
}
productInfo = [{
		"productId" : 4234,
		"name" : "꺼깔콘",
		"price" :3000,
		"rfid": "3124875",
		"barcode" : None,
		"image":"img.jpg",
		"isAdult" : False
	},
	{
		"productId" : 5137,
		"name" : "바밤바",
		"price" :3000,
		"rfid": None,
		"barcode" : "8803154372",
		"image":"img.jpg",
		"isAdult" : False
	},
	{
		"productId" : 4124,
		"name" : "커카콜라",
		"price" :3110,
		"rfid": "3116875",
		"barcode" : None,
		"image":"img.jpg",
		"isAdult" : False
	}]

def reset_info():
    global cardInfo, productInfo
    cardInfo = dict()
    productInfo = list()


@router.get("")
def 키오스크_아이디(request: Request):
    asyncio.run(sessionStore.startThread())
    return {"kioskId": KIOSK_ID}


@router.post("/cardinfo")
def 카드정보전송(request: Request, CardList: CardList):
    global cardInfo
    cardInfo = asyncio.run(request.json())
    return {"message": "OK"}


@router.get("/rfid")
def RFID_리딩(request: Request, db: Session = Depends(get_db)):
    # RFID 시작
    try:
        rfid_uids = asyncio.run(RFID_Serial_Trans().main())
    except:
        rfid_uids = list()
    # rfid 상품정보를 이용해서 DB 조회
    querys = select_products_with_rfid(rfid_uids, db)
    products = list()
    for q in querys:
        prd = dict()
        prd['productId'] = q.product_id
        prd['name'] = q.name
        prd['price'] = q.price
        # prd['rfid'] = q.rfid
        # prd['barcode'] = q.barcode
        # prd['image'] = q.image
        products.append(prd)
    global productInfo
    productInfo = products
    return {
        "userId" : cardInfo["userId"],
        "defaultCardId" : cardInfo["defaultCardId"],
        "cardList" : cardInfo["cardList"],
        "itemList": products,
    }


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
