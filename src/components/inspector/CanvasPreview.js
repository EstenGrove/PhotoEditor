import React from "react";
import styles from "../../css/inspector/CanvasPreview.module.scss";
import { PropTypes } from "prop-types";

const CanvasPreview = ({
	canvasRef,
	src = null,
	width = 700,
	height = 400,
	handleMouseMove,
}) => {
	return (
		<div className={styles.CanvasPreview} onMouseMove={handleMouseMove}>
			<canvas
				ref={canvasRef}
				src={src}
				className={styles.CanvasPreview_canvas}
				width={width}
				height={height}
			></canvas>
		</div>
	);
};

export default CanvasPreview;

CanvasPreview.defaultProps = {};

CanvasPreview.propTypes = {};
