import asyncio

import websockets

from core.config import WEBSOCKET_URL


async def sendMsg(message: str):
    async with websockets.connect(WEBSOCKET_URL) as websocket:
        await websocket.send(message)
    await websocket.close()

if __name__ == "__main__":
    try:
        WEBSOCKET_URL
    except:
        WEBSOCKET_URL = "ws://192.168.30.202:8080"
    asyncio.run(sendMsg('{"userId" : 123,"defaultCardId" : 3,"cardList" : [{"cardId" : 3,"cardName" : "ibk","cardNo" : "8513"}], "itemList": [{"name": "꺼깔콘", "price": 3000}, {"name": "꺼깔콘", "price": 3000}, {"name": "꺼깔콘", "price": 3000}, {"name": "꺼깔콘", "price": 3000}, {"name": "꺼깔콘", "price": 3000}, {"name": "꺼깔콘", "price": 3000}, {"name": "꺼깔콘", "price": 3000}, {"name": "꺼깔콘", "price": 3000}, {"name": "꺼깔콘", "price": 3000}, {"name": "꺼깔콘", "price": 3000}, {"name": "커카콜라", "price": 1000}]}'))
