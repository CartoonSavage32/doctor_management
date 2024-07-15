from app.routers import auth, pdf, relationship
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost:5173",  # The frontend application running on this URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(pdf.router, prefix="/pdf", tags=["pdf"])
app.include_router(relationship.router, prefix="/relationship", tags=["relationship"])


@app.get("/")
def read_root():
    return {"message": "Welcome to the Doctor Management System"}
