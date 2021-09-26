import React, { useState, useEffect } from "react";
import styles from "../../css/tools/ImagePreview.module.scss";
import { PropTypes } from "prop-types";
import { createURL } from "../../helpers/utils_files";
import { isEmptyVal } from "../../helpers/utils_types";

/**
 * 'src' MUST be a file blob or Image() instance
 * - 'src' CANNOT be a local file source unless converted to a blob
 */

const ImagePreview = ({ imgRef, imgSrc = null, alt = "Original" }) => {
	const [src, setSrc] = useState(() => {
		if (!imgSrc || isEmptyVal(imgSrc)) return "";
		return createURL(imgSrc);
	});

	// update 'src' from 'imgSrc' when it changes
	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		if (!isEmptyVal(src) || !isEmptyVal(imgSrc)) {
			setSrc(imgSrc);
		}

		return () => {
			isMounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imgSrc]);

	return (
		<div className={styles.ImagePreview}>
			{src && (
				<img
					src={src}
					alt={alt}
					ref={imgRef}
					className={styles.ImagePreview_img}
				/>
			)}
		</div>
	);
};

export default ImagePreview;

ImagePreview.defaultProps = {
	alt: "Original",
};

ImagePreview.propTypes = {
	imgRef: PropTypes.object,
	imgSrc: PropTypes.string,
	alt: PropTypes.string,
};
