from pydantic import BaseModel, EmailStr
from typing import Literal
from datetime import datetime


class UserProfile(BaseModel):
    full_name: str
    email: EmailStr
    college: str | None = None
    programme: str | None = None
    year: int | None = None


class MoodEntry(BaseModel):
    date_iso: str  # YYYY-MM-DD
    mood: Literal['happy', 'good', 'neutral', 'sad', 'stressed']


class StressEntry(BaseModel):
    date_iso: str
    score: int
    level: Literal['low', 'moderate', 'high']


class HabitsEntry(BaseModel):
    date_iso: str
    water_ml: int
    sleep_hours: float
    exercise_minutes: int
    meditation_minutes: int


class SettingsEntry(BaseModel):
    theme: Literal['dark', 'light'] = 'dark'
    notifications_enabled: bool = True


class Quote(BaseModel):
    id: str
    text: str
    author: str | None = None


def utc_now_iso_date() -> str:
    return datetime.utcnow().date().isoformat()

