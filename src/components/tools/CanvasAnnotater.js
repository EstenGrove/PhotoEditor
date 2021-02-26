import React, { useState, useRef, useEffect } from "react";
import styles from "../../css/tools/CanvasAnnotater.module.scss";
import { PropTypes } from "prop-types";
import { useOutsideClick } from "../../utils/useOutsideClick";

const CanvasAnnotater = ({
	name,
	id,
	val,
	handleAnnotate,
	closeAnnotateTool,
}) => {
	const textRef = useRef();
	const { isOutside } = useOutsideClick(textRef);

	// // close & save??? upon click-outside
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		if (isOutside) {
			closeAnnotateTool();
		}

		return () => {
			isMounted = false;
		};
	}, [closeAnnotateTool, isOutside]);

	return (
		<div className={styles.CanvasAnnotater} ref={textRef}>
			<input
				type="text"
				name={name}
				id={id}
				value={val}
				className={styles.CanvasAnnotater_input}
				onChange={handleAnnotate}
			/>
		</div>
	);
};

export default CanvasAnnotater;

CanvasAnnotater.defaultProps = {};

CanvasAnnotater.propTypes = {};
