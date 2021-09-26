import React, { useState, useRef } from "react";
import styles from "../css/views/PlaygroundView.module.scss";
import { PropTypes } from "prop-types";
import EditorToolbar from "../components/editor/EditorToolbar";
import EditorFooter from "../components/editor/EditorFooter";

const PlaygroundView = () => {
	const [activeTool, setActiveTool] = useState("CROP");

	// enables which tool is 'active'
	const selectTool = (tool) => {
		setActiveTool(tool);
	};

	return (
		<div className={styles.PlaygroundView}>
			<header className={styles.PlaygroundView_header}>
				<h1 className={styles.PlaygroundView_header_title}>Playground</h1>
			</header>
			<div className={styles.PlaygroundView_controls}>
				<EditorFooter
					activeTool={activeTool}
					initAnnotate={() => selectTool("ANNOTATE")}
					initCrop={() => selectTool("CROP")}
					initFilters={() => selectTool("FILTERS")}
					initFineTune={() => selectTool("FINETUNE")}
				/>
			</div>
			<div className={styles.PlaygroundView_content}>
				<EditorToolbar activeTool={activeTool} />
			</div>
		</div>
	);
};

export default PlaygroundView;

PlaygroundView.defaultProps = {};

PlaygroundView.propTypes = {};
