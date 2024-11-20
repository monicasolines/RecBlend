// const backend_url = process.env.BACKEND_URL + 'api'
const backendURL = process.env.BACKEND_URL || ""


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			role: '',
			token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczMjA1NjkyNywianRpIjoiMDY1NGYyODctYzRjYy00NWQ4LWFjOWMtNDI4YzkyMjdjMDBiIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MywibmJmIjoxNzMyMDU2OTI3LCJjc3JmIjoiYTc2MGY3YzYtYTY1YS00MTgwLTg2OTgtYmQ0NTEyYTVhMDNjIiwiZXhwIjoxNzMyMDU3ODI3LCJyb2xlIjoyfQ.0Z0QygRAy2TdbNB3sML7CfvFBjkDO1aoWEDIEOvqMS0',
			message: null,
			demo: [],
		},
		actions: {
			fetchRoute: async (endpoint, { method = 'GET', body = '', isPrivate = false, bluePrint = '' } = {}) => {

				const headers = {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				}

				const { token } = getStore()

				if (isPrivate && token) {
					headers['Authorization'] = `Bearer ${token}`
				}

				if (isPrivate && (!token || !bluePrint)) {
					throw new Error("Faltan datos para la solicitud privada")
				}

				const URL = isPrivate ? `${backendURL}api/${bluePrint}/${endpoint}` : `${backendURL}api/${endpoint}`

				const params = {
					method,
					headers
				}

				if (body) {
					params.body = JSON.stringify(body);
				}

				try {
					const response = await fetch(URL, params)

					if (!response.ok) {
						throw new Error(`Error con la solicitud: ${response.statusText}`)
					}

					const data = await response.json()
					return data
				} catch (error) {
					console.error(error)
					throw Error
				}

			}, loadSession: () => {
				const token = localStorage.getItem('token')
				const role = localStorage.getItem('role')
				if (token && role) {
					setStore({ 'token': token, 'role': role })

					console.info("Session Loaded")
				}
				console.info("No credentials found")
			},
			// handleRegister: async (body) => {
			// 	try {
			// 		const response = await fetch(`${backend_url}/signup`, {
			// 			method: 'POST',
			// 			headers: {
			// 				'Content-Type': 'application/json',
			// 				'Access-Control-Allow-Origin': '*',
			// 			},
			// 			body: JSON.stringify(body),
			// 		});

			// 		const data = await response.json();

			// 		if (response.ok) {
			// 			return true;
			// 		} else {
			// 			return data.message || 'Error al registrarse';
			// 		}
			// 	} catch (error) {
			// 		return 'Ocurrió un error al intentar registrarse';
			// 	}
			// },
			handleRegister: async (body) => {
				try {
					const data = await actions.fetchRoute('signup', { method: 'POST', body });
					return true;
				} catch (error) {
					console.error("Error en handleRegister:", error);
					return 'Ocurrió un error al intentar registrarse';
				}
			},
			// handleLogin: async (body) => {
			// 	try {
			// 		const response = await fetch(`${backend_url}/login`, {
			// 			method: 'POST',
			// 			headers: {
			// 				'Content-Type': 'application/json',
			// 				'Access-Control-Allow-Origin': '*',
			// 			},
			// 			body: JSON.stringify(body),
			// 		});

			// 		const data = await response.json();

			// 		if (response.ok) {
			// 			localStorage.setItem('token', data.token);
			// 			setStore({ token: data.token, role: data.role });
			// 			return { success: true, role: data.role };
			// 		} else {
			// 			return { success: false, message: data.message || 'Nombre de usuario o contraseña incorrectos' };
			// 		}
			// 	} catch (error) {
			// 		return { success: false, message: 'Ocurrió un error al intentar iniciar sesión' };
			// 	}
			// },
			handleLogin: async (body) => {
				try {
					const data = await actions.fetchRoute('login', { method: 'POST', body });
					localStorage.setItem('token', data.token);
					localStorage.setItem('role', data.role);
					setStore({ token: data.token, role: data.role });
					return { success: true, role: data.role };
				} catch (error) {
					console.error("Error en handleLogin:", error);
					return { success: false, message: 'Ocurrió un error al intentar iniciar sesión' };
				}
			},
			isAuthorized: (requiredRoles) => {
				const store = getStore();
				return requiredRoles.includes(store.role);
			},
			// fetchStudent: async () => {
			// 	try {
			// 		const response = await fetch(`${process.env.BACKEND_URL}/api/students/<student_id>`, {
			// 			headers: {
			// 				Authorization: `Bearer ${localStorage.getItem("token")}`,
			// 			},
			// 		});
			// 		if (!response.ok) throw new Error("Error al obtener los datos del representado");
			// 		return await response.json();
			// 	} catch (error) {
			// 		console.error("fetchStudent Error:", error);
			// 		throw error;
			// 	}
			// },
			fetchStudent: async (studentId) => {
				try {
					const data = await actions.fetchRoute(`students/${studentId}`, {
						method: 'GET',
						isPrivate: true,
						bluePrint: 'students'
					});
					return data;
				} catch (error) {
					console.error("fetchStudent Error:", error);
					throw error;
				}
			},
			// fetchMaterias: async () => {
			// 	try {
			// 		const response = await fetch(`${process.env.BACKEND_URL}/api/materias`, {
			// 			headers: {
			// 				Authorization: `Bearer ${localStorage.getItem("token")}`,
			// 			},
			// 		});
			// 		if (!response.ok) throw new Error("Error al obtener las materias");
			// 		return await response.json(); // Retorna las materias relacionadas
			// 	} catch (error) {
			// 		console.error("fetchMaterias Error:", error);
			// 		throw error;
			// 	}
			// },
			fetchMaterias: async () => {
				try {
					const data = await actions.fetchRoute('materias', {
						method: 'GET',
						isPrivate: true,
						bluePrint: 'materias'
					});
					return data; // Retorna las materias relacionadas
				} catch (error) {
					console.error("fetchMaterias Error:", error);
					throw error;
				}
			},
		}
	}
};


export default getState;
