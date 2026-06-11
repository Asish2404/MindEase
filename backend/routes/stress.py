from fastapi import APIRouter
from typing import List, Literal

from schemas import StressRequest, StressResultResponse



router = APIRouter(prefix='/stress', tags=['stress'])

_FAKE_DB: List[StressResultResponse] = []


def score_to_level(score: int) -> Literal['low', 'moderate', 'high']:
    if 0 <= score <= 3:
        return 'low'
    if 4 <= score <= 7:
        return 'moderate'
    return 'high'


@router.post('/', response_model=StressResultResponse)
def submit_stress(req: StressRequest) -> StressResultResponse:
    date_iso = req.date_iso or __import__('datetime').datetime.utcnow().date().isoformat()
    score = sum(req.answers)
    level = score_to_level(score)
    result = StressResultResponse(date_iso=date_iso, score=score, level=level)
    _FAKE_DB.append(result)
    return result


@router.get('/', response_model=List[StressResultResponse])
def get_stress() -> List[StressResultResponse]:
    return _FAKE_DB

