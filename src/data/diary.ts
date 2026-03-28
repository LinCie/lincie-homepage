export interface DiaryEntry {
	date: string;
	title: string;
	body: string;
}

export const diaryEntries: DiaryEntry[] = [
	{
		date: "2026-03-20",
		title: "Why I started building this garden",
		body: "I wanted a space on the internet that felt like me — not a resume, not a portfolio template, but somewhere warm. Somewhere that feels like visiting a friend's garden on a quiet afternoon. I think the web has too many sterile pages and not enough places that make you feel something.",
	},
	{
		date: "2026-02-14",
		title: "On making things by hand",
		body: "There's something special about building something from scratch — no frameworks, no templates, no shortcuts. It takes longer, and it's imperfect, but every pixel is a choice I made. I think that's what makes it feel alive. Like a handwritten letter versus a printed one. Both say the same words, but only one has a heartbeat.",
	},
	{
		date: "2026-01-05",
		title: "Things I want to remember this year",
		body: "That slow is okay. That not everything needs to be optimized. That a gentle sway matters more than a flashy animation. That the best interfaces feel like they were made by someone who cares, not someone who follows a style guide. This is the year I stop apologizing for making things that are soft.",
	},
	{
		date: "2025-12-01",
		title: "Winter thoughts",
		body: "The garden is resting now. Everything outside is quiet and still. I used to feel guilty about rest — like I should always be growing, always producing. But the flower rests in winter so it can bloom in spring. Maybe I needed to learn that lesson too.",
	},
];
