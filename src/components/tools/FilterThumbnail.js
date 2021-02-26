import React from "react";
import styles from "../../css/tools/FilterThumbnail.module.scss";
import { PropTypes } from "prop-types";
import { capitalizeFirst } from "../../helpers/utils_processing";
import ThumbnailPlaceholder from "./ThumbnailPlaceholder";

const settingsMap = {
	blur: {
		filter: `blur(5)`, // 0-10
	},
	brightness: {
		filter: `brightness(5)`, // 0-10
	},
	contrast: {
		filter: `contrast(5)`, // 0-10
	},
	grayscale: {
		filter: `grayscale(.5)`, // 0.00-1.00
	},
	"hue-rotate": {
		filter: `hue-rotate(180deg)`, // 0deg-360deg
	},
	invert: {
		filter: `invert(1)`, // 0.00-1.00
	},
	saturate: {
		filter: `saturate(5)`, // 0-10
	},
	sepia: {
		filter: `sepia(1)`, // 0.00-1.00
	},
	"black-and-white": {
		filter: `saturate(0)`, // 0-10
	},
};

const getAltText = (filter) => {
	// capitalize 1st letter
	// Result: 'Filtered Image', 'Contrasted Image', 'Sepia Image'
	const capped = capitalizeFirst(filter);
	return `Applied Effect: ${capped}`;
};

const FilterThumbnail = ({ src, alt = "", filter = "blur" }) => {
	if (!src) {
		return <ThumbnailPlaceholder text="Placeholder" />;
	}
	return (
		<div className={styles.FilterThumbnail} title={getAltText(filter)}>
			<img src={src} alt={alt} className={styles.FilterThumbnail_img} />
		</div>
	);
};

export default FilterThumbnail;

FilterThumbnail.defaultProps = {};

FilterThumbnail.propTypes = {};
