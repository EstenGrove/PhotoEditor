import React, { useEffect, useRef, useState } from "react";
import styles from "../../css/editor/Editor.module.scss";
import { PropTypes } from "prop-types";
// utils
import { createURL, saveFile } from "../../helpers/utils_files";
import {
	cloneImgToCanvas,
	copyImgToCanvas,
	rotateCanvas,
	clearCanvas,
	saveImgFromCanvas,
	// experimental utils
	copyImgToCanvas2,
	rotateCanvas2,
	copyAndScaleToCanvas,
	addFilterToCanvas,
	getPixelData,
} from "../../helpers/utils_canvas";
import { isEmptyVal } from "../../helpers/utils_types";
// components
import EditorCanvas from "./EditorCanvas";
import EditorHeader from "./EditorHeader";
import EditorFooter from "./EditorFooter";
import EditorPreview from "./EditorPreview";
import ThumbnailsBar from "../tools/ThumbnailsBar";
import UploadOrClear from "../tools/UploadOrClear";
import PreviewDownload from "../tools/PreviewDownload";
import CanvasAnnotater from "../tools/CanvasAnnotater";
import CropOverlay from "../tools/CropOverlay";

// ##TODOS:
// - Refactor local state into more cohesive schema
// - Consider merging several options for 'primary tools'

// CONSTANTS //

// degress to increment
const DEG = 90;
// canvas width & height
const WIDTH = 1200; // in px
const HEIGHT = 600; // in px

// canvas offsetX (left) & offsetY (top)

