import React, { useState, useRef } from "react";
import styles from "../../css/inspector/Inspector.module.scss";
import { PropTypes } from "prop-types";
import {
	copyImgToCanvas2,
	getPixel,
	getPixelColor,
} from "../../helpers/utils_canvas";
import CanvasPreview from "./CanvasPreview";
import UploadButton from "../editor/UploadButton";
import ColorPreview from "./ColorPreview";

const customCSS = {
	upload: {
		position: "absolute",
		bottom: "-2rem",
		right: "-1rem",
	},
};

const Inspector = () => {
	const canvasRef = useRef();
	const [file, setFile] = useState(null);
	const [canvasSrc, setCanvasSrc] = useState(null);
	const [rgba, setRgba] = useState("");

	const handleFile = (e) => {
		const { files } = e.target;
		setFile(files[0]);
		setCanvasSrc(
			copyImgToCanvas2(files[0], canvasRef.current, {
				width: 700,
				height: 400,
			})
		);
	};

	const handleMouseMove = (e) => {
		const x = e.nativeEvent.layerX;
		const y = e.nativeEvent.layerY;

		const pixel = getPixel(canvasRef.current, {
			x,
			y,
		});
		const color = getPixelColor(pixel);
		console.log("color", color);
		setRgba(color);
	};

	const copyColor = (color) => {
		navigator.clipboard.writeText(color);
	};

	return (
		<div className={styles.Inspector}>
			<div className={styles.Inspector_preview}>
				<CanvasPreview
					handleMouseMove={handleMouseMove}
					canvasRef={canvasRef}
					src={canvasSrc}
				/>
				<UploadButton
					name="inspectImg"
					id="inspectImg"
					handleFile={handleFile}
					customStyles={customCSS.upload}
				/>
			</div>
			<div className={styles.Inspector_color}>
				<div className={styles.Inspector_color_label}>
					<span className={styles.Inspector_color_label_text}>
						Color Preview
					</span>
				</div>
				<ColorPreview color={rgba} copyColor={copyColor} />
			</div>
		</div>
	);
};

export default Inspector;

Inspector.defaultProps = {};

Inspector.propTypes = {};
