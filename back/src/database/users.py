from datetime import datetime

from sqlalchemy import Column
from sqlalchemy.orm import Session
from sqlalchemy.types import DateTime, Integer, String

from database.connector import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    password = Column(String(200))
    created_at = Column(DateTime(timezone=False), default=datetime.now())
    updated_at = Column(DateTime(timezone=False), default=datetime.now())


def insert(db: Session, name: str, hashed_password: str) -> None:
    user = User()
    user.name = name
    user.password = hashed_password

    db.add(user)
    db.commit()


def select_by_name(db: Session, name: str) -> User:
    return db.query(User).filter(User.name == name).first()
