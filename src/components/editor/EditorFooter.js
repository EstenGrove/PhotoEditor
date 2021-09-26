import React from "react";
import styles from "../../css/editor/EditorFooter.module.scss";
import { PropTypes } from "prop-types";
import EditorButton from "./EditorButton";

const EditorFooter = ({
	activeTool = null,
	initCrop,
	initAnnotate,
	initFineTune,
	selectActiveTool,
}) => {
	return (
		<div className={styles.EditorFooter}>
			<div className={styles.EditorFooter_topRow}>{/* ROTATE & ZOOM UI */}</div>
			<div className={styles.EditorFooter_bottomRow}>
				<EditorButton
					isActive={activeTool === "CROP"}
					icon="crop"
					handleClick={() => {
						selectActiveTool("CROP");
						initCrop();
					}}
				/>
				<EditorButton
					isActive={activeTool === "FILTERS"}
					icon="filter"
					handleClick={() => {
						selectActiveTool("FILTERS");
					}}
				/>
				<EditorButton
					isActive={activeTool === "FINE-TUNE"}
					icon="finetune"
					handleClick={() => {
						selectActiveTool("FINE-TUNE");
						initFineTune();
					}}
				/>
				<EditorButton
					isActive={activeTool === "ANNOTATE"}
					icon="annotate"
					handleClick={() => {
						selectActiveTool("ANNOTATE");
						initAnnotate();
					}}
				/>
			</div>
		</div>
	);
};

export default EditorFooter;

EditorFooter.defaultProps = {};

EditorFooter.propTypes = {};
