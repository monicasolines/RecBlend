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
						let error = await response.json()
						throw new Error(`Error con la solicitud: ${error.msg ?? error.error}`)
					}

					const data = await response.json()
					return data
				} catch (error) {
					console.error(error.message)
					throw error
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

			}, crudOperation: async (entity, method, { id = '', body = null, bluePrint = '' } = {}) => {
				const validMethods = ['GET', 'POST', 'PUT', 'DELETE']
				if (!validMethods.includes(method)) {
					throw new Error(`Invalid method "${method}". Allowed methods: ${validMethods.join(', ')}`);

				}

				if (['PUT', 'DELETE'].includes(method) && !id) {
					throw new Error(`Missing URL parameters for method "${method}".`);
				}
				try {
					let endpoint = id ? `${entity}/${id}` : entity
					const response = await getActions().fetchRoute(endpoint, {
						method,
						isPrivate: true,
						bluePrint: bluePrint,
						body: method !== 'GET' ? body : null
					})

					return response

				} catch (error) {
					console.error(`Error in CRUD operation for ${entity}: ${error.message}`);
					throw error
				}

			}, subjectsOperations: async (method, body = '', id = '') => {
				return getActions().crudOperation('materias', method, { id, body, bluePrint: 'admin' })
			}
		}
	}
};

export default getState;
