import sqlite3

from db.models.model import Product_Kiosk, Shopping
from sqlalchemy.orm import Session


def select_products_with_rfid(rfids: list, db: Session):
    rlt = list()

    # SQLite DB 연결
    conn = sqlite3.connect("db.sqlite")
    
    # Connection 으로부터 Cursor 생성
    cur = conn.cursor()

    # SQL 쿼리 실행
    cur.execute("select * from Product_Kiosk")
    
    # 데이타 Fetch
    rows = cur.fetchall()
    for row in rows:
        product = {
            "productId": row[1],
            "name": row[2],
            "price": row[3],
            "rfid": row[4],
            "barcode": row[5],
            "img": row[6]
        }
        rlt.append(product)
        print(row)
    return rlt


def copy_products(products: list, db: Session):
    for prd in products:
        product = Product_Kiosk(
            productId= prd['productId'],
            name= prd['name'],
            price= prd['price'],
            rfid= prd['rfid'],
            barcode= prd['barcode'],
            image= prd['image']
        )
        db.add(product)
    db.commit()
    i = len(db.query(Product_Kiosk).all())
    return i


def create_product(products: list, db: Session):
    for prd in products:
        product = Product_Kiosk(
            productId= prd['productId'],
            name= prd['name'],
            price= prd['price'],
            rfid= prd['rfid'],
            barcode= prd['barcode'],
            image= prd['image']
        )
        db.add(product)
    i = len(products)
    db.commit()
    return i


def delete_product(ids: list, db: Session):
    for id in ids:
        db.query(Product_Kiosk).filter(Product_Kiosk.productId == id).delete()
    i = len(ids)
    db.commit()
    return i


def create_shopping(shoppings: list, date, db: Session):
    for shp in shoppings:
        shopping = Shopping(
            count=shp["count"],
            price=shp["price"],
            date=date,
            productKioskId=shp["productKioskId"]
        )
        db.add(shopping)
    db.commit()

