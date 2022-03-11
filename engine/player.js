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
        this.width = playerOptions.width;
        this.height = playerOptions.height;
        if (playerOptions.xStartPosition !== undefined)
            this.xStartPosition = playerOptions.xStartPosition;
        if (playerOptions.yStartPosition !== undefined)
            this.yStartPosition = playerOptions.yStartPosition;
    }
    render() {
        const dom = new HTMLPlayerElement();
        dom.style.position = "relative";
        dom.style.width = `${this.width}px`;
        dom.style.height = `${this.height}px`;
        if (this.backgroundImage !== null) {
            dom.style.backgroundImage = `url(${this.backgroundImage})`;
            dom.style.backgroundSize = "cover";
            dom.style.backgroundRepeat = "no-repeat";
        }
        if (this.xStartPosition !== null) {
            dom.style.left = `${this.xStartPosition}px`;
            this.xPosition = this.xStartPosition + (this.width / 2);
        }
        else
            this.xPosition = (this.width / 2);
        if (this.yStartPosition !== null) {
            dom.style.top = `${this.yStartPosition}px`;
            this.yPosition = this.yStartPosition + (this.height / 2);
        }
        else
            this.yPosition = (this.height / 2);
        this.dom = dom;
        this.dom.player = this;
        return dom;
    }
    updatePosition() {
        if (this.dom !== undefined) {
            const nodeHeight = parseFloat(getComputedStyle(this.dom).height);
            const nodeWidth = parseFloat(getComputedStyle(this.dom).width);
            this.xPosition = parseFloat(getComputedStyle(this.dom).left) + (nodeWidth / 2);
            this.yPosition = parseFloat(getComputedStyle(this.dom).top) + (nodeHeight / 2);
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
