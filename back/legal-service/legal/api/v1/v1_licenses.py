from typing import Any

from sqlalchemy.orm import Session
from legal.api import deps
from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
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
            SELECT
                   ts_rank(
                       make_tsvector_ru(performers::text, phonogram_title::text), q
                    ) AS rankk,
                    *
            FROM public."phonograms",
                 to_tsquery(
                     'russian',
                     replace(
                         plainto_tsquery('russian', '(I JUST) DIED IN YOUR ARMS')::text, '&','|')
                 ) AS q
            WHERE make_tsvector_ru(performers, phonogram_title) @@  q
                AND ts_rank(
                        make_tsvector_ru(performers::text, phonogram_title::text), q
                    ) > 0.05
            ORDER BY ts_rank(
                make_tsvector_ru(performers, phonogram_title), q
                ) DESC
            LIMIT 1;
        """
    # try:
    #     res = db.execute(q, params)
    #     for row in res:
    #         print(row._asdict())
    # except Exception as err:
    #     print(err)

    return JSONResponse(
        status_code=status.HTTP_200_OK, content={"check_result": "restricted"}
    )
