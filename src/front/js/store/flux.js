const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
			],
			username: null, // Initially no user is logged in
			coins: [],
			loadingCoins: true,
		},

		actions: {
			fetchCoins: async () => {
				setStore({ loadingCoins: true });
				try {
					const response = await fetch(
						"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false"
					);
					const data = await response.json();
					setStore({ coins: data, loadingCoins: false });
				} catch (error) {
					console.error("Error fetching coins:", error);
					setStore({ loadingCoins: false });
				}
			},

			login: () => {
				setStore({ username: "JohnDoe" }); // Replace with actual login logic
				console.log("User logged in"); // Optional: Debugging message
			},
			logout: () => {
				setStore({ username: null }); // Clear the username
				console.log("User logged out"); // Optional: Debugging message
			},
			search: (query) => {
				console.log("Search query:", query); // Implement actual search logic
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				} catch (error) {
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};

};

export default getState;
