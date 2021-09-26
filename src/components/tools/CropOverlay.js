import React, { useState, useRef, useEffect } from "react";
import styles from "../../css/tools/CropOverlay.module.scss";
import { PropTypes } from "prop-types";

const initBoundary = (ref) => {
	const canvas = ref.current;
	const ctx = canvas.getContext("2d");
	ctx.beginPath();
	ctx.rect(20, 20, 150, 200);
	ctx.fillStyle("#e84855");
	ctx.stroke();
};

const initialPos = {
	x: 217,
	y: 696,
};

const CropOverlay = ({
	canvasRef = null,
	disableDrag = true,
	isEnabled = false,
	overlayRef = null,
}) => {
	const [isDragging, setIsDragging] = useState(false);
	const [mousePos, setMousePos] = useState({
		x: 0,
		y: 0,
	});

	// DRAGGING IMAGE ON CANVAS
	const handleMouseDown = (e) => {
		if (disableDrag) return;
		const offsetX = overlayRef.current.offsetLeft;
		const offsetY = overlayRef.current.offsetTop;
		console.log(`Canvas was clicked!`);

		setIsDragging(true);
		setMousePos({
			x: parseInt(e.clientX - offsetX),
			y: parseInt(e.clientY - offsetY),
		});
	};
	const handleMouseUp = (e) => {
		if (disableDrag) return;
		const offsetX = overlayRef.current.offsetLeft;
		const offsetY = overlayRef.current.offsetTop;

		setIsDragging(false);
		setMousePos({
			x: parseInt(e.clientX - offsetX),
			y: parseInt(e.clientY - offsetY),
		});
	};
	const handleMouseOut = (e) => {
		if (disableDrag) return;
		const offsetX = overlayRef.current.offsetLeft;
		const offsetY = overlayRef.current.offsetTop;

		setIsDragging(false);
		setMousePos({
			x: parseInt(e.clientX - offsetX),
			y: parseInt(e.clientY - offsetY),
		});
	};
	// mousemove handler
	// ## TODOS:
	// - Implement positioning relative to canvas
	const dragOverlay = (e) => {
		if (disableDrag) return;
		const offsetX = overlayRef.current.offsetLeft;
		const offsetY = overlayRef.current.offsetTop;
		setMousePos({
			x: parseInt(e.clientX - offsetX),
			y: parseInt(e.clientY - offsetY),
		});

		console.log(`Dragging...`);

		if (isDragging) {
			overlayRef.current.style.top = `${mousePos.y}px`;
			overlayRef.current.style.left = `${mousePos.x}px`;
		}
	};

	if (!isEnabled) {
		return null;
	}
	return (
		<div
			className={styles.CropOverlay}
			onMouseDown={disableDrag ? null : (e) => handleMouseDown(e)}
			onMouseOut={disableDrag ? null : (e) => handleMouseOut(e)}
			onMouseUp={disableDrag ? null : (e) => handleMouseUp(e)}
			onMouseMove={disableDrag ? null : (e) => dragOverlay(e)}
		>
			<div className={styles.CropOverlay_boundary} ref={overlayRef}></div>
		</div>
	);
};

export default CropOverlay;

CropOverlay.defaultProps = {
	isEnabled: false,
};

CropOverlay.propTypes = {
	isEnabled: PropTypes.bool,
};
