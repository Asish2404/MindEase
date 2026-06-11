from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import mood, stress, habits, profile, quotes



app = FastAPI(title='MINDEASE API', version='1.0.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get('/')
def root():
    return {"name": "MINDEASE", "status": "running"}


@app.get('/health')
def health():
    return {"status": "ok"}


app.include_router(mood.router)
app.include_router(stress.router)
app.include_router(habits.router)
app.include_router(profile.router)
app.include_router(quotes.router)

