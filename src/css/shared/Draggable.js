import React, { useRef, useState } from "react";
import styles from "../../css/shared/Draggable.module.scss";
import { PropTypes } from "prop-types";

const getTop = (y, dragRef) => {
	const offsetTop = dragRef.current.offsetTop;
	return y + offsetTop + "px";
};
const getLeft = (x, dragRef) => {
	const offsetLeft = dragRef.current.offsetLeft;
	return x + offsetLeft + "px";
};

const Draggable = ({ children }) => {
	const dragRef = useRef();
	const [position, setPosition] = useState({
		x: 0,
		y: 0,
	});

	const initDrag = (e) => {
		setPosition({
			x: e.clientX,
			y: e.clientY,
		});
		dragRef.current.addEventListener("mousemove", handleDrag);
		dragRef.current.addEventListener("mouseup", stopDrag);
	};

	const handleDrag = (e) => {
		const { x, y } = position;
		const posX = e.clientX - x;
		const posY = e.clientY - y;

		// update coords
		setPosition({
			x: e.clientY,
			y: e.clientY,
		});
		dragRef.current.style.top = `${dragRef.current.offsetTop + posY}px`;
		dragRef.current.style.left = `${dragRef.current.offsetLeft + posX}px`;
	};

	const stopDrag = (e) => {
		dragRef.current.removeEventListener("mousemove", handleDrag);
		dragRef.current.removeEventListener("mouseup", stopDrag);
	};

	return (
		<div
			ref={dragRef}
			className={styles.Draggable}
			// style={{
			// 	position: "absolute",
			// 	top: getTop(position.y, dragRef),
			// 	left: getLeft(position.x, dragRef),
			// }}
			onMouseDownCapture={initDrag}
		>
			{/*  */}
			{/*  */}
			{/*  */}
		</div>
	);
};

export default Draggable;

Draggable.defaultProps = {};

Draggable.propTypes = {};
