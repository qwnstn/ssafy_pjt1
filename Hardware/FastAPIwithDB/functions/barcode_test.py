import threading
import json
import requests
import time
from collections import deque


BASE_URL = "https://himart.shop"
KIOSK_ID = 1

class SessionStorage():
    barcode = deque()
    qrcode = deque()
    thread_on = True

    def readCode(self):
        while self.thread_on:
            data = input()
            if data.isnumeric():
                self.barcode.append(data)
            elif data[0] == "{" and len(data) > 50:
                jsondata = json.loads(data)
                if time.time() - 70 < jsondata["time"] // 1000:
                    url = f"{BASE_URL}/api/user/qr"
                    headers = {
                        "Authorization": f"Bearer {jsondata['token']}"
                    }
                    data = {
                        "kioskId": KIOSK_ID,
                        "datetime": int(jsondata["time"])
                    }
                    print(requests.post(url=url, headers=headers, data=data))
                else:
                    print("이딴걸 QR이라고 보냈냐")
        return

    def startThread(self):
        # 통신을 다른 코드와 병렬처리 하기 위한 스레드 생성
        thread = threading.Thread(target=self.readCode)
        thread.start()

    def endThread(self):
        self.thread_on = False


if __name__ == "__main__":
    SessionStorage().startThread()