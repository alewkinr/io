from pydantic import BaseModel


# shared
class License(BaseModel):
    performers: str
    phonogram_title: str
