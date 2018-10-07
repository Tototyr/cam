import {moveX} from "./utils";
import {getBcgImage} from "./utils";
import {getBcgPos} from "./utils";

export const moveEvent = (element) => {
	element.style.transition = 'none';
	
	element.addEventListener('pointerdown', (event) => {
		element.setPointerCapture(event.pointerId);
		element.classList.add('active');
	});
	
	element.addEventListener('pointerup', () => {
		element.classList.remove('active');
		
		alignImage();
	});
	
	element.addEventListener('pointermove', (event) => {
		if (element.classList.contains('active')) {
			moveX(event, true);
		}
	});
	
	const alignImage = () => {
		const bgPos = getBcgPos(element);
		const bgImage = getBcgImage(element);
		const maxWidth = bgImage.width - element.offsetWidth;
		
		if (bgPos.x > 0) {
			element.style.transition = 'background-position .7s';
			element.style.backgroundPosition = 0;
		}
		
		if (Math.abs(bgPos.x) > maxWidth) {
			element.style.transition = 'background-position .7s';
			element.style.backgroundPosition = -maxWidth;
		}
	};
};