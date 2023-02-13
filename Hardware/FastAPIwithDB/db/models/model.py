from typing import Optional

from sqlalchemy import DATE, Column, ForeignKey, Integer, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class Product_Kiosk(Base):
    __tablename__ = "Product_Kiosk"
    id: Mapped[int] = mapped_column(primary_key=True)
    productId: Mapped[int] = mapped_column(Integer)
    name: Mapped[str] = mapped_column(String)
    price: Mapped[int] = mapped_column(Integer)
    rfid: Mapped[str] = mapped_column(String, nullable=True)
    barcode: Mapped[str] = mapped_column(String, nullable=True)
    image: Mapped[str] = mapped_column(String, nullable=True)
    shopping = relationship("Shopping")

    def __repr__(self) -> str:
        return {"id": self.id, "name": self.name, "productId": self.productId, "price": self.price, "rfid":self.rfid, "barcode": self.barcode}


class Shopping(Base):
    __tablename__ = "Shopping"
    id = Column(Integer, primary_key=True, index=True)
    count = Column(Integer)
    price = Column(Integer)
    date = Column(DATE)
    productKioskId = Column(Integer, ForeignKey("Product_Kiosk.id"))

    def __repr__(self) -> str:
        return f"Shopping(id={self.id!r}, count={self.count!r}, price={self.price!r}, date={self.date!r}, productKioskId={self.productKioskId!r}"