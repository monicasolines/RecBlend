import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Landing = () => {
	const { store, actions } = useContext(Context);

	return (
		<div id="landingPage">
			<div id="listingPreview">
				<div id="blurb"></div>
				<img id="previewPhoto" src=""></img>
			</div>
			<div id="infoPreview">
				<img id="previewPhoto" src=""></img>
				<div id="blurb"></div>
			</div>
			<div id="favPreview">
				<div id="blurb"></div>
				<img id="previewPhoto" src=""></img>
			</div>
			<div id="walletPreview">
				<img id="previewPhoto" src=""></img>
				<div id="blurb"></div>
			</div>
			<div id="perfPreview">
				<div id="blurb"></div>
				<img id="previewPhoto" src=""></img>
			</div>
		</div>
	);
};
