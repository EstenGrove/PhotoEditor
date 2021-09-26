import React, { useEffect, useRef, useState } from "react";
import styles from "../../css/editor/Editor.module.scss";
import { PropTypes } from "prop-types";
// utils
import {
	createURL,
	saveFile,
	getLocalFileBlob,
	createFileNameFromSettings,
} from "../../helpers/utils_files";
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
	cropCanvasAsHidden,
	zoomImgOnCanvas,
	drawTextToCanvas,
} from "../../helpers/utils_canvas";
import { isEmptyVal } from "../../helpers/utils_types";
// components
import EditorCanvas from "./EditorCanvas";
import EditorHeader from "./EditorHeader";
import EditorFooter from "./EditorFooter";
import EditorPreview from "./EditorPreview";
import UploadOrClear from "../tools/UploadOrClear";
import PreviewDownload from "../tools/PreviewDownload";
import CanvasAnnotater from "../tools/CanvasAnnotater";
import CropOverlay from "../tools/CropOverlay";

// default image (mock)
import imgSample from "../../assets/images/NeonGirl.jpg";
import EditorToolbar from "./EditorToolbar";
import Viewbox from "../tools/Viewbox";

// ##TODOS:
// - Refactor local state into more cohesive schema
// - Consider merging several options for 'primary tools'

// CONSTANTS //

// degress to increment
const DEG = 90;
const ZOOM = 0.01; // zoom step (max zoom = 3 (ie. 300%))

// canvas offsetX (left) & offsetY (top)

