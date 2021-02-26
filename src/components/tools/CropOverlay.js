import React from "react";
import styles from "../../css/tools/CropOverlay.module.scss";
import { PropTypes } from "prop-types";

const CropOverlay = ({ isEnabled = false }) => {
	if (!isEnabled) {
		return null;
	}
	return (
		<div className={styles.CropOverlay}>
			<div className={styles.CropOverlay_boundary}></div>
		</div>
	);
};

export default CropOverlay;

CropOverlay.defaultProps = {};

CropOverlay.propTypes = {};
