from typing import Generator

import pytest

from auth.db.session import SessionLocal
from auth.main import app
from fastapi.testclient import TestClient


@pytest.fixture(scope="session")
def db() -> Generator:
    yield SessionLocal()


@pytest.fixture(scope="module")
def client() -> Generator:
    with TestClient(app) as c:
        yield c
