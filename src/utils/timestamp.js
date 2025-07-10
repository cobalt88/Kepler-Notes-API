// General utility functions for providing timestamps in various formats to improve consistency and readability in the codebase.

export const isoTimestamp = () => {
    return new Date().toISOString();
};

export const systemTimestamp = () => {
	return new Date().toLocaleString();
};

export const utcTimestamp = () => {
	return new Date().toUTCString();
};

export const unixTimestamp = () => {
	return new Date().getTime();
};
