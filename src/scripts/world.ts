function getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
	const hour = new Date().getHours();
	if (hour >= 5 && hour < 12) return 'morning';
	if (hour >= 12 && hour < 17) return 'afternoon';
	if (hour >= 17 && hour < 21) return 'evening';
	return 'night';
}

function getSeason(): 'spring' | 'summer' | 'autumn' | 'winter' {
	const month = new Date().getMonth();
	if (month >= 2 && month <= 4) return 'spring';
	if (month >= 5 && month <= 7) return 'summer';
	if (month >= 8 && month <= 10) return 'autumn';
	return 'winter';
}

function applyWorld() {
	document.documentElement.setAttribute('data-time', getTimeOfDay());
	document.documentElement.setAttribute('data-season', getSeason());
}

setInterval(applyWorld, 60000);
