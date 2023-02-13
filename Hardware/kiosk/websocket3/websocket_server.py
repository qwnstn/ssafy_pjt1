import asyncio
import websockets

async def handle_connection(websocket, path):
    while True:
        message = await websocket.recv()
        await asyncio.gather(*[client.send(message) for client in clients if client is not websocket])

clients = set()

async def handle_new_connection(websocket, path):
    clients.add(websocket)
    await handle_connection(websocket, path)
    clients.remove(websocket)

start_server = websockets.serve(handle_new_connection, 'localhost', 6665)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
