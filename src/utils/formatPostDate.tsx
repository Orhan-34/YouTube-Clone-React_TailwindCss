export const formatPostDate = (date: Date): string => {

	const today = new Date();
	const diffTime = Math.abs(today.getTime() - date.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays < 7) {
		return `${diffDays} days ago`;
	}
	// biome-ignore lint/style/noUselessElse: <explanation>
	else if (diffDays < 30) {
		const weeks = Math.floor(diffDays / 7);
		return `${weeks} weeks ago`;
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else if (diffDays < 365) {
		const months = Math.floor(diffDays / 30);
		return `${months} months ago`;
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else {
		const years = Math.floor(diffDays / 365);
		return `${years} years ago`;
	}
};