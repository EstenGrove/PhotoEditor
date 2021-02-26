import React from "react";
import styles from "../../css/editor/EditorCanvas.module.scss";
import { PropTypes } from "prop-types";

const EditorCanvas = ({
	id = "canvas",
	canvasRef,
	src,
	width = 1200,
	height = 600, // 600
	...rest
}) => {
	return (
		<div className={styles.EditorCanvas}>
			<canvas
				className={styles.EditorCanvas_canvas}
				width={width}
				height={height}
				ref={canvasRef}
				src={src}
				id={id}
				{...rest}
			></canvas>
		</div>
	);
};

export default EditorCanvas;

EditorCanvas.defaultProps = {
	id: "canvas",
};

EditorCanvas.propTypes = {
	id: PropTypes.string,
};
