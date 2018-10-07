import {pinchEvent} from "./pinch";
import {moveEvent} from "./move";
import {twistEvent} from "./twist";
import {rotationMode} from "./rotation";

export const pointerEvent = () => {
	const requestedElement = document.querySelector('.camera-view__current-view');
	const brightnessControl = document.querySelector('.camera-view__brightness-control');
	
	moveEvent(requestedElement);
	rotationMode(requestedElement);
	pinchEvent(requestedElement);
	twistEvent(requestedElement);
	
	
	brightnessControl.addEventListener('onchange', (event) => {
		console.log(event);
	});
};

pointerEvent();