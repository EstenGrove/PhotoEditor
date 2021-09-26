import React from "react";
import styles from "../../css/tools/CropPanel.module.scss";
import sprite from "../../assets/icons/editor2.svg";
import { PropTypes } from "prop-types";

// REQUIREMENTS:
// - Crop
// - Resize
// - Reposition
// - Zoom (in/out)
// - Rotate
// - Flip (180deg)

const icons = {
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
	flip1: "flip_to_front",
};

const ActionButton = ({
	icon = "zoomIn",
	text,
	handleAction,
	isDisabled = false,
}) => {
	return (
		<button
			type="button"
			onClick={handleAction}
			className={styles.ActionButton}
			disabled={isDisabled}
		>
			<svg className={styles.ActionButton_icon}>
				<use xlinkHref={`${sprite}#icon-${icons[icon]}`}></use>
			</svg>
			<span className={styles.ActionButton_text}>{text}</span>
		</button>
	);
};

const Section = ({ label, children }) => {
	return (
		<section className={styles.Section}>
			<div className={styles.Section_top}>
				<div className={styles.Section_top_label}>{label}</div>
			</div>
			<div className={styles.Section_options}>{children}</div>
		</section>
	);
};

const CropPanel = ({ handleCrop, handleFlip, handleZoomIn, handleZoomOut }) => {
	return (
		<div className={styles.CropPanel}>
			<div className={styles.CropPanel_top}>
				<div className={styles.CropPanel_top_title}>
					<svg className={styles.CropPanel_top_title_icon}>
						<use xlinkHref={`${sprite}#icon-transform`}></use>
					</svg>
					<span className={styles.CropPanel_top_title_text}>Crop Settings</span>
				</div>
			</div>
			<div className={styles.CropPanel_main}>
				<Section label="Zoom Options">
					<ActionButton
						handleAction={handleZoomIn}
						icon="zoomIn"
						text="Zoom In"
					/>
					<ActionButton
						handleAction={handleZoomOut}
						icon="zoomOut"
						text="Zoom Out"
					/>
				</Section>
				<Section label="Flip Image">
					<ActionButton handleAction={handleFlip} icon="flip1" text="Flip" />
				</Section>
				<Section label="Save Crop">
					<ActionButton
						handleAction={handleCrop}
						icon="fileImage"
						text="Save Crop"
					/>
				</Section>
			</div>
		</div>
	);
};

export default CropPanel;

CropPanel.defaultProps = {};

CropPanel.propTypes = {};
