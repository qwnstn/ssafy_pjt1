import asyncio
import websockets

clients = set()

async def broadcast(message):
    if clients:
        await asyncio.wait([client.send(message) for client in clients])

async def handler(websocket, path):
    clients.add(websocket)
    try:
        while True:
            message = await websocket.recv()
            await broadcast(message)
    finally:
        clients.remove(websocket)

start_server = websockets.serve(handler, 'localhost', 8765)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
