from setuptools import setup

setup(
    name="auth_service",
    version="0.0.1",
    packages=[
        "auth",
        "auth.db",
        "auth.api",
        "auth.api.v1",
        "auth.core",
        "auth.crud",
        "auth.tests",
        "auth.tests.api",
        "auth.tests.api.api_v1",
        "auth.models",
        "auth.schemas",
    ],
    package_dir={"": "./"},
    url="http://example.com",
    license="MIT",
    author="Ramil Aleshkin",
    author_email="alewkinr@gmail.com",
    description="Auth service",
)
