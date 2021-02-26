import { useState, useEffect } from "react";

function useWindowSize() {
	const isWindowClient = typeof window === "object";

	const [windowSize, setWindowSize] = useState({
		width: isWindowClient ? window.innerWidth : undefined,
		height: isWindowClient ? window.innerHeight : undefined,
	});

	//👇
	useEffect(() => {
		//a handler which will be called on change of the screen resize
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		if (isWindowClient) {
			//register the window resize listener
			window.addEventListener("resize", handleResize);

			//un-register the listener
			return () => window.removeEventListener("resize", handleResize);
		}
	}, [isWindowClient, setWindowSize]);
	//☝️

	return windowSize;
}

export { useWindowSize };
