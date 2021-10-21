export class HTMLBlockElement extends HTMLDivElement {
    constructor() {
        super();
        this.block = null;
        return this;
    }
}
customElements.define("game-block", HTMLBlockElement);
class Block {
    constructor(blockOptions) {
        this.backgroundImage = null;
        this.backgroundColor = "transparent";
        this.size = 16;
        this.dom = null;
        this.type = blockOptions.type;
        if (blockOptions.backgroundImage)
            this.backgroundImage = blockOptions.backgroundImage;
        if (blockOptions.backgroundColor)
            this.backgroundColor = blockOptions.backgroundColor;
        if (blockOptions.size) {
            this.size = blockOptions.size;
        }
    }
    render() {
        const dom = new HTMLBlockElement();
        if (this.backgroundImage !== null)
            dom.style.backgroundImage = `url(${this.backgroundImage})`;
        if (this.backgroundColor !== null)
            dom.style.backgroundColor = this.backgroundColor;
        if (this.size !== null) {
            if (this.size < 0)
                throw new Error("Cannot create block dom, invalid value of this.size");
            dom.style.width = `${this.size}px`;
            dom.style.height = `${this.size}px`;
        }
        dom.block = this;
        this.dom = dom;
        return dom;
    }
    getDom() {
        return this.dom;
    }
}
export default Block;
