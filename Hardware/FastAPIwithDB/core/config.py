import os

from dotenv import load_dotenv

load_dotenv()


class Settings:

    DB_USERNAME: str = os.getenv("DB_USERNAME")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_HOST: str = os.getenv("DB_HOST", "localhost")
    DB_PORT: str = os.getenv("DB_PORT", 3306)
    DB_DATABASE: str = os.getenv("DB_DATABASE")

    DATABASE_URL = f"sqlite+pysqlite:///db.sqlite"


settings = Settings()


WEBSOCKET_URL = "ws://192.168.30.202:8080"
BASE_URL = "https://himart.shop"
KIOSK_ID = 18
