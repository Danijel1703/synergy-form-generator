function onOutsideClick(ref: HTMLDivElement, callback: Function) {
	window.addEventListener("mousedown", (e) => {
		if (ref.contains(e.target) || ref === e.target) return;
		callback();
	});
}

export default onOutsideClick;
