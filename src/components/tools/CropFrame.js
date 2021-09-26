import React from "react";
import styles from "../../css/tools/CropFrame.module.scss";
import { PropTypes } from "prop-types";

const CropFrame = ({ frameRef, children }) => {
	return (
		<div className={styles.CropFrame}>
			<div className={styles.CropFrame_frame} ref={frameRef}>
				{/* {children} */}
				{/* {children} */}
			</div>
		</div>
	);
};

export default CropFrame;

CropFrame.defaultProps = {};

CropFrame.propTypes = {};
