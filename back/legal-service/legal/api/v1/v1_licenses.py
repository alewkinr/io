from typing import Any

from sqlalchemy.orm import Session

from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from legal.api import deps
from legal.core.errors import InternalServerErr
from legal.schemas import License

router = APIRouter()


@router.post("/search")
def search_license(_license: License, db: Session = Depends(deps.get_db)) -> Any:
    """
    Ищем в базе лицензии по имени композитора или названию трека
    """
    params = {
        "language": "russian",
        "search_string": f"{_license.performers}, {_license.phonogram_title}",
    }
    q = """
            SELECT ts_rank(public.make_tsvector_ru(performers::text, phonogram_title::text), q) as rankk,
            *
            FROM public.phonograms,to_tsquery(:language,replace(plainto_tsquery(:language, :search_string)::text, '&','|')) as q 
            where public.make_tsvector_ru(performers, phonogram_title) @@  q
            and ts_rank(public.make_tsvector_ru(performers::text, phonogram_title::text), q) > 0.05
            ORDER by ts_rank(public.make_tsvector_ru(performers, phonogram_title), q) desc limit 1 ;
        """
    try:
        rows = db.execute(q, params)
        if not rows.returns_rows and rows.rowcount < 1:
            return JSONResponse(
                status_code=status.HTTP_204_NO_CONTENT,
                content={"check_result": "allowed"},
            )
        elif rows.returns_rows and rows.rowcount >= 1:
            return JSONResponse(
                status_code=status.HTTP_200_OK,
                content={"check_result": "restricted"},
            )
    except Exception as err:
        raise InternalServerErr(f"error to get info from DB: {err}")
