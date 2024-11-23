// const backend_url = process.env.BACKEND_URL + 'api'
const backendURL = process.env.BACKEND_URL || ""


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			role: '',
			token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczMjA1NjkyNywianRpIjoiMDY1NGYyODctYzRjYy00NWQ4LWFjOWMtNDI4YzkyMjdjMDBiIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6MywibmJmIjoxNzMyMDU2OTI3LCJjc3JmIjoiYTc2MGY3YzYtYTY1YS00MTgwLTg2OTgtYmQ0NTEyYTVhMDNjIiwiZXhwIjoxNzMyMDU3ODI3LCJyb2xlIjoyfQ.0Z0QygRAy2TdbNB3sML7CfvFBjkDO1aoWEDIEOvqMS0',
			message: null,
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

					console.info("Sesión cargada exitosamente")
				}
				console.info("No se encontraron credenciales")
			},
			handleRegister: async (body) => {
				try {
					const data = await actions.fetchRoute('signup', { method: 'POST', body });
					return true;
				} catch (error) {
					console.error("Error en handleRegister:", error);
					return 'Ocurrió un error al intentar registrarse';
				}
			},
			handleLogin: async (body) => {
				try {
					const data = await getActions().fetchRoute("login", { 
						method: "POST", 
						body 
					});
			
					console.log("Respuesta del backend en handleLogin:", data);
			
					if (data.token && data.role) {
						const rol = data.role.toLowerCase(); // Asegura que siempre sea minúsculas
						localStorage.setItem("token", data.token);
						localStorage.setItem("role", rol);
			
						setStore({ token: data.token, role: rol }); // Actualiza el contexto global
						return { success: true, role: rol };
					}
			
					return { success: false, message: "Respuesta incompleta del backend" };
				} catch (error) {
					console.error("Error en handleLogin:", error.message);
					return { success: false, message: error.message || "Error desconocido" };
				}
			},
			
			isAuthorized: (requiredRoles) => {
				const store = getStore();
				console.log("store.role:", store.role);
				console.log("requiredRoles:", requiredRoles);
				return requiredRoles.includes(store.role);
			},
			handleLogout: async () => {
				const { fetchRoute } = getActions();
				try {
					const resp = await fetchRoute("/logout", { 
						method: "POST", 
						isPrivate: true,  
						bluePrint: "session"
					});
			
					if (!resp) {
						console.error("No se pudo cerrar sesión");
						return;
					}
			
					setStore({ token: undefined, role: undefined });
					localStorage.removeItem("token");
					localStorage.removeItem("role");
				} catch (error) {
					console.error("Error al cerrar sesión:", error);
				}
			},
			
		}
	}
};


export default getState;
