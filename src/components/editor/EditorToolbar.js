import React from "react";
import styles from "../../css/editor/EditorToolbar.module.scss";
import { PropTypes } from "prop-types";
import ImagePreview from "../tools/ImagePreview";
import AnnotatePanel from "../tools/AnnotatePanel";
import CropPanel from "../tools/CropPanel";
import FineTunePanel from "../tools/FineTunePanel";
import FiltersPanel from "../tools/FiltersPanel";
import ThumbnailsBar from "../tools/ThumbnailsBar";

// shows unedited original image
const OriginalPreview = ({
	imgRef,
	imgSrc,
	filePreview,
	alt = "Image Preview",
}) => {
	return (
		<div className={styles.OriginalPreview}>
			<ImagePreview imgRef={imgRef} imgSrc={imgSrc} alt={alt} />
			<span className={styles.OriginalPreview_label}>Original</span>
		</div>
	);
};

const EditorToolbar = ({
	winSize = {},
	activeTool = null,
	imgRef,
	src = null,
	filePreview,
	handleFilters,
	handleCrop,
	handleFineTune,
	handleAnnotate,
	handleSaveCrop,
	handleFlip,
	handleZoomIn,
	handleZoomOut,
	imgSettings = {},
	activeFilters = [],
}) => {
	return (
		<div className={styles.EditorToolbar}>
			<OriginalPreview
				imgRef={imgRef}
				imgSrc={filePreview}
				alt="Image Preview"
			/>
			<div className={styles.EditorToolbar_panels}>
				{activeTool === "FILTERS" && (
					<ThumbnailsBar
						imgRef={imgRef}
						src={src}
						windowSize={winSize}
						handleFilters={handleFilters}
						activeFilters={activeFilters}
						imgSettings={imgSettings}
					/>
				)}
				{activeTool === "CROP" && (
					<CropPanel
						winSize={winSize}
						activeTool={activeTool}
						imgRef={imgRef}
						handleCrop={handleCrop}
						handleSaveCrop={handleSaveCrop}
						handleFlip={handleFlip}
						handleZoomIn={handleZoomIn}
						handleZoomOut={handleZoomOut}
					/>
				)}
				{activeTool === "FINETUNE" && (
					<FineTunePanel
						winSize={winSize}
						activeTool={activeTool}
						imgRef={imgRef}
						handleFineTune={handleFineTune}
					/>
				)}
				{activeTool === "ANNOTATE" && (
					<AnnotatePanel
						winSize={winSize}
						activeTool={activeTool}
						imgRef={imgRef}
						handleAnnotate={handleAnnotate}
					/>
				)}
			</div>
		</div>
	);
};

export default EditorToolbar;

EditorToolbar.defaultProps = {};

EditorToolbar.propTypes = {
	winSize: PropTypes.shape({
		width: PropTypes.number,
		height: PropTypes.number,
	}),
	activeTool: PropTypes.string,
	imgRef: PropTypes.oneOfType([
		PropTypes.instanceOf(Element),
		PropTypes.object,
	]),
	src: PropTypes.oneOfType([
		PropTypes.instanceOf(Element),
		PropTypes.instanceOf(null),
	]),
	filePreview: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.instanceOf(URL),
	]),
	activeFilters: PropTypes.array,
	handleFilters: PropTypes.func,
	handleCrop: PropTypes.func,
	handleFineTune: PropTypes.func,
	handleAnnotate: PropTypes.func,
};
