const getState = ({ getStore, getActions, setStore }) => {
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
};

export default getState;
