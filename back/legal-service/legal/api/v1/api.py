from legal.api.v1 import v1_licenses
from fastapi import APIRouter

v1 = APIRouter()
v1.include_router(v1_licenses.router, prefix="/licenses", tags=["v1_licenses"])
