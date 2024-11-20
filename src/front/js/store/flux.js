const backendURL = process.env.BACKEND_URL || ""


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			role: '',
			token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczMjA1NjkyNywianRpIjoiMDY1NGYyODctYzRjYy00NWQ4LWFjOWMtNDI4YzkyMjdjMDBiIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MywibmJmIjoxNzMyMDU2OTI3LCJjc3JmIjoiYTc2MGY3YzYtYTY1YS00MTgwLTg2OTgtYmQ0NTEyYTVhMDNjIiwiZXhwIjoxNzMyMDU3ODI3LCJyb2xlIjoyfQ.0Z0QygRAy2TdbNB3sML7CfvFBjkDO1aoWEDIEOvqMS0',

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
			}
		}
	}
};

export default getState;
