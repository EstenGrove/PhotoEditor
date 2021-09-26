import React from "react";
import styles from "../../css/tools/FiltersPanel.module.scss";
import { PropTypes } from "prop-types";
import ThumbnailsBar from "./ThumbnailsBar";

// REQUIREMENTS:
// - Ability to add 1 or more filter presets at a time.
// - Contains various filter presets:
//    - Blur (0-10px)
//    - Contrast (0-300%)
//    - Brightness (0-300%)
//    - Grayscale (0-100%)
//    - Hue-Rotate (0-360deg)
//    - Invert (0-100%)
//    - Saturate (0-100%)
//    - Sepia (0-100%)
//    - Drop-Shadow (drop-shadow(16px 16px 20px <color>))
// - Uses the <ThumbnailBar/> for previews

const FiltersPanel = ({
	winSize = {},
	imgRef,
	originalSrc,
	handleFilters,
	imgSettings = {},
}) => {
	return (
		<div className={styles.FiltersPanel}>
			<div className={styles.FiltersPanel_inner}>
				<ThumbnailsBar
					imgRef={imgRef}
					src={originalSrc}
					windowSize={winSize}
					handleFilters={handleFilters}
					activeFilters={imgSettings.filters}
				/>
			</div>
		</div>
	);
};

export default FiltersPanel;

FiltersPanel.defaultProps = {};

FiltersPanel.propTypes = {};
