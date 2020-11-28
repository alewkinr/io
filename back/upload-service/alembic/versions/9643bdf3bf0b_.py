"""empty message

Revision ID: 9643bdf3bf0b
Revises: 
Create Date: 2020-11-28 10:32:06.282089

"""
import sqlalchemy as sa

import sqlalchemy_utils
from alembic import op

# revision identifiers, used by Alembic.
revision = "9643bdf3bf0b"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "file",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("status", sa.String(), nullable=False),
        sa.Column("result", sa.String(), nullable=True),
        sa.Column("type", sa.String(), nullable=False),
        sa.Column("file", sa.LargeBinary(), nullable=False),
        sa.Column("download_url", sqlalchemy_utils.types.url.URLType(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(op.f("ix_file_id"), "file", ["id"], unique=False)
    op.create_index(op.f("ix_file_result"), "file", ["result"], unique=False)
    op.create_index(op.f("ix_file_status"), "file", ["status"], unique=False)
    op.create_index(op.f("ix_file_type"), "file", ["type"], unique=False)
    op.create_index(op.f("ix_file_user_id"), "file", ["user_id"], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f("ix_file_user_id"), table_name="file")
    op.drop_index(op.f("ix_file_type"), table_name="file")
    op.drop_index(op.f("ix_file_status"), table_name="file")
    op.drop_index(op.f("ix_file_result"), table_name="file")
    op.drop_index(op.f("ix_file_id"), table_name="file")
    op.drop_table("file")
    # ### end Alembic commands ###
