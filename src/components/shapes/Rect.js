import React from "react";
import styles from "../../css/shapes/Rect.module.scss";
import { PropTypes } from "prop-types";
import { red } from "../../helpers/utils_styles";

const baseStyles = {
	fill: "transparent",
	stroke: red[600],
	strokeWidth: 2,
};

const Rect = ({ width = 850, height = 420 }) => {
	const custom = {
		...baseStyles,
	};

	return (
		<svg className={styles.Rect} width={width} height={height}>
			<rect
				className={styles.Rect_shape}
				width={width - 100}
				height={height - 10}
				rx={5}
				ry={5}
				x="5.5%"
				y="0.7%"
				fill="transparent"
				// stroke={red[600]}
				// strokeWidth={2}
				{...baseStyles}
			></rect>
		</svg>
	);
};

export default Rect;

Rect.defaultProps = {};

Rect.propTypes = {};
