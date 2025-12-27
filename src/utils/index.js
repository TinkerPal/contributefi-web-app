export function capitalizeFirst(word) {
	if (!word) return "";
	return word.charAt(0).toUpperCase() + word.slice(1);
}

export function timeAgo(date) {
	const now = new Date();
	const diff = (now - new Date(date)) / 1000;

	if (diff < 10) return "just now";
	if (diff < 60) return `${Math.floor(diff)} seconds ago`;

	const minutes = diff / 60;
	if (minutes < 60) return `${Math.floor(minutes)} minutes ago`;

	const hours = minutes / 60;
	if (hours < 24) return `${Math.floor(hours)} hours ago`;

	const days = hours / 24;
	if (days < 7) return `${Math.floor(days)} days ago`;

	const weeks = days / 7;
	if (weeks < 4) return `${Math.floor(weeks)} weeks ago`;

	return new Date(date).toLocaleDateString();
}

export function shortenString(str, maxLength = 20) {
	if (!str || str.length <= maxLength) return str;

	const half = Math.floor((maxLength - 3) / 2);
	const start = str.slice(0, half);
	const end = str.slice(-half);
	return `${start}...${end}`;
}

export function wrapString(str, lineLength = 60) {
	if (!str) return "";
	return str.match(new RegExp(`.{1,${lineLength}}`, "g")).join("\n");
}
