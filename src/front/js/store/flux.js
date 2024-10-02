const getState = ({ getStore, getActions, setStore }) => {
<<<<<<< HEAD
    return {
        store: {
            user: null,
            autenticado: false,
            message: null
        },
        actions: {
            register: async (formData) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + '/api/signup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(formData)
                    });

                    const data = await response.json();
                    console.log('Response data:', data);

                    if (response.ok) {
                        return {
                            success: true,
                            message: 'Usuario creado exitosamente.',
                        };
                    } else {
                        return {
                            success: false,
                            message: data.message || 'Error desconocido durante el registro '
                        };
                    }
                } catch (error) {
                    console.error('Error en registerUser:', error);
                    return {
                        success: false,
                        message: 'Error de conexión o servidor no disponible'
                    };
                }
            },

            loginUser: async ({ email, password }) => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email, password })
                    });
                    const data = await response.json();
                    if (response.ok) {
                        if (data && data.token && data.user) {
                            localStorage.setItem("token", data.token);
                            setStore({
                                user: data.user,
                                autenticado: true
                            });
                            return {
                                success: true,
                                user: data.user,
                                data: {
                                    token: data.token
                                },
                                message: 'Conexión exitosa con el servidor'
                            };
                        } else {
                            return {
                                success: false,
                                message: 'Datos de respuesta incompletos'
                            };
                        }
                    } else {
                        return {
                            success: false,
                            message: data.message || 'Error desconocido'
                        };
                    }
                } catch (error) {
                    return {
                        success: false,
                        message: 'Error de conexión o servidor no disponible'
                    };
                }
            },

            logout: () => {
                // Remove token and user data from localStorage
                localStorage.removeItem('token');
                localStorage.removeItem('usuarioImage');

                // Update store state
                setStore({
                    user: null,
                    autenticado: false
                });

                // Optionally redirect or perform other actions
                window.location.href = "/";
            },

            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
                    const data = await resp.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            }
        }
    };
=======
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a function
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("Application just loaded, syncing the session storage token");
				if (token && token !== "" && token !== undefined) {
					setStore({ token: token });
				}
			},

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("Logging out");
				setStore({ token: null });
			},

			login: async (email, password) => {
				const opts = {
					method: 'POST',
					body: JSON.stringify({
						email: email,
						password: password
					}),
					headers: { 'Content-Type': 'application/json' }
				};
				try {  
					const resp = await fetch('https://redesigned-space-parakeet-wrrpjgxqx5rp39p6v-3001.app.github.dev/api/token', opts);
					if (resp.status !== 200) {  
						alert("There has been an error");
						return false;
					}
					const data = await resp.json();
					console.log("This came from the backend", data);
					sessionStorage.setItem("token", data.access_token);
					setStore({ token: data.access_token });
					return true;
				} catch (error) {
					console.error("There has been an error logging in", error);
				}
			},

			getMessage: async () => {
				const store = getStore();
				const opts = {
					headers: {
						"Authorization": "Bearer " + store.token
					}
				};
				try {
					const resp = await fetch('https://redesigned-space-parakeet-wrrpjgxqx5rp39p6v-3001.app.github.dev/', opts);
					const data = await resp.json();
					setStore({ message: data.message });
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},

			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});
				setStore({ demo: demo });
			}
		}
	};
>>>>>>> 8c9abea63ebc5b91011e59735e4a59e27d3e64ee
};

export default getState;