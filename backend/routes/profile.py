from fastapi import APIRouter
from schemas import ProfileRequest, ProfileResponse, SettingsRequest, SettingsResponse



router = APIRouter(prefix='/profile', tags=['profile'])

_PROFILE = None
_SETTINGS = SettingsResponse(theme='dark', notifications_enabled=True)


@router.post('/', response_model=ProfileResponse)
def upsert_profile(req: ProfileRequest) -> ProfileResponse:
    global _PROFILE
    _PROFILE = ProfileResponse(
        full_name=req.full_name,
        email=req.email,
        college=req.college,
        programme=req.programme,
        year=req.year,
    )
    return _PROFILE


@router.get('/', response_model=ProfileResponse)
def get_profile() -> ProfileResponse:
    # Provide a default profile if none exists.
    global _PROFILE
    if _PROFILE is None:
        _PROFILE = ProfileResponse(full_name='Student', email='student@example.com', college=None, programme=None, year=None)
    return _PROFILE


@router.post('/settings', response_model=SettingsResponse)
def update_settings(req: SettingsRequest) -> SettingsResponse:
    global _SETTINGS
    _SETTINGS = SettingsResponse(theme=req.theme, notifications_enabled=req.notifications_enabled)
    return _SETTINGS


@router.get('/settings', response_model=SettingsResponse)
def get_settings() -> SettingsResponse:
    return _SETTINGS

