from typing import Optional

from sqlalchemy.orm import Session

from auth.core.security import get_password_hash, verify_password
from auth.crud.base import CRUDBase
from auth.models.user import User
from auth.schemas.user import UserCreate, UserInDB, UserUpdate


class CRUDUser(CRUDBase[User, UserInDB, UserUpdate]):
    """ Модель для CRUD операций по юзеру"""

    def get_by_email(self, db: Session, *, email: str) -> Optional[User]:
        """Получаем пользователя по email"""
        return db.query(User).filter(User.email == email).first()

    def is_active(self, user: User) -> bool:
        """ Проверяем, что юзер активен """
        return user.is_active

    def is_superuser(self, user: User) -> bool:
        """ Проверяем, что юзер — admin"""
        return user.is_superuser

    def create(self, db: Session, *, obj_in: UserCreate) -> User:
        """ Обертка над функцией create базовой модели"""
        _user = UserInDB(
            email=obj_in.email,
            is_active=obj_in.is_active,
            is_superuser=obj_in.is_superuser,
            full_name=obj_in.full_name,
            hashed_password=get_password_hash(obj_in.password),
        )
        return super(CRUDUser, self).create(db=db, obj_in=_user)

    def authenticate(self, db: Session, *, email: str, password: str) -> Optional[User]:
        user = self.get_by_email(db, email=email)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user


user = CRUDUser(User)
