# uvicorn main:app

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tabula

app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

@app.post("/readpdf")
async def read_pdf(pdf_file: UploadFile = File(...)):
    print("api hit")
    try:
        # contents = await pdf_file.read()
        item = tabula.read_pdf(pdf_file.file, pages='all')
        if item:
            return item[0]
        else:
            raise HTTPException(status_code=404, detail="No data found in PDF")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
