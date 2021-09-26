import React, { useRef } from "react";
import styles from "../../css/tools/ThumbnailsBar.module.scss";
import { PropTypes } from "prop-types";
// utils
import { isEmptyVal } from "../../helpers/utils_types";
// components
import ImagePreview from "./ImagePreview";
import ThumbnailPlaceholder from "./ThumbnailPlaceholder";
import FiltersPanel from "./FiltersPanel";

// THUMBNAILS:
// - Filters:
// 		- Blur
// 		- Brightness
// 		- Contrast
// 		- Grayscale
// 		- Hue-Rotate
// 		- Invert
// 		- Saturate
// 		- Sepia
// 		- Drop-Shadow

const setWidth = (ref) => {
	if (isEmptyVal(ref.current)) return "100%";
	const barRect = ref?.current?.getBoundingClientRect();
	const barWidth = barRect?.width;
	const thumbsWidth = barWidth - 100;

	return thumbsWidth;
};

const ThumbnailsBar = ({
	src = null,
	handleFilters,
	imgSettings = {},
	activeFilters = [],
}) => {
	const barRef = useRef();

	const customStyles = {
		width: setWidth(barRef) + "px",
	};

	return (
		<aside className={styles.ThumbnailsBar} ref={barRef}>
			<div className={styles.ThumbnailsBar_thumbnails} style={customStyles}>
				<ThumbnailPlaceholder
					key="BLUR"
					text="Blur"
					enableFilter={() => handleFilters("blur")}
					isActive={activeFilters.includes("blur")}
					isDisabled={!src || isEmptyVal(src)}
				/>
				<ThumbnailPlaceholder
					key="BRIGHTNESS"
					text="Brightness"
					enableFilter={() => handleFilters("brightness")}
					isActive={activeFilters.includes("brightness")}
					isDisabled={!src || isEmptyVal(src)}
				/>
				<ThumbnailPlaceholder
					key="SEPIA"
					text="Sepia"
					enableFilter={() => handleFilters("sepia")}
					isActive={activeFilters.includes("sepia")}
					isDisabled={!src || isEmptyVal(src)}
				/>
				<ThumbnailPlaceholder
					key="GRAYSCALE"
					text="Grayscale"
					enableFilter={() => handleFilters("grayscale")}
					isActive={activeFilters.includes("grayscale")}
					isDisabled={!src || isEmptyVal(src)}
				/>
				<ThumbnailPlaceholder
					key="CONTRAST"
					text="Contrast"
					enableFilter={() => handleFilters("contrast")}
					isActive={activeFilters.includes("contrast")}
					isDisabled={!src || isEmptyVal(src)}
				/>
				<ThumbnailPlaceholder
					key="HUE-ROTATE"
					text="Hue-Rotate"
					enableFilter={() => handleFilters("hue-rotate")}
					isActive={activeFilters.includes("hue-rotate")}
					isDisabled={!src || isEmptyVal(src)}
				/>
				<ThumbnailPlaceholder
					key="INVERT"
					text="Invert"
					enableFilter={() => handleFilters("invert")}
					isActive={activeFilters.includes("invert")}
					isDisabled={!src || isEmptyVal(src)}
				/>
				<ThumbnailPlaceholder
					key="SATURATE"
					text="Saturate"
					enableFilter={() => handleFilters("saturate")}
					isActive={activeFilters.includes("saturate")}
					isDisabled={!src || isEmptyVal(src)}
				/>
				<ThumbnailPlaceholder
					key="DROP-SHADOW"
					text="Drop-Shadow"
					enableFilter={() => handleFilters("drop-shadow")}
					isActive={activeFilters.includes("drop-shadow")}
					isDisabled={!src || isEmptyVal(src)}
				/>
			</div>
		</aside>
	);
};

export default ThumbnailsBar;

ThumbnailsBar.defaultProps = {};

ThumbnailsBar.propTypes = {};
