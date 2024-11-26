import React, { useState, useEffect } from "react"; 
import "../../styles/home.css"; 

export const Listing = () => {
    const [coins, setCoins] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await fetch(
                    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false"
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch coins");
                }
                const data = await response.json();
                setCoins(data); 
            } catch (error) {
                console.error("Error fetching coins:", error);
                setError(error.message); 
            } 
            setLoading(false); 

        };

        fetchCoins();
    }, []); 

    // 
    if (loading) {
        return <div>Loading...</div>;
    }

    
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="listing-page">
            <h1>Top 30 Cryptocurrencies</h1>
            <ul className="coin-list">
                {coins.map((coin) => (
                    <li key={coin.id} className="coin-item">
                        <img src={coin.image} alt={coin.name} className="coin-image" />
                        <div>
                            <h2>{coin.name}</h2>
                            <p>Current Price: ${coin.current_price}</p>
                            <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
