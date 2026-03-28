function getSeason(): "spring" | "summer" | "autumn" | "winter" {
	const month = new Date().getMonth();
	if (month >= 2 && month <= 4) return "spring";
	if (month >= 5 && month <= 7) return "summer";
	if (month >= 8 && month <= 10) return "autumn";
	return "winter";
}

document.documentElement.setAttribute("data-season", getSeason());
