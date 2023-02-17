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


BASE_URL = "https://himart.shop"
WEBSOCKET_URL = "ws://192.168.30.202:8080"
SERIAL_PORT = "COM6"
KIOSK_ID = 18
