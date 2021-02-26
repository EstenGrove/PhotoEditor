import React, { useState, useRef } from "react";
import styles from "../css/views/PlaygroundView.module.scss";
import { PropTypes } from "prop-types";
import Draggable from "../css/shared/Draggable";

const PlaygroundView = () => {
	return (
		<div className={styles.PlaygroundView}>
			<header className={styles.PlaygroundView_header}>
				<h1 className={styles.PlaygroundView_header_title}>Playground</h1>
			</header>
			<div className={styles.PlaygroundView_content}>
				<Draggable />
			</div>
		</div>
	);
};

export default PlaygroundView;

PlaygroundView.defaultProps = {};

PlaygroundView.propTypes = {};