const Editor = ({ windowSize = {} }) => {
	const canvasRef = useRef();
	// img mirror
	const imgRef = useRef();
	const [file, setFile] = useState(null);
	const [filePreview, setFilePreview] = useState(null);
	const [src, setSrc] = useState(null); // canvas source
	const [previewSrc, setPreviewSrc] = useState(null);
	const [showPreviewModal, setShowPreviewModal] = useState(false);
	const [enableCrop, setEnableCrop] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [mousePos, setMousePos] = useState({
		x: 0,
		y: 0,
	});
	// crop, filters, annotate
	const [activeTool, setActiveTool] = useState("CROP");
	// show annotate tool
	const [showAnnotate, setShowAnnotate] = useState(false);
	const [text, setText] = useState("");
	// all settings applied to img on canvas
	const [imgSettings, setImgSettings] = useState({
		rotateDeg: 0,
		zoomPercent: 0,
		filters: [],
	});

	const handleAnnotate = (e) => {
		const { value } = e.target;
		setText(value);
	};

	// upload file, set <img/> & <canvas/> 'src' attributes
	const handleFile = (e) => {
		const { files } = e.target;
		setFile(files[0]);
		setFilePreview(createURL(files[0])); // set <img/> src attr
		// set <canvas/> src attr
		setSrc(copyImgToCanvas2(files[0], canvasRef.current));
	};
	const rotateRight = (deg = 90) => {
		const newDeg = imgSettings.rotateDeg + deg;
		setImgSettings({
			...imgSettings,
			rotateDeg: newDeg,
		});
		rotateCanvas2(newDeg, imgRef.current, canvasRef.current);
	};
	const rotateLeft = (deg = 90) => {
		const newDeg = imgSettings.rotateDeg - deg;
		setImgSettings({
			...imgSettings,
			rotateDeg: newDeg,
		});
		rotateCanvas2(newDeg, imgRef.current, canvasRef.current);
	};

	// erases changes to image, set back to original upload
	const resetUpload = () => {
		clearCanvas(canvasRef.current, {
			width: 1200,
			height: 700,
		});
		setImgSettings({
			rotateDeg: 0,
			zoomPercent: 0,
			filters: [],
		});
		setSrc(copyImgToCanvas2(file, canvasRef.current));
	};

	const initPreviewDownload = () => {
		setShowPreviewModal(true);
		setPreviewSrc(canvasRef.current.toDataURL("image/png"));
	};

	// saves file from preview window
	const saveFileFromPreview = () => {
		const filename = `Edited-${file.name}`;
		saveImgFromCanvas(canvasRef.current, filename);
	};
	// closes & clears preview
	const cancelSaveFile = () => {
		setShowPreviewModal(false);
		setPreviewSrc(null);
	};

	// PRIMARY TOOLS: CROP, FILTERS, ANNOTATE, RE-POSITION/DRAG //

	// ##TODOS:
	// - Update to support multiple filters at once
	const handleFilters = (filter) => {
		addFilterToCanvas(imgRef.current, canvasRef.current, {
			filter: filter,
			filterVal: "10",
		});
		if (imgSettings.filters.includes(filter)) {
			return setImgSettings({
				...imgSettings,
				filters: [...imgSettings.filters.filter((x) => x !== filter)],
			});
		} else {
			return setImgSettings({
				...imgSettings,
				filters: [...imgSettings.filters, filter],
			});
		}
	};

	const initCrop = () => {
		setEnableCrop(!enableCrop);
		setActiveTool("CROP");
	};

	const initAnnotate = () => {
		setShowAnnotate(true);
	};
	const saveAnnotate = () => {
		setShowAnnotate(false);
	};

	// DRAGGING IMAGE ON CANVAS
	const handleMouseDown = (e) => {
		const offsetX = canvasRef.current.offsetLeft;
		const offsetY = canvasRef.current.offsetTop;

		setIsDragging(true);
		setMousePos({
			x: parseInt(e.clientX - offsetX),
			y: parseInt(e.clientY - offsetY),
		});
	};
	const handleMouseUp = (e) => {
		const offsetX = canvasRef.current.offsetLeft;
		const offsetY = canvasRef.current.offsetTop;

		setIsDragging(false);
		setMousePos({
			x: parseInt(e.clientX - offsetX),
			y: parseInt(e.clientY - offsetY),
		});
	};
	const handleMouseOut = (e) => {
		const offsetX = canvasRef.current.offsetLeft;
		const offsetY = canvasRef.current.offsetTop;

		setIsDragging(false);
		setMousePos({
			x: parseInt(e.clientX - offsetX),
			y: parseInt(e.clientY - offsetY),
		});
	};
	// mousemove handler
	const dragImgOnCanvas = (e) => {
		const offsetX = canvasRef.current.offsetLeft;
		const offsetY = canvasRef.current.offsetTop;
		setMousePos({
			x: parseInt(e.clientX - offsetX),
			y: parseInt(e.clientY - offsetY),
		});

		if (isDragging) {
			const ctx = canvasRef.current.getContext("2d");
			ctx.clearRect(0, 0, 1200, 600);
			ctx.drawImage(
				imgRef.current,
				mousePos.x - 1200 / 2,
				mousePos.y - 600 / 2,
				1200,
				600
			);
		}
	};

	// reset canvas & file(s)
	const resetAll = () => {
		setFile(null);
		setFilePreview(null);
		setSrc(null);
		clearCanvas(canvasRef.current);
	};

	const getPixels = (canvasRef) => {
		const pixels = getPixelData(canvasRef, {
			x: 20,
			y: 40,
			width: 200,
			height: 100,
		});
		console.log("pixels", pixels);
	};

	return (
		<>
			<div className={styles.Editor}>
				<div style={{ margin: "10rem 0" }}>
					<button className="btn" onClick={() => getPixels(canvasRef.current)}>
						Get Pixels
					</button>
				</div>
				<div className={styles.Editor_window}>
					<CropOverlay isEnabled={enableCrop} />
					<EditorCanvas
						canvasRef={canvasRef}
						src={src}
						onMouseDown={handleMouseDown}
						onMouseUp={handleMouseUp}
						onMouseOut={handleMouseOut}
						onMouseMove={dragImgOnCanvas}
					/>
					<EditorHeader
						src={filePreview}
						rotateLeft={() => rotateLeft(DEG)}
						rotateRight={() => rotateRight(DEG)}
						resetUpload={resetUpload}
						initPreviewDownload={initPreviewDownload}
					/>
					{/* CROP CONTROLS SECTION */}
					<EditorPreview />
					<EditorFooter
						activeTool={activeTool}
						initAnnotate={initAnnotate}
						initCrop={initCrop}
					/>
					{showAnnotate && (
						<CanvasAnnotater
							name="text"
							id="text"
							val={text}
							handleAnnotate={handleAnnotate}
							closeAnnotateTool={saveAnnotate}
						/>
					)}
					<UploadOrClear
						hasUpload={!isEmptyVal(file)}
						handleClearCanvas={resetAll}
						handleFileUpload={handleFile}
					/>
				</div>
				<div className={styles.Editor_thumbnails}>
					<ThumbnailsBar
						imgRef={imgRef}
						src={filePreview}
						windowSize={windowSize}
						handleFilters={handleFilters}
						activeFilters={imgSettings.filters}
					/>
				</div>
			</div>

			{showPreviewModal && (
				<PreviewDownload
					src={previewSrc}
					saveFile={saveFileFromPreview}
					cancelSaveFile={cancelSaveFile}
				/>
			)}
		</>
	);
};

export default Editor;

Editor.defaultProps = {};

Editor.propTypes = {};
