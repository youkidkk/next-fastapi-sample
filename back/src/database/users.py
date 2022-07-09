from datetime import datetime

from sqlalchemy import Column
from sqlalchemy.types import DateTime, Integer, String

from database.connector import Base, session


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    name = Column(String(50), unique=True)
    password = Column(String(50))
    created_at = Column(DateTime(timezone=False), default=datetime.now())
    updated_at = Column(DateTime(timezone=False), default=datetime.now())


def insert(user: User) -> None:
    session.add(user)
    session.commit()


def select_by_name(name: str) -> User:
    return session.query(User).filter(User.name == name).first()
