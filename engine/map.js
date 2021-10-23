export class HTMLMapElement extends HTMLDivElement {
    constructor() {
        super();
        this.map = null;
        return this;
    }
}
export class HTMLScrollMapElement extends HTMLDivElement {
    constructor() {
        super();
        this.map = null;
        return this;
    }
}
customElements.define("game-map", HTMLMapElement, { extends: 'div' });
customElements.define("game-scroll-map", HTMLScrollMapElement, { extends: 'div' });
export default class Map {
    constructor(mapOptions) {
        this.xStartScroll = 0;
        this.yStartScroll = 0;
        this.background = null;
        this.scrollDom = null;
        this.dom = null;
        this.blockSize = null;
        this.xScroll = null;
        this.yScroll = null;
        this.blocks = mapOptions.blocks;
        if (mapOptions.xStartScroll !== undefined)
            this.xStartScroll = mapOptions.xStartScroll;
        if (mapOptions.yStartScroll !== undefined)
            this.yStartScroll = mapOptions.yStartScroll;
        if (mapOptions.background !== undefined)
            this.background = mapOptions.background;
    }
    render() {
        const dom = new HTMLMapElement();
        if (this.background !== null) {
            dom.style.background = this.background;
            dom.style.backgroundSize = "cover";
        }
        dom.style.display = "flex";
        dom.style.flexDirection = "column";
        dom.style.flexWrap = "wrap";
        dom.style.position = "relative";
        dom.style.left = `${this.xStartScroll}px`;
        dom.style.bottom = `-${this.yStartScroll}px`;
        this.xScroll = this.xStartScroll;
        this.yScroll = this.yStartScroll;
        for (const block of this.blocks) {
            if (this.blockSize === null)
                this.blockSize = block.size;
            if (this.blockSize !== block.size)
                throw new Error("All blocks in the map should have the same size");
            dom.appendChild(block.render());
        }
        const scrollDom = new HTMLScrollMapElement();
        scrollDom.style.overflow = "hidden";
        scrollDom.style.cursor = "none";
        dom.map = this;
        scrollDom.appendChild(dom);
        scrollDom.map = this;
        this.dom = dom;
        this.scrollDom = scrollDom;
        return scrollDom;
    }
    renderNewBlocks(blocks) {
        if (this.dom === null)
            throw new Error("Cannot resolve Map.renderNewBlocks() - first use Map.render() to create dom");
        this.blocks.concat(blocks);
        for (const block of blocks) {
            if (this.blockSize === null) {
                this.blockSize = block.size;
            }
            if (this.blockSize !== block.size)
                throw new Error("All blocks in the map should have the same size");
            this.dom.appendChild(block.render());
        }
    }
    getBlockSize() {
        return this.blockSize;
    }
    getBlockAtPosition(x, y) {
        if (this.dom === null)
            throw new Error("Cannot resolve Map.getBlockAtPosition(), use first Map.render() to create dom");
        if (this.dom.childNodes[(x + y)] !== undefined && this.dom.childNodes[(x + y)]["block"] !== undefined)
            return this.dom.childNodes[(x + y)]["block"];
        else
            return null;
    }
    getBlockAtNumber(number) {
        if (this.dom === null)
            throw new Error("Cannot resolve Map.getBlockAtNumber(), use first Map.render() to create dom");
        if (this.dom.childNodes[number] !== undefined && this.dom.childNodes[number]["block"] !== undefined)
            return this.dom.childNodes[number]["block"];
        else
            return null;
    }
    getBlockAtPxPosition(x, y) {
        if (this.dom === null)
            throw new Error("Cannot resolve Map.getBlockAtPxPosition(), use first Map.render() to create dom");
        const clientRect = this.dom.getBoundingClientRect();
        const elementX = clientRect.left;
        const elementY = clientRect.top;
        const element = document.elementFromPoint(elementX, elementY);
        if (element.block !== undefined) {
            return element.block;
        }
        else
            throw new Error("Cannot find any block in this position");
    }
    scrollX(x) {
        if (!this.dom || !this.scrollDom)
            throw new Error("Cannot scroll Map that have not dom or scrollDom property, use Map.render() first");
        if (this.xScroll === null)
            throw new Error("Cannot scroll Map, error with Map.scrollX happened");
        this.xScroll += x;
        this.dom.style.left = `${this.xScroll}px`;
    }
    scrollY(y) {
        if (!this.dom || !this.scrollDom)
            throw new Error("Cannot scroll Map that have not dom or scrollDom property, use Map.render() first");
        if (this.yScroll === null)
            throw new Error("Cannot scroll Map, error with Map.scrollY happened");
        this.yScroll += y;
        this.dom.style.bottom = `-${this.yScroll}px`;
    }
    getDom() {
        return this.dom;
    }
}
