import React from "react";
import styles from "../css/views/EditorView.module.scss";
import { PropTypes } from "prop-types";
import { useWindowSize } from "../utils/useWindowSize";
import Editor from "../components/editor/Editor";

const EditorView = ({ history }) => {
	const windowSize = useWindowSize();

	return (
		<div className={styles.EditorView}>
			<header className={styles.EditorView_header}>
				<h1 className={styles.EditorView_header_title}>
					Photo Editor: <b>v0.1.0</b>
				</h1>
			</header>
			<div className={styles.EditorView_editor}>
				<Editor windowSize={windowSize} />
			</div>
		</div>
	);
};

export default EditorView;

EditorView.defaultProps = {};

EditorView.propTypes = {
	history: PropTypes.object,
};
