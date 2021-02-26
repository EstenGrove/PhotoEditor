import React, { useState } from "react";
import styles from "../../css/tools/UploadOrClear.module.scss";
import { PropTypes } from "prop-types";
import UploadButton from "../editor/UploadButton";
import ClearButton from "./ClearButton";

const UploadOrClear = ({
	hasUpload = false,
	handleFileUpload,
	handleClearCanvas,
}) => {
	return (
		<div className={styles.UploadOrClear}>
			{!hasUpload && (
				<UploadButton id="file" name="file" handleFile={handleFileUpload} />
			)}
			{hasUpload && <ClearButton handleClear={handleClearCanvas} />}
		</div>
	);
};

export default UploadOrClear;

UploadOrClear.defaultProps = {};

UploadOrClear.propTypes = {};
