import React from "react";
import styles from "../../css/editor/EditorFooter.module.scss";
import { PropTypes } from "prop-types";
import EditorButton from "./EditorButton";

const EditorFooter = ({
	activeTool = null,
	initCrop,
	initFilters,
	initAnnotate,
}) => {
	return (
		<div className={styles.EditorFooter}>
			<div className={styles.EditorFooter_topRow}>{/* ROTATE & ZOOM UI */}</div>
			<div className={styles.EditorFooter_bottomRow}>
				<EditorButton
					isActive={activeTool === "crop"}
					icon="crop"
					handleClick={initCrop}
				/>
				<EditorButton
					isActive={activeTool === "filters"}
					icon="finetune"
					handleClick={initFilters}
				/>
				<EditorButton
					isActive={activeTool === "annotate"}
					icon="annotate"
					handleClick={initAnnotate}
				/>
			</div>
		</div>
	);
};

export default EditorFooter;

EditorFooter.defaultProps = {};

EditorFooter.propTypes = {};
