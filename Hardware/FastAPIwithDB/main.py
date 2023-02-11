from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.db import router as db_router
from routes.kiosk import router as kiosk_router
from routes.pay import router as pay_router

app = FastAPI()  # FastAPI 모듈

origins = [
    "http://192.168.30.202:3001",
    "http://192.168.30.202:8000",
    "http://192.168.30.163:3001",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(kiosk_router)        # 다른 route파일들을 불러와 포함시킴
app.include_router(pay_router)          # 다른 route파일들을 불러와 포함시킴
app.include_router(db_router)           # 다른 route파일들을 불러와 포함시킴


@app.get("/")
def index():
    return {
        "message": "API test OK",
    }
