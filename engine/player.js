export class HTMLPlayerElement extends HTMLDivElement {
    constructor() {
        super();
        this.player = null;
        return this;
    }
}
customElements.define("game-player", HTMLPlayerElement, { extends: 'div' });
export default class Player {
    constructor(playerOptions) {
        this.backgroundImage = null;
        this.xStartPosition = null;
        this.yStartPosition = null;
        this.dom = null;
        this.xPosition = null;
        this.yPosition = null;
        if (playerOptions.backgroundImage !== undefined)
            this.backgroundImage = playerOptions.backgroundImage;
        if (playerOptions.xStartPosition !== undefined)
            this.xStartPosition = playerOptions.xStartPosition;
        if (playerOptions.yStartPosition !== undefined)
            this.yStartPosition = playerOptions.yStartPosition;
    }
    render() {
        const dom = new HTMLPlayerElement();
        dom.style.position = "relative";
        if (this.backgroundImage !== null) {
            dom.style.backgroundImage = `url(${this.backgroundImage})`;
            dom.style.backgroundSize = "cover";
            dom.style.backgroundRepeat = "no-repeat";
        }
        if (this.xStartPosition !== null)
            dom.style.left = `${this.xStartPosition}px`;
        if (this.yStartPosition !== null)
            dom.style.bottom = `-${this.yStartPosition}px`;
        this.xPosition = this.xStartPosition;
        this.yPosition = this.yStartPosition;
        this.dom = dom;
        this.dom.player = this;
        return dom;
    }
    updatePosition() {
        if (this.dom !== undefined) {
            this.xPosition = parseFloat(getComputedStyle(this.dom).left);
            this.yPosition = parseFloat(getComputedStyle(this.dom).bottom) * (-1);
        }
    }
    getPosition() {
        return {
            x: this.xPosition,
            y: this.yPosition
        };
    }
    getDom() {
        return this.dom;
    }
}
