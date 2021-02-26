import React, { useRef } from "react";
import styles from "../../css/tools/ThumbnailsBar.module.scss";
import { PropTypes } from "prop-types";
// utils
import { isEmptyVal } from "../../helpers/utils_types";
// components
import ImagePreview from "./ImagePreview";
import ThumbnailPlaceholder from "./ThumbnailPlaceholder";

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
	imgRef,
	src = null,
	handleFilters,
	activeFilters = [],
}) => {
	const barRef = useRef();

	const customStyles = {
		width: setWidth(barRef) + "px",
	};

	return (
		<aside className={styles.ThumbnailsBar} ref={barRef}>
			<div className={styles.ThumbnailsBar_original}>
				<ImagePreview imgSrc={src} imgRef={imgRef} />
				<span className={styles.ThumbnailsBar_original_label}>Original</span>
			</div>
			<div className={styles.ThumbnailsBar_thumbnails} style={customStyles}>
				<ThumbnailPlaceholder
					enableFilter={() => handleFilters("blur")}
					isActive={activeFilters.includes("blur")}
					text="Blur"
					isDisabled={!src}
				/>
				<ThumbnailPlaceholder
					enableFilter={() => handleFilters("brightness")}
					isActive={activeFilters.includes("brightness")}
					text="Brightness"
					isDisabled={!src}
				/>
				<ThumbnailPlaceholder
					enableFilter={() => handleFilters("sepia")}
					isActive={activeFilters.includes("sepia")}
					text="Sepia"
					isDisabled={!src}
				/>
				<ThumbnailPlaceholder
					enableFilter={() => handleFilters("grayscale")}
					isActive={activeFilters.includes("grayscale")}
					text="Grayscale"
					isDisabled={!src}
				/>
				<ThumbnailPlaceholder
					enableFilter={() => handleFilters("contrast")}
					isActive={activeFilters.includes("contrast")}
					text="Contrast"
					isDisabled={!src}
				/>
				<ThumbnailPlaceholder
					enableFilter={() => handleFilters("hue-rotate")}
					isActive={activeFilters.includes("hue-rotate")}
					text="Hue-Rotate"
					isDisabled={!src}
				/>
				<ThumbnailPlaceholder
					enableFilter={() => handleFilters("invert")}
					isActive={activeFilters.includes("invert")}
					text="Invert"
					isDisabled={!src}
				/>
				<ThumbnailPlaceholder
					enableFilter={() => handleFilters("saturate")}
					isActive={activeFilters.includes("saturate")}
					text="Saturate"
					isDisabled={!src}
				/>
				<ThumbnailPlaceholder
					enableFilter={() => handleFilters("drop-shadow")}
					isActive={activeFilters.includes("drop-shadow")}
					text="Drop-Shadow"
					isDisabled={!src}
				/>
			</div>
		</aside>
	);
};

export default ThumbnailsBar;

ThumbnailsBar.defaultProps = {};

ThumbnailsBar.propTypes = {};
