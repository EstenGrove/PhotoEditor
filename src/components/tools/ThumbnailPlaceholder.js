import React from "react";
import styles from "../../css/tools/ThumbnailPlaceholder.module.scss";
import sprite from "../../assets/icons/editor.svg";
import { PropTypes } from "prop-types";
import { purple } from "../../helpers/utils_styles";

const active = purple[600];

const activeCSS = {
	border: `1px solid ${active}`,
	fill: active,
	color: active,
};

const getBorder = (isActive) => {
	if (!isActive) return null;

	return { border: activeCSS.border };
};
const getFill = (isActive) => {
	if (!isActive) return null;
	return { fill: activeCSS.fill };
};
const getColor = (isActive) => {
	if (!isActive) return null;
	return { color: activeCSS.color };
};

const ThumbnailPlaceholder = ({
	text,
	enableFilter,
	isActive = false,
	isDisabled = false,
}) => {
	return (
		<button
			type="button"
			className={styles.ThumbnailPlaceholder}
			onClick={enableFilter}
			style={getBorder(isActive)}
			disabled={isDisabled}
		>
			<svg
				className={styles.ThumbnailPlaceholder_icon}
				style={getFill(isActive)}
			>
				<use xlinkHref={`${sprite}#icon-add_photo_alternate`}></use>
			</svg>
			<span
				className={styles.ThumbnailPlaceholder_text}
				style={getColor(isActive)}
			>
				{text}
			</span>
		</button>
	);
};

export default ThumbnailPlaceholder;

ThumbnailPlaceholder.defaultProps = {};

ThumbnailPlaceholder.propTypes = {};
