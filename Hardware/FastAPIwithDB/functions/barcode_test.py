import asyncio
import json
import threading
from collections import deque

import requests

from routes.websocket import send

BASE_URL = "https://himart.shop"
KIOSK_ID = 18


class SessionStorage():
    barcode = deque()
    qrcode = deque()
    thread_on = True

    def readCode(self):
        while self.thread_on:
            data = input()
            if not data:
                continue
            elif data.isnumeric():
                self.barcode.append(data)
            elif data[0] == "{" and len(data) > 50:
                jsondata = json.loads(data)
                # print(time.time())
                # if time.time() - 120 < jsondata["time"] // 1000:
                url = f"{BASE_URL}/api/user/qr"
                headers = {
                    "Authorization": f"Bearer {jsondata['token']}",
                    # "Content-Type": "applicaation/json"
                }
                payload = {
                    "kioskId": KIOSK_ID,
                    "datetime": int(jsondata["time"])
                }
                r = requests.post(url=url, headers=headers, json=payload, )
                if r.status_code == 200:
                    print("정상적인 QR코드")
                    asyncio.run(send("next"))
                    self.endThread()
                else:
                    print("이딴걸 QR이라고 보냈냐", r.status_code)
                    self.endThread()
        return

    async def startThread(self):
        # 통신을 다른 코드와 병렬처리 하기 위한 스레드 생성
        self.thread_on = True
        thread = threading.Thread(target=self.readCode)
        thread.start()

    def endThread(self):
        self.thread_on = False


if __name__ == "__main__":
    SessionStorage().startThread()
