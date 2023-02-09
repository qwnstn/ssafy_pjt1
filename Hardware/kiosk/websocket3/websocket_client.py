import asyncio
import websockets

async def handle_message(websocket):
    while True:
        message = await websocket.recv()
        print(f'Received: {message}')

async def run_client():
    async with websockets.connect('ws://0.0.0.0:7777') as websocket:
        await websocket.send("Hello from the client")
        await handle_message(websocket)

asyncio.get_event_loop().run_until_complete(run_client())
