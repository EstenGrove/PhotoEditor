import React from "react";
import styles from "../../css/editor/EditorButton.module.scss";
import sprite from "../../assets/icons/editor2.svg";
import { PropTypes } from "prop-types";
import { blueGrey, purple } from "../../helpers/utils_styles";

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
	checkmark: "checkmark",
	add: "add",
	minus: "remove",
	gesture: "gesture",
	errorDark: "error",
	errorLight: "error_outline",
	outline: "crop_free",
	original: "crop_original",
	filter: "filter_b_and_w",
	center: "filter_center_focus",
	special: "flare",
	flip: "flip",
	colors: "style",
	texture: "texture",
	transform: "transform",
	movieEffects: "movie_filter",
	imageFilter: "photo_filter",
	print: "local_printshop",
	share: "share",
	aspectRatio: "aspect_ratio",
	infoDark: "info",
	infoLight: "info_outline",
	settings: "settings",
	zoomIn: "zoom_in",
	zoomOut: "zoom_out",
	fx: "auto_fix_high",
	fx1: "auto_fix_normal",
	fxOff: "auto_fix_off",
	fileImage: "file-image-o",
	filePDF: "file-pdf-o",
};

const active = {
	backgroundColor: blueGrey[50],
	fill: blueGrey[900],
};

const getActive = (isActive) => {
	if (!isActive) return null;
	return active;
};

const EditorButton = ({ isActive = false, icon, handleClick }) => {
	return (
		<button
			type="button"
			onClick={handleClick}
			className={styles.EditorButton}
			style={getActive(isActive)}
		>
			<svg className={styles.EditorButton_icon} style={getActive(isActive)}>
				<use xlinkHref={`${sprite}#icon-${ICONS[icon]}`}></use>
			</svg>
		</button>
	);
};

export default EditorButton;

EditorButton.defaultProps = {};

EditorButton.propTypes = {};
