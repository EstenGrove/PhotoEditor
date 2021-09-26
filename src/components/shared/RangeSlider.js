import React from "react";
import styles from "../../css/shared/RangeSlider.module.scss";
import { PropTypes } from "prop-types";
import { isEmptyArray } from "../../helpers/utils_types";

const RangeSlider = ({
	name,
	id,
	val,
	handleRange,
	min = 0,
	max = 100,
	step = 10,
}) => {
	return (
		<div className={styles.RangeSlider}>
			<div className={styles.RangeSlider_value}>{val}%</div>
			<div className={styles.RangeSlider_range}>
				<input
					type="range"
					name={name}
					id={id}
					value={val}
					onChange={handleRange}
					className={styles.RangeSlider_range_input}
					min={min}
					max={max}
					step={step}
				/>
				<ul className={styles.RangeSlider_range_markers}>
					<li className={styles.RangeSlider_range_markers_label}>•</li>
					<li className={styles.RangeSlider_range_markers_label}>•</li>
					<li className={styles.RangeSlider_range_markers_label}>•</li>
					<li className={styles.RangeSlider_range_markers_label}>•</li>
					<li className={styles.RangeSlider_range_markers_label}>•</li>
					<li className={styles.RangeSlider_range_markers_label}>•</li>
					<li className={styles.RangeSlider_range_markers_label}>•</li>
					<li className={styles.RangeSlider_range_markers_label}>•</li>
					<li className={styles.RangeSlider_range_markers_label}>•</li>
					<li className={styles.RangeSlider_range_markers_label}>•</li>
					<li className={styles.RangeSlider_range_markers_label}>•</li>
				</ul>
			</div>
		</div>
	);
};

export default RangeSlider;

RangeSlider.defaultProps = {};

RangeSlider.propTypes = {};
