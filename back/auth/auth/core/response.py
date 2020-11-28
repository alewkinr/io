from fastapi import Response, status


class NoContentResponse(Response):
    """ Пустое тело ответа сервера """

    def __init__(self) -> None:
        super().__init__(
            status_code=status.HTTP_204_NO_CONTENT,
        )
        pass
