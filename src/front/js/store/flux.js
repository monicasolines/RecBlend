const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            username: null, // Initially no user is logged in
            // ... other state variables
        },
        actions: {
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
        },
    };
};

export default getState;
