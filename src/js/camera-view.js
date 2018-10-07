import {pinchEvent} from "./pinch";
import {moveEvent} from "./move";
import {rotationMode} from "./rotation";

export const pointerEvent = () => {
	const requestedElement = document.querySelector('.camera-view__current-view');
	const brightnessControl = document.querySelector('.camera-view__brightness-control');
	
	moveEvent(requestedElement);
	rotationMode(requestedElement);
	pinchEvent(requestedElement);
	
	brightnessControl.addEventListener('input', () => {
		const brightnessTextElement = document.querySelector('.camera-view__brightness-value');
		requestedElement.style.filter = `grayscale(${100 - brightnessControl.value}%)`;
		brightnessTextElement.textContent = `${brightnessControl.value}%`;
	}, false);
};

pointerEvent();