import React from "react";
import styles from "../../css/editor/EditorButton.module.scss";
import sprite from "../../assets/icons/editor.svg";
import { PropTypes } from "prop-types";
import { purple } from "../../helpers/utils_styles";

const ICONS = {
	crop: "edit-crop",
	cut: "edit-cut",
	annotate: "create",
	finetune: "tuning",
	camera: "camera1",
	clear: "clear",
	rotateLeft: "rotate_left",
	rotateRight: "rotate_right",
	rotateCrop: "crop_rotate",
	move: "control_camera",
};

const active = {
	fill: purple[600],
};

const getActive = (isActive) => {
	if (!isActive) return null;
	return active;
};

const EditorButton = ({ isActive = false, icon, handleClick }) => {
	return (
		<button type="button" onClick={handleClick} className={styles.EditorButton}>
			<svg className={styles.EditorButton_icon} style={getActive(isActive)}>
				<use xlinkHref={`${sprite}#icon-${ICONS[icon]}`}></use>
			</svg>
		</button>
	);
};

export default EditorButton;

EditorButton.defaultProps = {};

EditorButton.propTypes = {};
