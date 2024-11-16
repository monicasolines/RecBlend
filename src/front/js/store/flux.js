const backendURL = process.env.BACKEND_URL || ""


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: []
		},
		actions: {
			// Use getActions to call a function within a fuction

		}
	};
};

export default getState;
