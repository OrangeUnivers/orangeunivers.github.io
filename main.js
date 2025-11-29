let bigScreenHolderElement = document.getElementById("big-screen-holder");

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // const scrollX = window.scrollX;
    if (scrollY > 0.1) {
        bigScreenHolderElement.style.height = "480px";
        bigScreenHolderElement.classList.add("minimized");
        
    } else {
        bigScreenHolderElement.style.height = `${window.innerHeight}px`;
        bigScreenHolderElement.classList.remove("minimized");
    }
});
bigScreenHolderElement.style.height = `${window.innerHeight}px`;