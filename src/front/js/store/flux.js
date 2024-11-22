const backendURL = process.env.BACKEND_URL || ""


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			role: '',
			token: '',
			message: null,
			demo: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			fetchRoute: async (endpoint, { method = 'GET', body = '', isPrivate = false, bluePrint = '' } = {}) => {
				if (isPrivate) getActions().loadSession();

				const headers = {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				}
				const { token } = getStore()


				if (isPrivate && token) {
					headers['Authorization'] = `Bearer ${token}`
				}

				if (isPrivate && (!token || !bluePrint)) {
					throw new Error(`Missing: Token: ${!token}, bluePrint: ${!bluePrint} for private route`)
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
					return
				}
				console.info("No credentials found")

			}, subjectsOperations: async (method, id = '', body = '') => {
				try {
					let validMethods = ['GET', 'POST', 'PUT', 'DELETE']
					if (!validMethods.includes(method)) {
						throw new Error(`Metodo no reconocido ${method}`);

					}

					if (['PUT', 'DELETE'].includes(method) && !id) {
						throw new Error(`Missing URL parameters for method "${method}"`);
					}


					const response = await getActions().fetchRoute(`materias/${id}`, {
						method,
						isPrivate: true,
						bluePrint: 'admin',
						body: method !== 'GET' ? body : '',

					})

					return response
				}
				catch (error) {
					console.error(error.message)
				}
			}
		}
	}
};

export default getState;
