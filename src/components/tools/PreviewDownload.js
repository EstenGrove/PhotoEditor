import React from "react";
import styles from "../../css/tools/PreviewDownload.module.scss";
import sprite from "../../assets/icons/editor.svg";
import { PropTypes } from "prop-types";

const PreviewDownload = ({ src, saveFile, cancelSaveFile }) => {
	return (
		<aside className={styles.PreviewDownload}>
			<img
				src={src}
				alt="Modified Preview"
				className={styles.PreviewDownload_preview}
			/>
			<button
				type="button"
				onClick={cancelSaveFile}
				className={styles.PreviewDownload_cancel}
			>
				<svg className={styles.PreviewDownload_cancel_icon}>
					<use xlinkHref={`${sprite}#icon-clear`}></use>
				</svg>
			</button>
			<button
				type="button"
				onClick={saveFile}
				className={styles.PreviewDownload_save}
			>
				<svg className={styles.PreviewDownload_save_icon}>
					<use xlinkHref={`${sprite}#icon-arrow_downward`}></use>
				</svg>
			</button>
		</aside>
	);
};

export default PreviewDownload;

PreviewDownload.defaultProps = {};

PreviewDownload.propTypes = {};
