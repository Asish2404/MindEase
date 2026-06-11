from fastapi import APIRouter
from typing import List

from schemas import HabitsRequest, HabitsResponse



router = APIRouter(prefix='/habits', tags=['habits'])

_FAKE_DB: List[HabitsResponse] = []


@router.post('/', response_model=HabitsResponse)
def submit_habits(req: HabitsRequest) -> HabitsResponse:
    date_iso = req.date_iso or __import__('datetime').datetime.utcnow().date().isoformat()
    entry = HabitsResponse(
        date_iso=date_iso,
        water_ml=req.water_ml,
        sleep_hours=req.sleep_hours,
        exercise_minutes=req.exercise_minutes,
        meditation_minutes=req.meditation_minutes,
    )
    _FAKE_DB.append(entry)
    return entry


@router.get('/', response_model=List[HabitsResponse])
def get_habits() -> List[HabitsResponse]:
    return _FAKE_DB

