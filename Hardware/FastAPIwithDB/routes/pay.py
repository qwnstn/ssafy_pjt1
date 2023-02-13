from asyncio import run
from datetime import datetime

import requests
from fastapi import APIRouter, Request

from core.config import BASE_URL, KIOSK_ID
from crud.crud import create_shopping
from routes.kiosk import cardInfo, productInfo, reset_info
from routes.models import CardId, GuestCardInfo

router = APIRouter(
    prefix="/api/pay", # url 앞에 고정적으로 붙는 경로추가
) # Route 분리


@router.post("/member")
def 키오스크_회원_결제요청(request: Request, cardId: CardId):
    data = run(request.json())
    cardId = data["cardId"]
    # testdata
    userId = cardInfo["userId"]
    kioskId = KIOSK_ID
    date = str(datetime.now().strftime("%Y-%m-%dT%H:%M:%S")),
    # shopping = [
    #     {
    #         "productId": 1234, 
    #         "itemName" : "노트북",
    #         "count" :3,
    #         "price": 20000,
    #     },
	# 	{
	# 		"productId": 134,
	# 		"itemName" : "과자",
	# 		"count" :5,
	# 		"price": 30000,
	# 	},
    # ]
    shopping = list()
    byingdict = dict()
    for prd in productInfo:
        if prd["name"] in byingdict.keys():
            byingdict[prd["name"]][1] += 1
        else:
            byingdict[prd["name"]] = [prd['productId'], 1, prd['price']]
    for itemName, value, price in byingdict.items():
        productId, count, price = value
        shopping.append({
            "productKioskId": productId,
            "itemName" : itemName,
            "count": count,
            "price": price,
        })
    priceSum = 0
    for product in shopping:
        priceSum += product["price"] * product["count"]
    # spring 요청
    url = BASE_URL + "/api/pay/member"
    payload = {
        "userId" : userId,
        "kioskId" : kioskId,
        "cardId" : cardId,
        "date" : date,
        "priceSum" : priceSum,
        "shopping" : shopping
    }
    r = requests.post(url, data=payload)
    print(r.status_code)
    if r.status_code == 200:
        reset_info()
        create_shopping(shoppings=shopping, date=date)


@router.post("/guest")
def 키오스크_비회원_결제요청(request: Request, cardInfo: GuestCardInfo):
    kioskId = KIOSK_ID
    date = str(datetime.now().strftime("%Y-%m-%dT%H:%M:%S"))
    shopping = list()
    byingdict = dict()
    for prd in productInfo:
        if prd["name"] in byingdict.keys():
            byingdict[prd["name"]][1] += 1
        else:
            byingdict[prd["name"]] = [prd['productId'], 1, prd['price']]
    for itemName, value, price in byingdict.items():
        productId, count, price = value
        shopping.append({
            "productKioskId": productId,
            "itemName" : itemName,
            "count": count,
            "price": price,
        })
    priceSum = 0
    for product in shopping:
        priceSum += product["price"] * product["count"]
    # spring 요청
    url = BASE_URL + "/api/pay/guest"
    payload = {
        "kioskId" : kioskId,
        "cardInfo" : cardInfo,
        "date" : date,
        "priceSum" : priceSum,
        "shopping" : shopping
    }
    r = requests.post(url, data=payload)
    print(r.status_code)
    if r.status_code == 200:
        reset_info()
        create_shopping(shoppings=shopping, date=date)