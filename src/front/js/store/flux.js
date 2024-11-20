const backend_url = process.env.BACKEND_URL + 'api'

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: []
		},
		actions: {
			handleRegister: async (body) => {
				try {
					const response = await fetch(`${backend_url}/signup`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify(body),
					});

					const data = await response.json();

					if (response.ok) {
						return true;
					} else {
						return data.message || 'Error al registrarse';
					}
				} catch (error) {
					return 'Ocurrió un error al intentar registrarse';
				}
			},

			handleLogin: async (body) => {
				try {
					const response = await fetch(`${backend_url}/login`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							'Access-Control-Allow-Origin': '*',
						},
						body: JSON.stringify(body),
					});

					const data = await response.json();

					if (response.ok) {
						localStorage.setItem('token', data.token);
						setStore({ token: data.token, role: data.role });
						return { success: true, role: data.role };
					} else {
						return { success: false, message: data.message || 'Nombre de usuario o contraseña incorrectos' };
					}
				} catch (error) {
					return { success: false, message: 'Ocurrió un error al intentar iniciar sesión' };
				}
			},
			isAuthorized: (requiredRoles) => {
				const store = getStore();
				return requiredRoles.includes(store.user?.role);
			},

			fetchStudent: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/students/<student_id>`, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					});
					if (!response.ok) throw new Error("Error al obtener los datos del representado");
					return await response.json();
				} catch (error) {
					console.error("fetchStudent Error:", error);
					throw error;
				}
			},

			fetchMaterias: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/materias`, {
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					});
					if (!response.ok) throw new Error("Error al obtener las materias");
					return await response.json(); // Retorna las materias relacionadas
				} catch (error) {
					console.error("fetchMaterias Error:", error);
					throw error;
				}
			},

		}

	}
};


export default getState;
