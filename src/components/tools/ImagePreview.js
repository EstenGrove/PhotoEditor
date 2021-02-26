import React, { useState, useEffect } from "react";
import styles from "../../css/tools/ImagePreview.module.scss";
import { PropTypes } from "prop-types";
import { createURL } from "../../helpers/utils_files";

const ImagePreview = ({ imgRef, imgSrc = null, alt = "Original" }) => {
	const [src, setSrc] = useState(() => {
		if (!imgSrc) return null;
		return createURL(imgSrc);
	});

	useEffect(() => {
		let isMounted = true;
		if (!isMounted) {
			return;
		}
		setSrc(imgSrc);

		return () => {
			isMounted = false;
		};
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
