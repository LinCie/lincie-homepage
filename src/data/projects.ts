export interface Project {
	slug: string;
	title: string;
	description: string;
	tags: string[];
	role?: string;
	link?: string;
	github?: string;
}

export const projects: Project[] = [
	{
		slug: "lin-cie-website",
		title: "LinCie's Garden",
		description: "A personal website built as a living garden that mirrors the real world across time of day and seasons. Hand-crafted with Astro and Tailwind CSS.",
		tags: ["Astro", "Tailwind CSS", "TypeScript"],
		role: "Designer & Developer",
		link: "/",
	},
	{
		slug: "pixel-buddy",
		title: "Pixel Buddy",
		description: "A tiny companion app that sits on your desktop and reminds you to take breaks, stretch, and drink water. Because self-care should be cute.",
		tags: ["TypeScript", "Electron", "CSS"],
		role: "Solo Developer",
		github: "https://github.com/example/pixel-buddy",
	},
	{
		slug: "garden-planner",
		title: "Garden Planner",
		description: "A simple tool for planning vegetable gardens — choose your plants, set your layout, and track watering schedules. Grown from a weekend project into something people actually use.",
		tags: ["React", "Node.js", "PostgreSQL"],
		role: "Full Stack Developer",
		link: "https://example.com/garden-planner",
	},
	{
		slug: "cozy-notes",
		title: "Cozy Notes",
		description: "A minimal note-taking app with a warm, paper-like interface. No accounts, no cloud sync — just you and your thoughts, stored safely on your device.",
		tags: ["Svelte", "IndexedDB", "PWA"],
		role: "Designer & Developer",
		github: "https://github.com/example/cozy-notes",
	},
];
