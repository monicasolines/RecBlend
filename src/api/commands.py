
import click
from api.models import db, User, Role, EmailAuthorized, Docente
from api.routes.routes import bcrypt
from sqlalchemy.exc import IntegrityError


"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""
def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_users(count):
        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")

        print("All test users created")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        print("Creating test data")
        
        print("Roles:")
        
        roles = ["Admin","Docente", "Representante"]
        for r in roles:
            role = Role()
            role.nombre = r
            db.session.add(role)
            db.session.commit()
            print(f"Role: {r}, Created")
            
        print("Creating admin User")
        try:
            admin_data = {
            "email": "administrador@test.com",
            "nombre": "Juan",
            "apellido": "Pérez",
            "is_active": True,
            "role_id": 1
        }
            auth = EmailAuthorized()
            auth.email = "administrador@test.com"
            auth.role_id = 1
            auth.isRegistered = True
            admin_user = User(**admin_data)
            admin_user.password = bcrypt.generate_password_hash("adminpass").decode('utf-8')
            admin_user.direccion = "Calle Falsa 123, Ciudad falsa tambien"
            db.session.add(auth)
            db.session.add(admin_user)
            db.session.commit()
            
        except IntegrityError as e:
            db.session.rollback()
            print("Integrity Error")
            print(e.orig)
            return
    
        print("Creating Teachers:")
        
        teachers_data = [
    {
        "email": "teacher1@test.com",
        "nombre": "Pablo",
        "apellido": "Pérez",
        "telefono": "123456789",
        "is_active": True,
        "role_id": 2
    },
    {
        "email": "teacher2@test.com",
        "nombre": "Carlos",
        "apellido": "López",
        "telefono": "555123456",
        "is_active": True,
        "role_id": 2
    }
]
        for t in teachers_data:
            teacher = Docente(**t)
            teacher.password = bcrypt.generate_password_hash("12345").decode('utf-8')
            teacher.direccion = "Calle Falsa 123, Ciudad falsa tambien"
            teacher.descripcion = "Un profesor de prueba como datos de prueba"
            teacher.foto = "https://placehold.co/250"
            db.session.add(teacher)
            db.session.commit()
            print(f"Docente creado: {teacher} - {teacher.email}")
            
        print("Creating Parents")
        parents_data =[
                {
            "email": "parent1@test.com",
            "nombre": "miguel",
            "apellido": "López",
            "telefono": "123455678",
            "is_active": True,
            "role_id": 3
        },{
            "email": "parent2@test.com",
            "nombre": "Angel",
            "apellido": "Jimenez",
            "telefono": "12345988",
            "is_active": True,
            "role_id": 3
        }
        ]
        
        for p in parents_data:
            parent = User(**p)
            parent.password = bcrypt.generate_password_hash("12345").decode('utf-8')
            parent.direccion = "Calle Falsa 123, Ciudad falsa tambien"

            db.session.add(parent)
            db.session.commit()
            print(f"Created parent {parent}")

    

        
    
        