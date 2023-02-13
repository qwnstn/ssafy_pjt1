from sqlalchemy import select
from sqlalchemy.orm import Session

from db.models.model import Product_Kiosk, Shopping


def select_products_with_rfid(rfids: list, db: Session):
    # rlt = db.execute(select(Product_Kiosk).where(Product_Kiosk.rfid.in_(rfids)))
    # rlt = db.query(Product_Kiosk).filter(Product_Kiosk.rfid.in_(rfids)).all()
    rlt = list()
    # q = db.query(Product_Kiosk).filter(Product_Kiosk.rfid==rid).first()
    # q = db.scalars(select(Product_Kiosk).where(Product_Kiosk.rfid.in_(rfids)))
    for rid in rfids:
        q = db.query(Product_Kiosk).filter_by(id=1).all()
        print(rid, q)
        rlt.append(q) if q else None
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
    byingdict = dict()
    for shp in shoppings:
        shopping = Shopping(
            count=shp["count"],
            price=shp["price"],
            date=date,
            productKioskId=shp["productKioskId"]
        )
        db.add(shopping)
    db.commit()

