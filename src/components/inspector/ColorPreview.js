import React from "react";
import styles from "../../css/inspector/ColorPreview.module.scss";
import { PropTypes } from "prop-types";

const ColorPreview = ({ color, copyColor }) => {
	return (
		<div
			className={styles.ColorPreview}
			style={{ backgroundColor: color }}
			onClick={() => copyColor(color)}
		>
			<span className={styles.ColorPreview_color}>{color}</span>
		</div>
	);
};

export default ColorPreview;

ColorPreview.defaultProps = {};

ColorPreview.propTypes = {
	color: PropTypes.string,
};
