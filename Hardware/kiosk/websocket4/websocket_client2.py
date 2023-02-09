import asyncio
import websockets

async def handler(websocket):
    async for message in websocket:
        print(f"Received message: {message}")

async def send_message(websocket):
    while True:
        message = input("Enter a message: ")
        await websocket.send(message)

async def main():
    async with websockets.connect("ws://localhost:6665") as websocket:
        receive_task = asyncio.create_task(handler(websocket))
        send_task = asyncio.create_task(send_message(websocket))
        await asyncio.gather(receive_task, send_task)

asyncio.run(main())
