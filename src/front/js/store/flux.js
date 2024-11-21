const backendURL = process.env.BACKEND_URL || ""


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			role: '',
			token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczMjA2MzIwOSwianRpIjoiODRlYzNhYzAtMmY5Yi00ZDhiLWJlMTEtNDNiY2FkZTg2ZjhjIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MiwibmJmIjoxNzMyMDYzMjA5LCJjc3JmIjoiMTIyNjcwMGYtZmI1MS00ODUwLWIxZjUtMzE1MmEwMDU3MmY4IiwiZXhwIjoxNzMyMDY2ODA5LCJyb2xlIjoxfQ.ZTWAu4iy9sSsZMrILPxrjoWrNcKjvbafYu-lKTt8xLM',
			profesores: [],
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

			getTeachers: async () => {
				const actions = getActions()
				const data = await actions.fetchRoute("teachers", {
					method: "GET",
					isPrivate: true,
					bluePrint: 'admin'
				});
				setStore({ profesores: data })
			},
		}
	}
};

export default getState;
