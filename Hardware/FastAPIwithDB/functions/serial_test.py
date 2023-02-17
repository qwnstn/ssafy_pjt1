import threading
import time

import serial

from core.config import SERIAL_PORT


class RFID_Serial_Trans:
    PORT = SERIAL_PORT                               # 포트 번호
    baud = 9600                                 # 보드레이트
    ser = serial.Serial(PORT, baud, timeout=0.1)  # serial 통신 세팅
    tag_uid = dict()
    read_flag = True
    # baud = 115200                             # RFID 보드레이트 115200 기본값
    # def __enter__(self):
    #     return self

    async def main(self):
        self.read_flag = True
        self.tag_uid = dict()
        if not self.ser.is_open:
            self.ser.open()
        self.ser.reset_input_buffer()
        thread = threading.Thread(target=self.readthread, args=(
            self.ser,), daemon=True)   # 통신을 다른 코드와 병렬처리 하기 위한 스레드 생성
        thread.start()                                              # 스레드 시작

        # 0.5초마다 데이터 전송
        # RFID 통신 바이트 정리
        # data = 0x3304C299 # RFID 확인 -> 0x33052C0199 정상응답
        # data = 0x3304B199 # Reading Stay
        # data = 0x3304B299 # Reading Nonstop
        while True:
            if self.tag_uid and max(list(self.tag_uid.values())) > 3:
                result = list()
                for key, value in self.tag_uid.items():
                    if len(key) == 16:
                        result.append(str(key).upper())
                self.read_flag = False

                return result
            else:
                time.sleep(0.2)
            # data = input().strip()
            # if data == "serial exit": # 종료 명령어
            #     break
            # if data:
            #     self.ser.write(data.encode())
            # time.sleep(0.5)

    def readthread(self, ser):              # 데이터 받는 함수 => 스레드 생성해서 병렬로 처리 예정
        # 스레드가 종료될 때 까지 진행
        while self.read_flag:
            time.sleep(0.1)
            if ser.readable():
                data = ser.readline()
                # print("Received data", list(map(hex, data))) if data else None
                while len(data) > 3:
                    uid = ''
                    received_command = [0, 0]
                    if data[0] == 0x33:                         # 시작바이트 : 0x33 이어야 정상적인 요청
                        received_command[0] = data[1]           # 요청 총 길이
                        received_command[1] = data[2]           # 요청 코드
                        data_now = data[:received_command[0]]   # 요청 1개 추출
                        data = data[received_command[0]:]       # 나머지 저장
                    else:                                       # 시작바이트로 시작하는 요청이 아닌 경우 시작바이트 찾기
                        x = data.find(0x33)
                        if x > 0:
                            data = data[x:]
                            continue
                        else:
                            # print(data.decode())
                            break
                    if received_command[1] == 0x3B:             # RFID UID 1개 읽기
                        for byte in data_now[3:-1]:
                            if byte < 16:
                                uid += "0" + hex(byte)[2:]
                            else:
                                uid += hex(byte)[2:]
                    elif received_command[1] == 0x1B:           # 읽기 Stay 모드
                        print("Reading Stay Mode ON")
                        continue
                    elif received_command[1] == 0x2B:           # 읽기 Continue 모드
                        print("Reading Continue Mode ON")
                        continue
                    elif received_command[1] == 0x1C:           # RF ON/OFF
                        print("RF Setting Change")
                        continue
                    # RFID Reader 동작 확인
                    elif received_command[1] == 0x2C:
                        print("RFID Reader Check OK")
                        continue
                    # RFID 1개 읽기 (UID를 통해서 조회)
                    elif received_command[1] == 0x1A:
                        num = received_command[0]
                        fn, nb = data_now[3:4]
                        uid = data_now[5:13]
                        bd = data_now[13:-1]
                    else:
                        # print(data_now.decode(), end=" ")
                        print("Unknown Request")
                        continue
                    uid = uid.upper()
                    if data_now[-1] == 0x99:                    # 종료 바이트
                        print(self.tag_uid.keys(), self.tag_uid.values())
                        if uid in self.tag_uid.keys():
                            self.tag_uid[uid] += 1
                            print("tag exist")
                        else:
                            self.tag_uid[uid] = 1
                            print("new tag")
                    else:
                        print("Error Request")
        ser.close()
    
    # def __exit__(self, exc_type, exc_val, exc_tb):
    #     self.ser.close()


if __name__ == "__main__":
    RFID_Serial_Trans().main()
