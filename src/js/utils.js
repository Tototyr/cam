export const moveX = (event) => {
	const element = event.target;
	
	let x = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
	let bgPos = getBcgPos(element);
	
	console.log(event);
	
	element.style.backgroundPosition = (bgPos.x - x) + 'px';
};

export const getBcgPos = (element) => {
	const pos = window.getComputedStyle(element)
		.getPropertyValue('background-position').split(' ').map((v) => parseInt(v, 10));
	
	return {
		x: pos[0],
		u: pos[1]
	};
};

export const getBcgImage = (element) => {
	let backgroundImage = window.getComputedStyle(element)
		.getPropertyValue('background-image').replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
	
	console.log(backgroundImage);
	
	const image = new Image();
	image.src = backgroundImage;
	
	return image;
};