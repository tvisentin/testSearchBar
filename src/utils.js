export const splitRegexChars = /[ '-]+/;

export const normalizeWord = (str) => {
	return str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.toLowerCase();
};
