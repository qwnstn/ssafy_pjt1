from fastapi import FastAPI, WebSocket

from fastapi import APIRouter

websocket_router = APIRouter(
    prefix="/ws", # url 앞에 고정적으로 붙는 경로추가
) # Route 분리

# @app.websocket("/ws")
# async def websocket_endpoint(websocket: WebSocket):
#     await websocket.accept()
#     while True:
#         data = await websocket.receive_text()
#         await websocket.send_text(f"Message text was: {data}")