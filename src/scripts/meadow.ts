type Vec2 = { x: number; y: number };

interface SpringState {
	value: number;
	velocity: number;
}

function createSpring(): SpringState {
	return { value: 0, velocity: 0 };
}

function springStep(state: SpringState, target: number, stiffness = 0.08, damping = 0.75): number {
	const force = (target - state.value) * stiffness;
	state.velocity += force;
	state.velocity *= damping;
	state.value += state.velocity;
	return state.value;
}

function distance(a: Vec2, b: Vec2): number {
	const dx = a.x - b.x;
	const dy = a.y - b.y;
	return Math.sqrt(dx * dx + dy * dy);
}

function getElementCenter(el: Element): Vec2 {
	const rect = el.getBoundingClientRect();
	return {
		x: rect.left + rect.width / 2,
		y: rect.top + rect.height / 2,
	};
}

let cursor: Vec2 = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let cursorActive = false;
let lastCursorUpdate = 0;
let lastTrailTime = 0;
const trailInterval = 60;

const flowerSpringX = createSpring();
const flowerSpringY = createSpring();
const cardSprings: Map<Element, { x: SpringState; y: SpringState }> = new Map();

function initMeadow() {
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	if (reducedMotion.matches) return;

	const flower = document.querySelector('.flower') as HTMLElement | null;
	const cards = document.querySelectorAll('.explore-card');

	const trailContainer = document.createElement('div');
	trailContainer.className = 'seed-trail';
	trailContainer.setAttribute('aria-hidden', 'true');
	document.body.appendChild(trailContainer);

	cards.forEach((card) => {
		cardSprings.set(card, { x: createSpring(), y: createSpring() });
	});

	document.addEventListener('mousemove', (e) => {
		cursor.x = e.clientX;
		cursor.y = e.clientY;
		cursorActive = true;
		lastCursorUpdate = performance.now();
	}, { passive: true });

	document.addEventListener('mouseleave', () => {
		cursorActive = false;
	});

	function createSeed() {
		const seed = document.createElement('div');
		seed.className = 'seed-trail__seed';
		seed.style.left = `${cursor.x + (Math.random() - 0.5) * 8}px`;
		seed.style.top = `${cursor.y + (Math.random() - 0.5) * 8}px`;
		trailContainer.appendChild(seed);

		setTimeout(() => {
			seed.remove();
		}, 1200);
	}

	function animate() {
		if (flower) {
			const flowerCenter = getElementCenter(flower);
			const offsetX = (cursor.x - flowerCenter.x) / window.innerWidth;
			const offsetY = (cursor.y - flowerCenter.y) / window.innerHeight;

			const targetRotate = offsetX * 12;
			const targetTranslateY = offsetY * 8;

			const rotate = springStep(flowerSpringX, targetRotate);
			const translateY = springStep(flowerSpringY, targetTranslateY);

			flower.style.transform = `rotate(${rotate}deg) translateY(${translateY}px)`;
		}

		cardSprings.forEach((springs, card) => {
			const el = card as HTMLElement;
			const cardCenter = getElementCenter(card);
			const dist = distance(cursor, cardCenter);
			const maxDist = 400;

			if (dist < maxDist) {
				const strength = 1 - dist / maxDist;
				const offsetX = (cursor.x - cardCenter.x) / window.innerWidth;
				const offsetY = (cursor.y - cardCenter.y) / window.innerHeight;

				const targetX = -offsetX * 12 * strength;
				const targetY = -offsetY * 8 * strength;

				const x = springStep(springs.x, targetX, 0.06, 0.8);
				const y = springStep(springs.y, targetY, 0.06, 0.8);

				const existingTilt = el.classList.contains('tilt-left') ? -1.5 : el.classList.contains('tilt-right') ? 1.5 : 0;

				el.style.transform = `translate(${x}px, ${y}px) rotate(${existingTilt}deg)`;
			} else {
				const x = springStep(springs.x, 0, 0.04, 0.85);
				const y = springStep(springs.y, 0, 0.04, 0.85);

				const existingTilt = el.classList.contains('tilt-left') ? -1.5 : el.classList.contains('tilt-right') ? 1.5 : 0;

				el.style.transform = `translate(${x}px, ${y}px) rotate(${existingTilt}deg)`;
			}
		});

		const now = performance.now();
		if (cursorActive && now - lastTrailTime > trailInterval) {
			createSeed();
			lastTrailTime = now;
		}

		requestAnimationFrame(animate);
	}

	animate();

	reducedMotion.addEventListener('change', (e) => {
		if (e.matches) {
			if (flower) flower.style.transform = '';
			cardSprings.forEach((_, card) => {
				(card as HTMLElement).style.transform = '';
			});
			trailContainer.remove();
		}
	});
}

function getCursor(): Vec2 {
	return cursor;
}

function isCursorActive(): boolean {
	return cursorActive && performance.now() - lastCursorUpdate < 100;
}

export { getCursor, isCursorActive };

document.addEventListener('DOMContentLoaded', initMeadow);
