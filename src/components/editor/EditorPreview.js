import React from "react";
import styles from "../../css/editor/EditorPreview.module.scss";
import { PropTypes } from "prop-types";

// THIS IS THE PLACEHOLDER TO BE REPLACED WITH:
// - Crop/Resize
// - Zoom
// - Rotate

const EditorPreview = ({ children }) => {
	return (
		<div className={styles.EditorPreview}>
			<div className={styles.EditorPreview_inner}>{children}</div>
		</div>
	);
};

export default EditorPreview;

EditorPreview.defaultProps = {};

EditorPreview.propTypes = {
	width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	children: PropTypes.any,
};
