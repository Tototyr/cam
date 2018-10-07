import {moveX} from "./utils";
import {getBcgImage} from './utils';
import {getBcgPos} from './utils';

export const rotationMode  = (requestedElement) => {
	const havePointerLock =
		'pointerLockElement' in document ||
		'mozPointerLockElement' in document ||
		'webkitPointerLockElement' in document;
	
	requestedElement.requestPointerLock =
		requestedElement.requestPointerLock || requestedElement.mozRequestPointerLock || requestedElement.webkitRequestPointerLock;
	
	document.exitPointerLock =
		document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock;
	
	const isLocked = () => {
		return requestedElement === document.pointerLockElement ||
			requestedElement === document.mozPointerLockElement ||
			requestedElement === document.webkitPointerLockElement;
	};
	
	requestedElement.addEventListener('dblclick', () => {
		(!isLocked()) ? requestedElement.requestPointerLock() : document.exitPointerLock();
	}, false);
	
	const changeCallback = () => {
		if (!havePointerLock) {
			throw new Error('Your browser does not support pointer-lock.');
		}
		
		if (isLocked()) {
			document.addEventListener("pointermove", moveX, false);
			document.body.classList.add('locked');
			requestedElement.style.backgroundRepeat = 'repeat-x';
		} else {
			document.removeEventListener("pointermove", moveX, false);
			document.body.classList.remove('locked');
			requestedElement.style.backgroundRepeat = 'no-repeat';
		}
		
		checkBcgImage();
	};
	
	const checkBcgImage = () => {
		const image = getBcgImage(requestedElement);
		const imageBcgPos = getBcgPos(requestedElement);
		
		if (Math.abs(imageBcgPos.x) - image.width > image.width) {
			requestedElement.style.backgroundPosition = 0;
		}
	};
	
	document.addEventListener('pointerlockchange', changeCallback, false);
	document.addEventListener('mozpointerlockchange', changeCallback, false);
	document.addEventListener('webkitpointerlockchange', changeCallback, false);
};