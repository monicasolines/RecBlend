"""empty message

Revision ID: c9060e91f950
Revises: 5b91bb9bbf8d
Create Date: 2024-11-02 23:19:02.970826

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'c9060e91f950'
down_revision = '5b91bb9bbf8d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('role',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('nombre', sa.String(length=20), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('docente',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('descripcion', sa.String(length=300), nullable=False),
    sa.Column('foto', sa.String(length=250), nullable=True),
    sa.ForeignKeyConstraint(['id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('aula',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('docente_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['docente_id'], ['docente.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('aula_alumnos',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('aula_id', sa.Integer(), nullable=True),
    sa.Column('estudiante_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['aula_id'], ['aula.id'], ),
    sa.ForeignKeyConstraint(['estudiante_id'], ['estudiante.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('aula_id', 'estudiante_id', name='aula_id_estudiante_id_unique')
    )
    with op.batch_alter_table('Email_Autorizado', schema=None) as batch_op:
        batch_op.add_column(sa.Column('role_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'role', ['role_id'], ['id'])
        batch_op.drop_column('role')

    with op.batch_alter_table('docente_materias', schema=None) as batch_op:
        batch_op.create_unique_constraint('docente_materia_unique', ['id_docente', 'id_materia'])
        batch_op.drop_constraint('docente_materias_id_docente_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'docente', ['id_docente'], ['id'])

    with op.batch_alter_table('evaluacion', schema=None) as batch_op:
        batch_op.drop_constraint('evaluacion_profesor_id_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'docente', ['profesor_id'], ['id'])

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('role_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(None, 'role', ['role_id'], ['id'])
        batch_op.drop_column('role')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('role', postgresql.ENUM('DOCENTE', 'REPRESENTANTE', 'ADMINISTRADOR', name='roles'), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('role_id')

    with op.batch_alter_table('evaluacion', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('evaluacion_profesor_id_fkey', 'user', ['profesor_id'], ['id'])

    with op.batch_alter_table('docente_materias', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('docente_materias_id_docente_fkey', 'user', ['id_docente'], ['id'])
        batch_op.drop_constraint('docente_materia_unique', type_='unique')

    with op.batch_alter_table('Email_Autorizado', schema=None) as batch_op:
        batch_op.add_column(sa.Column('role', postgresql.ENUM('DOCENTE', 'REPRESENTANTE', 'ADMINISTRADOR', name='roles'), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('role_id')

    op.drop_table('aula_alumnos')
    op.drop_table('aula')
    op.drop_table('docente')
    op.drop_table('role')
    # ### end Alembic commands ###
