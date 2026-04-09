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
		slug: "lincie-website",
		title: "LinCie's Garden",
		description: "A personal website built as a living garden that mirrors the real world across time of day and seasons. Hand-crafted with Astro and Tailwind CSS.",
		tags: ["Astro", "Tailwind CSS", "TypeScript"],
		role: "Designer & Developer",
		link: "/",
	},
	{
		slug: "mika",
		title: "Mika",
		description: "A Discord bot named after Misono Mika from Blue Archive. She plays your songs and queues your playlists with Lavalink — and doubles as a chatbot that mimics several Blue Archive students, because why not have company while you listen?",
		tags: ["Discord.js", "Lavalink", "SQLite"],
		role: "Solo Developer",
		link: "https://mika.lincie.me",
		github: "https://github.com/LinCie/mika",
	},
	{
		slug: "bearuang",
		title: "BearUang",
		description: "A personal POS system I'm pouring my heart into. Built with ElysiaJS on the backend and React on the frontend, because managing life's logistics deserves a cozy home too.",
		tags: ["ElysiaJS", "React", "PostgreSQL", "MinIO", "OpenAI"],
		role: "Solo Developer",
		link: "https://bearuang.lincie.me"
	},
	{
		slug: "haebot-commerce",
		title: "Haebot Commerce",
		description: "An ecommerce website for PT HaeBot Teknologi Indonesia, bringing local business online with a clean storefront. Because every good idea deserves a nice shop window.",
		tags: ["Astro"],
		role: "Developer",
		link: "https://store.haebot.com",
	},
];
