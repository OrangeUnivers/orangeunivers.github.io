class Card extends HTMLElement {
    static get observedAttributes() {
        return ['color', 'card', 'action', 'size', 'selected', 'extra', 'version', 'position', 'ldm', 'direction']; // Watch both attributes
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --main-color: gray;
                    --text-color: white;
                    --size: 10rem;
                }
                div {
                    position: relative;
                    width: var(--size);
                    height: var(--size);
                    background-size: cover;
                    border-radius: calc(var(--size) * 0.06);
                    background-color: var(--main-color);
                    transition: filter 0.3s, background-color 0.3s;
                    --extra-color: var(--text-color);
                    --extra-background-color: var(--main-color);
                    box-shadow: 0 calc(var(--size) * 0.015) calc(var(--size) * 0.06) #00000087;
                    overflow: hidden;
                }
                div.blank {
                    box-shadow: 0 0 0 #00000000;
                }
                slot {
                    position: absolute;
                    bottom: calc(var(--size) * 0.06);
                    display: flex;
                    width: var(--size);
                    justify-content: center;
                    color: var(--text-color);
                    background-color: var(--main-color);
                    font-weight: 700;
                    font-size: calc(var(--size) * 0.12);
                    z-index: 2;
                    user-select: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                }
                #icon {
                    width: var(--size);
                    height: var(--size);
                    user-select: none;
                    -webkit-user-drag: none;
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    color: var(--text-color);
                    --icon-image: url('resources/cards/empty.svg');
                    background-color: var(--text-color);
                    -webkit-mask-image: var(--icon-image);
                    -webkit-mask-repeat: no-repeat;
                    -webkit-mask-position: center;
                    -webkit-mask-size: contain;
                    mask-image: var(--icon-image);
                    mask-repeat: no-repeat;
                    mask-position: center;
                    mask-size: contain;
                    transition: transform 0.3s;
                }
                #action {
                    position: absolute;
                    top: calc(var(--size) * 0.04);
                    right: calc(var(--size) * 0.04);
                    width: calc(var(--size) * 0.25);
                    height: calc(var(--size) * 0.25);
                    display: none;
                    user-select: none;
                    -webkit-user-drag: none;
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                }
                #action.added {
                    display: block;
                }
                #extra {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: var(--size);
                    height: var(--size);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    user-select: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    overflow: hidden;
                }
                #extra.teleport {
                    font-family: Clarendon;
                    font-size: calc(var(--size) * 0.24);
                    font-weight: 900;
                    color: var(--extra-color);
                }
                #extra.blank {
                    font-family: Gotham;
                    font-size: calc(var(--size) * 0.16);
                    font-weight: 700;
                    color: var(--extra-color);
                }
                #extra-outline {
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: var(--size);
                    height: var(--size);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    -webkit-text-stroke: calc(var(--size) * 0.04) var(--extra-background-color);
                    user-select: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    overflow: hidden;
                }
                #extra-outline.teleport {
                    font-family: Clarendon;
                    font-size: calc(var(--size) * 0.24);
                    font-weight: 900;
                    color: var(--extra-color);
                }
                #extra-outline.blank {
                    font-family: Gotham;
                    font-size: calc(var(--size) * 0.16);
                    font-weight: 700;
                    display: none;
                }
                .ldm #extra-outline {
                    display: none!important;
                }
                #position {
                    position: absolute;
                    bottom: calc(var(--size) * 0.04);
                    right: calc(var(--size) * 0.04);
                    user-select: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    font-family: Gotham;
                    font-weight: 500;
                    font-size: calc(var(--size) * 0.12);
                    color: var(--text-color);
                    background-color: var(--main-color);
                    padding-inline: 0.4rem;
                    border-radius: 0.4rem;
                    transition: background-color 0.3s;
                }

                div.default-og { --main-color: gray; }
                div.green-og { --main-color: #81ba27; }
                div.red-og { --main-color: #e50140; }
                div.yellow-og { --main-color: #fbba00; }
                div.blue-og { --main-color: #019ed4; }
                div.white-og { --main-color: #ffffff; --text-color: #000000; --extra-color: #ffffff; --extra-background-color: #000000 }
                div.rainbow-og { background-color: none; background: linear-gradient(0deg,rgba(255, 0, 69, 1) 0%, rgba(244, 54, 48, 1) 7%, rgba(234, 103, 28, 1) 16%, rgba(227, 135, 16, 1) 23%, rgba(219, 179, 0, 1) 38%, rgba(211, 179, 0, 1) 42%, rgba(165, 177, 0, 1) 53%, rgba(109, 179, 0, 1) 64%, rgba(0, 149, 205, 1) 100%);}
                div.blank-og { --main-color: #222; --text-color: #000000; }
                div.green { --main-color: #80ba27; }
                div.red { --main-color: #e40040; }
                div.yellow { --main-color: #fbba00; }
                div.blue { --main-color: #009ed4; }
                div.white { --main-color: #ffffff; --text-color: #000000; --extra-color: #ffffff; --extra-background-color: #000000 }
                div.rainbow { background-color: none; background: linear-gradient(180deg, #009ed4 0%, #80ba27 33%, #fdc300 68%, #e50051 100%);}
                div.blank { --main-color: #4a4a49; --text-color: #FFFFFF; }
            </style>
            <div><div id="icon"></div><img id="action"></img><slot></slot><span id="extra-outline"></span><span id="extra"></span><span id="position"></span></div>
        `;
    }

    connectedCallback() {
        this._updateDisplay();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'color' || name === 'card' || name === 'action' || name === 'size' || name === 'selected' || name === 'extra' || name === 'version' || name === 'position' || name === 'ldm' || name === 'direction') {
            this._updateDisplay();
        }
    }

    _updateDisplay() {
        function roundHalfDown(n) {
            let floor = Math.floor(n);
            let diff = n - floor;

            if (diff > 0.5) return floor + 1;
            return floor; // diff < 0.5 OR exactly 0.5
        }
        const color = this.getAttribute('color') || 'default';
        const card = this.getAttribute('card') || 'empty';
        const action = this.getAttribute('action') || '';
        const size = this.getAttribute('size') || '10rem';
        const selected = this.getAttribute('selected') || 'true';
        const extra = this.getAttribute('extra') || '';
        const version = this.getAttribute('version') || 'normal';
        const position = this.getAttribute('position') || '';
        const ldm = this.getAttribute('ldm') || 'false';
        const direction = this.getAttribute('direction') || 'up';

        const div = this.shadowRoot.querySelector('div');
        div.style.setProperty('--size', size);
        div.className = '';
        div.classList.add(color+(version == "old" ? "-og" : ""));
        if (ldm === "true") {
            div.classList.add("ldm");
        } else {
            div.classList.remove("ldm");
        }

        if (selected == "false") {
            div.style.filter = "brightness(0.47)";
        } else if (selected == "true") {
            div.style.filter = "";
        } else {
            div.style.filter = "";
        }

        const image = this.shadowRoot.querySelector('#icon');
        let transformNumber;
        if (image.style.transform.length === 0) {
            transformNumber = 0;
        } else {
            transformNumber = parseInt(image.style.transform.slice(7, -4));
        }
        console.log(transformNumber);
        switch (direction) {
            case "up": {
                let newValue = Math.round(transformNumber / 360) * 360;
                document.getElementById("data").innerHTML = `Rotation: ${newValue}`;
                image.style.transform = `rotate(${newValue}deg)`;
                break;
            }
            case "right": {
                let newValue = Math.round((transformNumber - 90) / 360) * 360 + 90;
                document.getElementById("data").innerHTML = `Rotation: ${newValue}`;
                image.style.transform = `rotate(${newValue}deg)`;
                break;
            }
            case "down": {
                let newValue = Math.round((transformNumber - 180) / 360) * 360 + 180;
                document.getElementById("data").innerHTML = `Rotation: ${newValue}`;
                image.style.transform = `rotate(${newValue}deg)`;
                break;
            }
            case "left": {
                let newValue = Math.round((transformNumber - 270) / 360) * 360 + 270;
                document.getElementById("data").innerHTML = `Rotation: ${newValue}`;
                image.style.transform = `rotate(${newValue}deg)`;
                break;
            }
        }
        const texture = version == "old" ? `resources/cards_self-made/${card}.svg` : `resources/cards/${card}.svg`;
        image.style.setProperty('--icon-image', `url('${texture}')`);
        if (card === "empty") {
            image.style.display = "none";
        } else {
            image.style.display = "";
        }

        const actionImage = this.shadowRoot.querySelector('#action');
        if (action == "attack") {
            actionImage.src = `resources/types/${action}.svg`;
            actionImage.classList.add("added");
        } else {
            actionImage.src = ``;
            actionImage.classList.remove("added");
        }

        const slot = this.shadowRoot.querySelector('slot');

        const extraElement = this.shadowRoot.querySelector('#extra');
        const extraElementOutline = this.shadowRoot.querySelector('#extra-outline');
        if (card.startsWith("teleport-") && extra != "" && /^\d+$/.test(extra)) {
            extraElement.classList = "teleport";
            extraElement.innerText = extra;
            extraElementOutline.classList = "teleport";
            extraElementOutline.innerText = extra;
        } else if (card === "empty" && extra != "") {
            extraElement.classList = "blank";
            extraElement.innerText = extra;
            extraElementOutline.classList = "blank";
            extraElementOutline.innerText = extra;
        } else {
            extraElement.classList = "";
            extraElement.innerText = "";
            extraElementOutline.classList = "";
            extraElementOutline.innerText = "";
        }
        if (card === "teleport-outline" && color === "blank") {
            image.style.backgroundColor = "#000";
            extraElement.style.color = "#000";
        } else {
            image.style.backgroundColor = "";
            extraElement.style.color = "";
        }

        const posElement = this.shadowRoot.querySelector('#position');
        posElement.innerHTML = position;
    }
}

customElements.define('board-card', Card);