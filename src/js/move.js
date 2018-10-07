import {moveX} from "./utils";

export const moveEvent = (element) => {
	if (element.classList.contains('pinchActive')) {
		return;
	}
	
	element.classList.add('inactive');
	
	element.addEventListener('pointerdown', (event) => {
		element.classList.remove('inactive');
		element.classList.add('active');
	});
	
	element.addEventListener('pointerup', () => {
		element.classList.remove('active');
		element.classList.add('inactive');
	});
	
	element.addEventListener('pointermove', (event) => {
		if (element.classList.contains('active')) {
			moveX(event);
		}
	});
};