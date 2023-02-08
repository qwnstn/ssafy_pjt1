import asyncio

import websockets

URL = "ws://192.168.30.202:8080/"


async def hello():
    async with websockets.connect(URL) as websocket:
        await websocket.send("next")
        await websocket.recv()


if __name__ == "__main__":
    asyncio.run(hello())
