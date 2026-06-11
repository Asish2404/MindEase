from fastapi import APIRouter
from typing import List

from schemas import MoodRequest, MoodResponse



router = APIRouter(prefix='/mood', tags=['mood'])

# Note: For this ESD academic project, backend endpoints act as helpers.
# Frontend persists data in browser localStorage.

_FAKE_DB: List[MoodResponse] = []


@router.post('/', response_model=MoodResponse)
def add_mood(req: MoodRequest) -> MoodResponse:
    # If date_iso not provided, let frontend decide; backend keeps a simple record.
    date_iso = req.date_iso or __import__('datetime').datetime.utcnow().date().isoformat()
    entry = MoodResponse(date_iso=date_iso, mood=req.mood)
    _FAKE_DB.append(entry)
    return entry


@router.get('/', response_model=List[MoodResponse])
def get_moods() -> List[MoodResponse]:
    return _FAKE_DB

