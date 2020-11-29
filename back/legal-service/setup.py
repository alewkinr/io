from setuptools import setup

setup(
    name="legal_service",
    version="0.0.1",
    packages=[
        "legal",
        "legal.db",
        "legal.api",
        "legal.api.v1",
        "legal.core",
        "legal.crud",
        "legal.tests",
        "legal.tests.api",
        "legal.tests.api.api_v1",
        "legal.models",
        "legal.schemas",
    ],
    package_dir={"": "./"},
    url="http://example.com",
    license="MIT",
    legalor="Ramil Aleshkin",
    legalor_email="alewkinr@gmail.com",
    description="Service for legal checks of songs",
)
