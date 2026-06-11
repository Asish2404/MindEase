from pydantic import BaseModel, EmailStr, Field
from typing import Literal


class HealthResponse(BaseModel):
    status: str = 'ok'


class QuoteResponse(BaseModel):
    id: str
    text: str
    author: str | None = None


class MoodRequest(BaseModel):
    mood: Literal['happy', 'good', 'neutral', 'sad', 'stressed']
    date_iso: str | None = None


class MoodResponse(BaseModel):
    date_iso: str
    mood: Literal['happy', 'good', 'neutral', 'sad', 'stressed']


class StressRequest(BaseModel):
    answers: list[int] = Field(min_length=10, max_length=10)
    date_iso: str | None = None


class StressResultResponse(BaseModel):
    date_iso: str
    score: int
    level: Literal['low', 'moderate', 'high']


class HabitsRequest(BaseModel):
    water_ml: int = Field(ge=0, le=5000)
    sleep_hours: float = Field(ge=0, le=24)
    exercise_minutes: int = Field(ge=0, le=300)
    meditation_minutes: int = Field(ge=0, le=180)
    date_iso: str | None = None


class HabitsResponse(BaseModel):
    date_iso: str
    water_ml: int
    sleep_hours: float
    exercise_minutes: int
    meditation_minutes: int


class ProfileRequest(BaseModel):
    full_name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    college: str | None = None
    programme: str | None = None
    year: int | None = Field(default=None, ge=1, le=8)


class ProfileResponse(BaseModel):
    full_name: str
    email: EmailStr
    college: str | None = None
    programme: str | None = None
    year: int | None = None


class SettingsRequest(BaseModel):
    theme: Literal['dark', 'light'] = 'dark'
    notifications_enabled: bool = True


class SettingsResponse(BaseModel):
    theme: Literal['dark', 'light']
    notifications_enabled: bool

