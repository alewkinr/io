from setuptools import setup

setup(
    name="upload_service",
    version="0.0.1",
    packages=[
        "upload",
        "upload.db",
        "upload.api",
        "upload.api.v1",
        "upload.core",
        "upload.crud",
        "upload.tests",
        "upload.models",
        "upload.schemas",
    ],
    package_dir={"": "./"},
    url="http://example.com",
    license="MIT",
    author="Ramil Aleshkin",
    author_email="alewkinr@gmail.com",
    description="Image upload service",
)
