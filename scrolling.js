let lastMouseY = 0;
let dragging = false;

window.addEventListener("wheel", (event) => {
    window.scrollBy(0, event.deltaY);
});

window.addEventListener("touchstart", (event) => {
    lastMouseY = event.touches[0].clientY;
    dragging = true;
});

window.addEventListener("touchend", () => {
    dragging = false;
});

window.addEventListener("touchmove", (event) => {
    if (dragging) {
        let newMouseY = lastMouseY - event.touches[0].clientY;
        window.scrollBy(0, newMouseY);
        lastMouseY = event.touches[0].clientY;
    }
});