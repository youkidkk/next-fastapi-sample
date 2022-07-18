import uvicorn
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware

import auth
from database.connector import Base, engine

Base.metadata.create_all(engine)

app = FastAPI()
app.include_router(auth.router)
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/hello")
def hello(
    token: str = Depends(auth.oauth2_scheme),
    user: auth.User = Depends(auth.get_current_active_user),
) -> dict:
    return {"token": token, "message": f"Hello {user.username}!!!"}


if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
