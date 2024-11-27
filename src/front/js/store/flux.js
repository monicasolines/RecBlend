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
            favorites: [],
            Wallet: [],
			coins: [],
			loadingCoins: true,
            showContactModal: false,
            showModal: false,
            showOverallHoldings: false,
            showWallet: false,
            showFavorites: false,
		},
        actions: {
            setShowContactModal: () => {
                setStore({ showContactModal: !getStore().showContactModal })
            },
            setShowOverallHoldings: () => {
                setStore({ showOverallHoldings: true})
                setStore({ showWallet: false})
                setStore({ showFavorites: false})
            },
            setShowWallet: () => {
                setStore({ showWallet: true})
                setStore({ showOverallHoldings: false})
                setStore({ showFavorites: false})
            },
            setShowFavorites: () => {
                setStore({ showFavorites: true})
                setStore({ showWallet: false})
                setStore({ showOverallHoldings: false})
            },
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
            signUp: (username, password) => {
                console.log(`Sign-up request for: ${username}`);
                // Implement API call or logic for user registration
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
            getMessage: async () => {
                try {
                    const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
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
            },
            addToFavs: (id, name, symbol, current_price) => {
				const exist = getStore().favorites.find((favorite) => favorite.name === name)
				if (!exist) {
					let newFav = { name: name, id: id, symbol: symbol, current_price: current_price };
					let newArr = [...getStore().favorites, newFav];
					setStore({ favorites: newArr });
				} else { console.log("favorite exists") }
            },
        },
    };
};

export default getState;
