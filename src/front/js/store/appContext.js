import React, { useState, useEffect } from "react";
import getState from "./flux.js";

// Inicializamos el contexto global
export const Context = React.createContext(null);

// Función para inyectar el contexto en cualquier componente
const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        // Estado inicial del contexto
        const [state, setState] = useState(() =>
            getState({
                getStore: () => state?.store || {}, // Verifica que state exista
                getActions: () => state?.actions || {}, // Verifica que actions exista
                setStore: (updatedStore) =>
                    setState((prevState) => ({
                        store: { ...prevState.store, ...updatedStore },
                        actions: { ...prevState.actions },
                    })),
            })
        );


        useEffect(() => {
            const initializeApp = async () => {
                try {
                    const actions = state.actions;

                    if (actions && typeof actions.loadSession === "function") {
                        // Cargar sesión inicial
                        actions.loadSession();
                    }
                } catch (error) {
                    console.error("Error durante la inicialización:", error);
                }
            };

            initializeApp();
        }, []);

        // Proveer el contexto a los componentes
        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };

    return StoreWrapper;
};

export default injectContext;
