const getState = ({ getStore, getActions, setStore }) => {
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
};

export default getState;