import { useState, useEffect } from "react";

// creates link, sets type and path to icon
const setFavicon = (path, type) => {
	const link =
		document.querySelector("link[rel*='icon']") ||
		document.createElement("link");
	link.rel = "shortcut icon";
	link.type = type;
	link.href = path;
	return document.querySelector("head").appendChild(link);
};

// "activeFavicon" is the single source
// can set it from args or change manually w/ "changeFavicon"
// anytime "activeFavicon" changes, will cause a re-render and update with the current icon
const useFavicon = (path, type = "image/x-icon") => {
	const [activeFavicon, setActiveFavicon] = useState({
		path: path,
		type: type,
	});

	const changeFavicon = (path, type = "image/x-icon") => {
		setActiveFavicon({
			path,
			type,
		});
	};

	useEffect(() => {
		// get most recent favicon properties; set state
		const { path: activePath, type: activeType } = activeFavicon;
		setFavicon(activePath, activeType);
	}, [activeFavicon]);

	return {
		activeFavicon,
		setActiveFavicon,
		changeFavicon,
	};
};

export { useFavicon };
