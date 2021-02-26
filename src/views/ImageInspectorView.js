import React, { useRef, useState } from "react";
import styles from "../css/views/ImageInspectorView.module.scss";
import { PropTypes } from "prop-types";
import CanvasPreview from "../components/inspector/CanvasPreview";
import {
	copyImgToCanvas2,
	getPixel,
	getPixelColor,
} from "../helpers/utils_canvas";
import UploadButton from "../components/editor/UploadButton";
import ColorPreview from "../components/inspector/ColorPreview";
import Inspector from "../components/inspector/Inspector";

// REQUIRED:
// - Use pixel data to analyze an image:
//    - Colors used
//    - Identify color on mouse-over
//    - Show color code & support copy/paste of color code
// - Useful Resource:
//    - https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas

const ImageInspectorView = () => {
	return (
		<div className={styles.ImageInspectorView}>
			<header className={styles.ImageInspectorView_header}>
				<h1 className={styles.ImageInspectorView_header_title}>
					Image Inspector
				</h1>
				<p className={styles.ImageInspectorView_header_desc}>
					Inspect an image's color usage, dimensions, file size and other useful
					attributes.
				</p>
			</header>
			<div className={styles.ImageInspectorView_main}>
				<Inspector />
			</div>
		</div>
	);
};

export default ImageInspectorView;

ImageInspectorView.defaultProps = {};

ImageInspectorView.propTypes = {};
