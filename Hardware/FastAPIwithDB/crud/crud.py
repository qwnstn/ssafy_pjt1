import sqlite3

from sqlalchemy.orm import Session

from db.models.model import Product_Kiosk, Shopping

[str, str, str]
def select_products_with_rfid(rfids: list, db: Session):
    rlt = list()
    if not rfids:
        return rlt
    # SQLite DB 연결
    conn = sqlite3.connect("db.sqlite")
    
    # Connection 으로부터 Cursor 생성
    cur = conn.cursor()
    # 테스트 1
    query = "select * from Product_Kiosk where rfid in ("
    query += ", ".join([f"'{rid}'" for rid in rfids])
    query += ");"
    cur.execute(query)
    # 테스트 2
    # for rid in rfids:
        # query = "select * from Product_Kiosk where rfid like " + f"'{rid}';"
        # cur.execute(query)
    
    # 쿼리 확인
    print(query)
    # 데이타 Fetch
    rows = cur.fetchall()
    # 결과 확인
    print(rows)
    for row in rows:
        product = {
            "productId": row[1],
            "name": row[2],
            "price": row[3],
            "rfid": row[4],
            "barcode": row[5],
            "img": row[6],
            "isAdult": row[7]
        }
        rlt.append(product)
    return rlt


def copy_products(products: list, db: Session):
    for prd in products:
        product = Product_Kiosk(
            productId= prd['productId'],
            name= prd['name'],
            price= prd['price'],
            rfid= prd['rfid'],
            barcode= prd['barcode'],
            image= prd['image'],
            isAdult=prd["isAdult"]
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
            image= prd['image'],
            isAdult=prd["isAdult"]
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

