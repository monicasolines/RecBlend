"""empty message

<<<<<<< HEAD:migrations/versions/e0d9c93084f4_.py
Revision ID: e0d9c93084f4
Revises: 
Create Date: 2021-03-19 05:17:17.551214
=======
Revision ID: 21ce711c0570
Revises: 
Create Date: 2021-03-18 17:19:01.961495
>>>>>>> 2f172fe58f769ac2a5957cfa9bac17ad11d270f6:migrations/versions/21ce711c0570_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<< HEAD:migrations/versions/e0d9c93084f4_.py
revision = 'e0d9c93084f4'
=======
revision = '21ce711c0570'
>>>>>>> 2f172fe58f769ac2a5957cfa9bac17ad11d270f6:migrations/versions/21ce711c0570_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(length=200), nullable=False),
    sa.Column('last_name', sa.String(length=200), nullable=False),
    sa.Column('email', sa.String(length=250), nullable=True),
    sa.Column('password', sa.String(length=250), nullable=False),
    sa.Column('birthday', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('favorite',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('cocktail_id', sa.Integer(), nullable=False),
    sa.Column('cocktail_name', sa.String(length=250), nullable=True),
    sa.Column('cocktail_img', sa.String(length=500), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('cocktail_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('favorite')
    op.drop_table('user')
    # ### end Alembic commands ###
