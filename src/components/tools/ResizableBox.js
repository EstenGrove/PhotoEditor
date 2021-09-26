import React, { useState, useRef } from "react";
import styles from "../../css/tools/ResizableBox.module.scss";
import { PropTypes } from "prop-types";

const ResizableBox = ({ disableDrag = false, isEnabled = true }) => {
	const boxRef = useRef();
	const boundaryRef = useRef();

	const [isDragging, setIsDragging] = useState(false);
	const [mousePos, setMousePos] = useState({
		x: 0,
		y: 0,
	});

	// DRAGGING IMAGE ON CANVAS
	const handleMouseDown = (e) => {
		if (disableDrag) return;
		const offsetX = boundaryRef.current.offsetLeft;
		const offsetY = boundaryRef.current.offsetTop;

		setIsDragging(true);
		setMousePos({
			x: parseInt(e.clientX - offsetX),
			y: parseInt(e.clientY - offsetY),
		});
	};
	const handleMouseUp = (e) => {
		if (disableDrag) return;
		const offsetX = boundaryRef.current.offsetLeft;
		const offsetY = boundaryRef.current.offsetTop;

		setIsDragging(false);
		setMousePos({
			x: parseInt(e.clientX - offsetX),
			y: parseInt(e.clientY - offsetY),
		});
	};
	const handleMouseOut = (e) => {
		if (disableDrag) return;
		const offsetX = boundaryRef.current.offsetLeft;
		const offsetY = boundaryRef.current.offsetTop;

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
		const offsetX = boundaryRef.current.offsetLeft;
		const offsetY = boundaryRef.current.offsetTop;
		setMousePos({
			x: parseInt(e.clientX - offsetX),
			y: parseInt(e.clientY - offsetY),
		});

		console.log(`Dragging...`);

		if (isDragging) {
			boundaryRef.current.style.top = `${mousePos.y}px`;
			boundaryRef.current.style.left = `${mousePos.x}px`;
		}
	};

	if (!isEnabled) {
		return null;
	}

	return (
		<div className={styles.ResizableBox} ref={boxRef}>
			<div
				className={styles.ResizableBox_boundary}
				ref={boundaryRef}
				onMouseDown={disableDrag ? null : (e) => handleMouseDown(e)}
				onMouseOut={disableDrag ? null : (e) => handleMouseOut(e)}
				onMouseUp={disableDrag ? null : (e) => handleMouseUp(e)}
				onMouseMove={disableDrag ? null : (e) => dragOverlay(e)}
			></div>
		</div>
	);
};

export default ResizableBox;

ResizableBox.defaultProps = {};

ResizableBox.propTypes = {};
