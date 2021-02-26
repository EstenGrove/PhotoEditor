import React from "react";
import styles from "../../css/editor/UploadButton.module.scss";
import sprite from "../../assets/icons/editor.svg";
import { PropTypes } from "prop-types";

const UploadButton = ({
	name,
	id,
	handleFile,
	handleDragEnd,
	multiple = false,
	accept = "image/*",
	customStyles = {},
}) => {
	return (
		<div className={styles.UploadButton} style={customStyles}>
			<input
				type="file"
				name={name}
				id={id}
				className={styles.UploadButton_input}
				onChange={handleFile}
				onDragEnd={handleDragEnd}
				accept={accept}
				multiple={multiple}
			/>
			<label
				htmlFor={id}
				className={styles.UploadButton_label}
				title="Upload Image"
			>
				<svg className={styles.UploadButton_label_icon}>
					<use xlinkHref={`${sprite}#icon-add_photo_alternate`}></use>
				</svg>
			</label>
		</div>
	);
};

export default UploadButton;

UploadButton.defaultProps = {};

UploadButton.propTypes = {};
