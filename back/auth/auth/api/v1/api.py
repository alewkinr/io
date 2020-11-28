from auth.api.v1 import v1_sessions
from fastapi import APIRouter

v1 = APIRouter()
v1.include_router(v1_sessions.router, prefix="/sessions", tags=["v1_sessions"])
