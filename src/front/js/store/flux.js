const backendURL = process.env.BACKEND_URL || ""


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			role: '',
			token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczMjIwNDM4NSwianRpIjoiODU0ZjY3MGQtMjVhNS00ODE0LThkM2QtMTdlZTMyMjU5ZmNlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjIiLCJuYmYiOjE3MzIyMDQzODUsImNzcmYiOiI0ZWMxN2MzOS1lZTFkLTQzZjctYWI5ZS1kMTAzYjQzNjg4MGMiLCJleHAiOjE3MzIyMDc5ODUsInJvbGUiOjF9.0ARjLXKWepgAOXF6lc8ru7mfhyX7DjGO_Hi32YLdmAE',
			profesores: [],
			usuarios: [],
			grados: [],
			materias: [],
		},
		actions: {
			// Use getActions to call a function within a fuction


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

			// CRUD para usuarios autorizados

			getUsers: async () => {
				const actions = getActions()
				const data = await actions.fetchRoute("user/auth", {
					method: "GET",
					isPrivate: true,
					bluePrint: 'admin'
				});
				setStore({ usuarios: data })
			},

			postUser: async (body) => {
				const actions = getActions()
				const data = await actions.fetchRoute("user/auth", {
					method: "POST",
					body: body,
					isPrivate: true,
					bluePrint: 'admin'
				});
				actions.getUsers()
			},

			deleteUser: async (id) => {
				const actions = getActions()
				const data = await actions.fetchRoute(`user/auth/${id}`, {
					method: "DELETE",
					isPrivate: true,
					bluePrint: 'admin'
				});
				actions.getUsers()
			},

			// CRUD para profesores

			postTeacher: async (body) => {
				const actions = getActions()
				const data = await actions.fetchRoute("teacher", {
					method: "POST",
					body: body,
					isPrivate: true,
					bluePrint: 'admin'
				});
				actions.getTeachers()
			},

			deleteTeacher: async (id) => {
				const actions = getActions()
				const data = await actions.fetchRoute(`teacher/${id}`, {
					method: "DELETE",
					isPrivate: true,
					bluePrint: 'admin'
				});
				actions.getTeachers()
			},

			getTeachers: async () => {
				const actions = getActions()
				const data = await actions.fetchRoute("teachers", {
					method: "GET",
					isPrivate: true,
					bluePrint: 'admin'
				});
				setStore({ profesores: data })
			},

			// CRUD para grados

			postCourse: async (grado) => {
				const actions = getActions()
				const data = await actions.fetchRoute("grados", {
					method: "POST",
					body: grado,
					isPrivate: true,
					bluePrint: 'admin'
				});
				actions.getCourses()
			},

			deleteCourse: async (id) => {
				const actions = getActions()
				const data = await actions.fetchRoute(`grados/${id}`, {
					method: "DELETE",
					isPrivate: true,
					bluePrint: 'admin'
				});
				actions.getCourses()
			},

			getCourses: async () => {
				const actions = getActions()
				const data = await actions.fetchRoute("grados", {
					method: "GET",
					isPrivate: true,
					bluePrint: 'admin'
				});
				setStore({ grados: data })
			}
		}
	}
}


export default getState;
