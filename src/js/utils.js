/**
 * Changed image position via pointer events.
 *
 * @param event
 * @param isInversion
 */
export const moveX = (event, isInversion = false) => {
	const element = event.target;
	element.style.transition = 'none';
	
	let x = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
	let bgPos = getBcgPos(element);
	
	element.style.backgroundPosition = (isInversion) ? bgPos.x - x * (-1) + 'px' : bgPos.x - x + 'px';
};

/**
 * Get background image position.
 *
 * @param element: HTML Element
 * @returns {{x: number, u: number}}
 */
export const getBcgPos = (element) => {
	const pos = window.getComputedStyle(element)
		.getPropertyValue('background-position').split(' ').map((v) => parseInt(v, 10));
	
	return {
		x: pos[0],
		u: pos[1]
	};
};

/**
 * Get background image properties.
 *
 * @param element
 * @returns {HTMLImageElement}
 */
export const getBcgImage = (element) => {
	let backgroundImage = window.getComputedStyle(element)
		.getPropertyValue('background-image').replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
	
	const image = new Image();
	image.src = backgroundImage;
	
	return image;
};