export const pinchEvent = (requestedElement) => {
	
	const init = () => {
		requestedElement.onpointerdown = pointerdown_handler;
		requestedElement.onpointermove = pointermove_handler;
		requestedElement.onpointerup = pointerup_handler;
		requestedElement.onpointercancel = pointerup_handler;
		requestedElement.onpointerout = pointerup_handler;
		requestedElement.onpointerleave = pointerup_handler;
	};
	
	let evCache = new Array();
	let prevDiff = -1;
	
	const pointerdown_handler = (event) => {
		evCache.push(event);
	};
	
	function pointermove_handler(ev) {
		for (let i = 0; i < evCache.length; i++) {
			if (ev.pointerId === evCache[i].pointerId) {
				evCache[i] = ev;
				break;
			}
		}
		
		if (evCache.length === 2) {
			
			let curDiff = Math.abs(evCache[0].clientX - evCache[1].clientX);
			
			if (prevDiff > 0) {
				if (curDiff > prevDiff) {
					ev.target.style.transform = `scale(1.7)`;
					ev.target.classList.add('pinchActive');
				}
				
				if (curDiff < prevDiff) {
					ev.target.style.transform = `scale(1)`;
					ev.target.classList.remove('pinchActive');
				}
			}
			
			prevDiff = curDiff;
		}
	}
	
	const pointerup_handler = (ev) => {
		remove_event(ev);
		if (evCache.length < 2) prevDiff = -1;
	};
	
	const remove_event = (ev) => {
		
		for (let i = 0; i < evCache.length; i++) {
			if (evCache[i].pointerId === ev.pointerId) {
				evCache.splice(i, 1);
				break;
			}
		}
	};
	
	init();
};