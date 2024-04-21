# python -m uvicorn main:app --reload

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import tabula

app = FastAPI()

origins = [
    "http://localhost:5173/",
    "https://localhost:5173/",
    "http://localhost:5174/",
    "https://localhost:5174",
    "http://127.0.0.1:5173/",
    "https://127.0.0.1:5173/",
    "http://127.0.0.1:5174/",
    "https://127.0.0.1:5174/",
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
        # print(item[0])
        if item:
            return item[0]
        else:
            raise HTTPException(status_code=404, detail="No data found in PDF")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/readpdfurl")
async def read_pdf_url(pdf_url):
    print("api hit")
    pdf_url=pdf_url.json()
    print(pdf_url)
    try:
        response = requests.get(pdf_url)
        response.raise_for_status()
        
        # Read the PDF file using tabula
        item = tabula.read_pdf(response.content, pages='all')
        # print(item[0])
        if item:
            return item[0]
        else:
            raise HTTPException(status_code=404, detail="No data found in PDF")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
