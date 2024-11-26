import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Sample } from "./sample";



export const Footer = () => {



   return(
	<footer className="footer mt-auto py-3 text-center">
		<Link className="link" to="/">
         <div style={{color:"white", textDecoration:"none"}}>About us</div>
		</Link>
		<Link className="link" to="/">
		<div style={{color:"white", textDecoration:"none"}}>Contact us</div>
		</Link>
		<div>CryptoScope &copy; 2024</div>
		<div>Powered by CoinGecko</div>
	</footer>
   )
};
