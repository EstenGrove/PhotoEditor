import React, { useState } from "react";
import styles from "../../css/tools/Viewbox.module.scss";
import { PropTypes } from "prop-types";

const Viewbox = ({
	overlayRef,
	disableDrag = true,
	isEnabled = false,
	width = 860,
	height = 410,
	children,
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
			className={styles.Viewbox}
			width={width}
			height={height}
			ref={overlayRef}
			onMouseDown={disableDrag ? null : (e) => handleMouseDown(e)}
			onMouseOut={disableDrag ? null : (e) => handleMouseOut(e)}
			onMouseUp={disableDrag ? null : (e) => handleMouseUp(e)}
			onMouseMove={disableDrag ? null : (e) => dragOverlay(e)}
		>
			{children}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default Viewbox;

Viewbox.defaultProps = {};

Viewbox.propTypes = {};
