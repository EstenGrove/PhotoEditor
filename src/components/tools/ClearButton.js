import React from "react";
import styles from "../../css/tools/ClearButton.module.scss";
import sprite from "../../assets/icons/editor.svg";
import { PropTypes } from "prop-types";

const ClearButton = ({ handleClear }) => {
	return (
		<button type="button" onClick={handleClear} className={styles.ClearButton}>
			<svg className={styles.ClearButton_icon}>
				<use xlinkHref={`${sprite}#icon-clear`}></use>
			</svg>
		</button>
	);
};

export default ClearButton;

ClearButton.defaultProps = {};

ClearButton.propTypes = {
	handleClear: PropTypes.func,
};