const Editor = ({ windowSize = {} }) => {
	const canvasRef = useRef();
	const overlayRef = useRef();
	// img mirror
	const imgRef = useRef();
	const [file, setFile] = useState(null); // new File() instance from upload
	const [filePreview, setFilePreview] = useState(null); // objectURL
	const [src, setSrc] = useState(null); // canvas source
	const [previewSrc, setPreviewSrc] = useState(null); // preview source for <img/> preview
	const [showPreviewModal, setShowPreviewModal] = useState(false);
	// editor tools & state
	const [enableCrop, setEnableCrop] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [mousePos, setMousePos] = useState({
		x: 0,
		y: 0,
	});
	// crop, filters, annotate
	const [activeTool, setActiveTool] = useState("");
	// show annotate tool
	const [showAnnotate, setShowAnnotate] = useState(false);
	const [text, setText] = useState("");
	// all settings applied to img on canvas
	const [imgSettings, setImgSettings] = useState({
		rotateDeg: 0,
		zoomPercent: 0,
		filters: [],
	});

	const initCrop = () => {
		if (activeTool === "CROP") {
			setEnableCrop(false);
			return setActiveTool("");
		} else {
			setEnableCrop(true);
			return setActiveTool("CROP");
		}
	};
	const initFineTune = () => {
		console.log(`Init fine tune...`);
	};

	const initAnnotate = () => {
		setShowAnnotate(true);
	};
	const saveAnnotate = () => {
		setShowAnnotate(false);
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
			width: canvasRef.current.width,
			height: canvasRef.current.height,
		});
		setImgSettings({
			rotateDeg: 0,
			zoomPercent: 0,
			filters: [],
		});
		setSrc(copyImgToCanvas2(file, canvasRef.current));
	};

	const selectActiveTool = (tool) => {
		switch (tool) {
			case "CROP": {
				if (activeTool === tool) {
					setEnableCrop(false);
					return setActiveTool(tool);
				}
				return setActiveTool("CROP");
			}
			case "FILTERS": {
				if (activeTool === "FILTERS") {
					return setActiveTool("");
				}

				return setActiveTool("FILTERS");
			}
			case "FINE-TUNE": {
				if (activeTool === "FINE-TUNE") {
					return setActiveTool("");
				}
				return setActiveTool("FINE-TUNE");
			}
			case "ANNOTATE": {
				if (activeTool === "ANNOTATE") {
					setShowAnnotate(false);
					return setActiveTool("");
				}
				return setActiveTool("ANNOTATE");
			}
			default:
				setActiveTool("");
		}
	};

	// ##TODOS:
	// - Hide text input possibly
	// onChange handler for annotation input
	const handleAnnotate = (e) => {
		const { value } = e.target;
		setText(value);

		const { width, height } = canvasRef.current;

		drawTextToCanvas(canvasRef.current, {
			text: value,
			font: "40px Open Sans",
			tx: width / 2,
			ty: height / 2,
		});
	};

	// PRIMARY TOOLS: CROP, FILTERS, ANNOTATE, RE-POSITION/DRAG //

	// ##TODOS:
	// - Update to support multiple filters at once
	const handleFilters = (filter) => {
		console.log(`Filter clicked:`, filter);

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

	// ##TODOS:
	// - Figure out how to get dimensions of crop overlay & use for canvas
	const handleCrop = (e) => {
		// get dimensions of <CropOverlay/>
		const { width, height, offsetLeft: sx, offsetTop: sy } = overlayRef.current;

		console.group(`Cropping...`);
		console.log("width", width);
		console.log("height", height);
		console.log("sx", sx);
		console.log("sy", sy);
		console.log("overlayRef.current", overlayRef.current);
		console.groupEnd();

		// cropCanvasAsHidden(canvasRef.current, {
		// 	sx: sx,
		// 	sy: sy,
		// 	sWidth: overlayRef.current.width,
		// 	sHeight: overlayRef.current.width,
		// 	dx: width,
		// 	dy: height,
		// 	dWidth: width,
		// 	dHeight: height,
		// 	canvasWidth: width,
		// 	canvasHeight: height,
		// });

		setShowPreviewModal(true);
		setPreviewSrc(canvasRef.current.toDataURL("image/png"));
	};

	const handleFlip = (e) => {
		console.log(`Flipping image...`);
	};

	// ##TODOS:
	// - Fix zoom handling
	const handleZoomIn = (e) => {
		const newZoom = imgSettings.zoomPercent + ZOOM;

		setImgSettings({
			...imgSettings,
			zoomPercent: newZoom >= 3 ? 3 : newZoom,
		});

		zoomImgOnCanvas(canvasRef.current, canvasRef.current, {
			scaleX: newZoom,
			scaleY: newZoom,
		});
	};
	const handleZoomOut = (e) => {
		const newZoom = imgSettings.zoomPercent - ZOOM;

		setImgSettings({
			...imgSettings,
			zoomPercent: newZoom <= 1 ? 1 : newZoom,
		});

		zoomImgOnCanvas(canvasRef.current, canvasRef.current, {
			scaleX: newZoom,
			scaleY: newZoom,
		});
	};

	const handleSaveCrop = (e) => {
		console.log(`Saving cropped image...`);
	};

	const handleFineTune = (e) => {
		console.log(`Fine tuning...`);
	};

	// DRAGGING IMAGE ON CANVAS
	const handleMouseDown = (e) => {
		const offsetX = canvasRef.current.offsetLeft;
		const offsetY = canvasRef.current.offsetTop;
		console.log(`Canvas was clicked!`);

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
	const initPreviewDownload = () => {
		setShowPreviewModal(true);
		setPreviewSrc(canvasRef.current.toDataURL("image/png"));
	};

	// reset canvas & file(s)
	const resetAll = () => {
		setFile(null);
		setFilePreview(null);
		setSrc(null);
		clearCanvas(canvasRef.current);
	};

	// saves file from bottom-left preview window
	const saveFileFromPreview = () => {
		const filename = createFileNameFromSettings(".png", imgSettings);
		saveImgFromCanvas(canvasRef.current, filename);
	};
	// closes & clears preview
	const cancelSaveFile = () => {
		setShowPreviewModal(false);
		setPreviewSrc(null);
	};

	// retrieves pixel data for a targeted portion of canvas
	const getPixels = (canvasRef) => {
		const pixels = getPixelData(canvasRef, {
			x: 20,
			y: 40,
			width: 200,
			height: 100,
		});
		console.log("pixels", pixels);
	};

	const clearTools = () => {
		setActiveTool("");
		setEnableCrop(false);
		setShowAnnotate(false);
	};

	// sets a default image file as starting example
	const handleLocalFileSample = async (file) => {
		const localFile = await getLocalFileBlob(file);

		setFile(localFile);
		setFilePreview(createURL(localFile)); // set <img/> src attr
		return setSrc(copyImgToCanvas2(localFile, canvasRef.current)); // set <canvas/> src attr
	};

	// sets mock file onMount
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}

		if (isEmptyVal(file)) {
			handleLocalFileSample(imgSample);
		}

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<div className={styles.Editor}>
				<div className={styles.Editor_window}>
					<Viewbox
						canvasRef={canvasRef}
						overlayRef={overlayRef}
						isEnabled={activeTool === "CROP"}
					/>
					<EditorCanvas
						src={src}
						canvasRef={canvasRef}
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
					<EditorPreview />
					{/* PRIMARY TOOL SELECTOR BUTTONS */}
					<EditorFooter
						selectActiveTool={selectActiveTool}
						activeTool={activeTool}
						initAnnotate={initAnnotate}
						initCrop={initCrop}
						initFineTune={initFineTune}
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
					<EditorToolbar
						src={filePreview}
						imgRef={imgRef}
						filePreview={filePreview}
						winSize={windowSize}
						activeTool={activeTool}
						imgSettings={imgSettings}
						activeFilters={imgSettings.filters}
						handleFilters={handleFilters}
						handleCrop={handleCrop}
						handleAnnotate={handleAnnotate}
						handleFineTune={handleFineTune}
						handleSaveCrop={handleSaveCrop}
						handleFlip={handleFlip}
						handleZoomIn={handleZoomIn}
						handleZoomOut={handleZoomOut}
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
