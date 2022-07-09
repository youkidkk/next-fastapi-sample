import sqlalchemy
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

DATABASE = "postgresql"
USER = "next-fastapi"
PASSWORD = "next-fastapi"
HOST = "localhost"
PORT = "5432"
DB_NAME = "next-fastapi"

CONN_STR = f"{DATABASE}://{USER}:{PASSWORD}@{HOST}:{PORT}/{DB_NAME}"

engine = sqlalchemy.create_engine(CONN_STR)

session = scoped_session(sessionmaker(engine, autocommit=False, autoflush=False))

Base = declarative_base()
