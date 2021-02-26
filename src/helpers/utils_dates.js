// converts utc date to local date
const utcToLocal = (utcDate) => {
	const localDate = new Date(utcDate).toString();
	return localDate;
};

const localToUTC = (localDate) => {
	const utc = new Date(localDate).toISOString();
	return utc;
};

export { utcToLocal, localToUTC };
