import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Landing = () => {
	const { store, actions } = useContext(Context);

	return (
		<div id="landingPage">
			<div className="previewBox" id="listingPreview">
				<span id="blurb">Effortlessly explore a database of over 15,000 cryptocurrencies</span>
				<img className="previewPhoto" src="https://placehold.co/450x550"/>
			</div>
			<div className="previewBox" id="perfPreview">
				<img className="previewPhoto" src="https://placehold.co/450x550"/>
				<div id="blurb">Upon logging in immediately see the most important thing: the overall performance of your holdings</div>
			</div>
			<div className="previewBox" id="infoPreview">
				<div id="blurb">View tailored historical performance in your preferred currency, access current price and demand insights, and stay updated with real-time news specific to your chosen coin</div>
				<img className="previewPhoto" src="https://placehold.co/450x550"/>
			</div>
			<div className="previewBox" id="favPreview">
				<img className="previewPhoto" src="https://placehold.co/450x550"/>
				<div id="blurb">Add coins to your favorites list for easy access and tracking, and the ability to set price notification alerts via text</div>
			</div>
			<div className="previewBox" id="walletPreview">
				<div id="blurb">Track the coins you currently own in your wallet and access more info about them</div>
				<img className="previewPhoto" src="https://placehold.co/450x550"/>
			</div>
		</div>
	);
};
