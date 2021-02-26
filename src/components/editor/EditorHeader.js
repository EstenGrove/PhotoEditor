import React from "react";
import styles from "../../css/editor/EditorHeader.module.scss";
import sprite from "../../assets/icons/editor.svg";
import { PropTypes } from "prop-types";

const EditorHeader = ({
	src = null,
	rotateLeft,
	rotateRight,
	resetUpload,
	undoHistory,
	redoHistory,
	initPreviewDownload,
}) => {
	return (
		<div className={styles.EditorHeader}>
			{/* 1ST ROW: UNDO/REDO & SAVE BUTTONS */}
			<div className={styles.EditorHeader_topRow}>
				<button
					onClick={resetUpload}
					className={styles.EditorHeader_topRow_resetBtn}
					title="Erase Changes"
					disabled={!src}
				>
					<svg className={styles.EditorHeader_topRow_resetBtn_icon}>
						<use xlinkHref={`${sprite}#icon-history`}></use>
					</svg>
				</button>
				<div className={styles.EditorHeader_topRow_history}>
					<button
						onClick={undoHistory}
						className={styles.EditorHeader_topRow_history_undo}
						title="Undo"
						disabled={!src}
					>
						<svg className={styles.EditorHeader_topRow_history_undo_icon}>
							<use xlinkHref={`${sprite}#icon-undo`}></use>
						</svg>
					</button>
					<button
						onClick={redoHistory}
						className={styles.EditorHeader_topRow_history_redo}
						title="Redo"
						disabled={!src}
					>
						<svg className={styles.EditorHeader_topRow_history_redo_icon}>
							<use xlinkHref={`${sprite}#icon-redo`}></use>
						</svg>
					</button>
				</div>
				<div className={styles.EditorHeader_topRow_done}>
					<button
						type="button"
						title="Save Image"
						onClick={initPreviewDownload}
						className={styles.EditorHeader_topRow_done_btn}
						disabled={!src}
					>
						Done
					</button>
				</div>
			</div>
			{/* 2ND ROW: ROTATE BUTTONS */}
			<div className={styles.EditorHeader_bottomRow}>
				<div className={styles.EditorHeader_bottomRow_rotate}>
					<button
						type="button"
						onClick={rotateLeft}
						className={styles.EditorHeader_bottomRow_rotate_btn}
						disabled={!src}
					>
						<svg className={styles.EditorHeader_bottomRow_rotate_btn_icon}>
							<use xlinkHref={`${sprite}#icon-rotate_left`}></use>
						</svg>
						<span className={styles.EditorHeader_bottomRow_rotate_btn_text}>
							Rotate Left (90°)
						</span>
					</button>
				</div>
				<div className={styles.EditorHeader_bottomRow_rotate}>
					<button
						type="button"
						onClick={rotateRight}
						className={styles.EditorHeader_bottomRow_rotate_btn}
						disabled={!src}
					>
						<svg className={styles.EditorHeader_bottomRow_rotate_btn_icon}>
							<use xlinkHref={`${sprite}#icon-rotate_right`}></use>
						</svg>
						<span className={styles.EditorHeader_bottomRow_rotate_btn_text}>
							Rotate Right (90°)
						</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditorHeader;

EditorHeader.defaultProps = {};

EditorHeader.propTypes = {
	src: PropTypes.any,
	rotateLeft: PropTypes.func,
	rotateRight: PropTypes.func,
	resetUpload: PropTypes.func,
	undoHistory: PropTypes.func,
	redoHistory: PropTypes.func,
	initPreviewDownload: PropTypes.func,
};
