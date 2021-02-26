import { useEffect } from "react";
import { setupCanvas } from "../helpers/utils_canvas";
import { isEmptyVal } from "../helpers/utils_types";

export const useCanvasSetup = ({ id = `canvas` }) => {
	const canvas = document.querySelector(`#${id}`);

	// returns early, if no canvas el mounted
	const setupWrapper = (canvas) => {
		if (isEmptyVal(canvas)) return;
		setupCanvas(canvas);
	};

	// sets up pixel ratio for canvas 'onMount'
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		setupWrapper(canvas);

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
};
