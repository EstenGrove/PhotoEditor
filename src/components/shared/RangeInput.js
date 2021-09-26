import React from "react";
import styles from "../../css/shared/RangeInput.module.scss";
import { PropTypes } from "prop-types";

const RangeInput = ({ val = "0", color = "#ffffff" }) => {
	return (
		<div className={styles.RangeInput}>
			<div className={styles.RangeInput_value}>{val}%</div>
			<div className={styles.RangeInput_range}>
				<svg
					width="404"
					height="56"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 404 56"
					aria-hidden="true"
					focusable="false"
					className={styles.RangeInput_range_dots}
				>
					<g fill={color}>
						<circle cx="2" cy="28" r="2"></circle>
						<circle cx="12" cy="28" r="0.75"></circle>
						<circle cx="22" cy="28" r="0.75"></circle>
						<circle cx="32" cy="28" r="0.75"></circle>
						<circle cx="42" cy="28" r="0.75"></circle>
						<circle cx="52" cy="28" r="2"></circle>
						<circle cx="62" cy="28" r="0.75"></circle>
						<circle cx="72" cy="28" r="0.75"></circle>
						<circle cx="82" cy="28" r="0.75"></circle>
						<circle cx="92" cy="28" r="0.75"></circle>
						<circle cx="102" cy="28" r="2"></circle>
						<circle cx="112" cy="28" r="0.75"></circle>
						<circle cx="122" cy="28" r="0.75"></circle>
						<circle cx="132" cy="28" r="0.75"></circle>
						<circle cx="142" cy="28" r="0.75"></circle>
						<circle cx="152" cy="28" r="2"></circle>
						<circle cx="162" cy="28" r="0.75"></circle>
						<circle cx="172" cy="28" r="0.75"></circle>
						<circle cx="182" cy="28" r="0.75"></circle>
						<circle cx="192" cy="28" r="0.75"></circle>
						<circle cx="202" cy="28" r="2"></circle>
						<circle cx="212" cy="28" r="0.75"></circle>
						<circle cx="222" cy="28" r="0.75"></circle>
						<circle cx="232" cy="28" r="0.75"></circle>
						<circle cx="242" cy="28" r="0.75"></circle>
						<circle cx="252" cy="28" r="2"></circle>
						<circle cx="262" cy="28" r="0.75"></circle>
						<circle cx="272" cy="28" r="0.75"></circle>
						<circle cx="282" cy="28" r="0.75"></circle>
						<circle cx="292" cy="28" r="0.75"></circle>
						<circle cx="302" cy="28" r="2"></circle>
						<circle cx="312" cy="28" r="0.75"></circle>
						<circle cx="322" cy="28" r="0.75"></circle>
						<circle cx="332" cy="28" r="0.75"></circle>
						<circle cx="342" cy="28" r="0.75"></circle>
						<circle cx="352" cy="28" r="2"></circle>
						<circle cx="362" cy="28" r="0.75"></circle>
						<circle cx="372" cy="28" r="0.75"></circle>
						<circle cx="382" cy="28" r="0.75"></circle>
						<circle cx="392" cy="28" r="0.75"></circle>
						<circle cx="402" cy="28" r="2"></circle>
						<rect rx="4" ry="4" y="24" height="8"></rect>
					</g>
				</svg>
			</div>
		</div>
	);
};

export default RangeInput;

RangeInput.defaultProps = {};

RangeInput.propTypes = {};
