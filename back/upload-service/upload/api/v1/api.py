from fastapi import APIRouter
from upload.api.v1 import v1_files, v1_files_links

v1 = APIRouter()
v1.include_router(v1_files.router, prefix="/files", tags=["v1_files"])
v1.include_router(v1_files_links.router, prefix="/file-links", tags=["v1_files_links"])
