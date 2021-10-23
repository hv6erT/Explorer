import Vector from "./vector.js";
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
        this.forwardSpeed = 5;
        this.backwardSpeed = 3;
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
        if (playerOptions.forwardSpeed !== undefined)
            this.forwardSpeed = playerOptions.forwardSpeed;
        if (playerOptions.backwardSpeed !== undefined)
            this.backwardSpeed = playerOptions.backwardSpeed;
    }
    render() {
        const dom = new HTMLPlayerElement();
        dom.style.position = "relative";
        if (this.backgroundImage !== null)
            dom.style.backgroundImage = `url(${this.backgroundImage})`;
        if (this.xStartPosition !== null)
            dom.style.left = `${this.xStartPosition}px`;
        if (this.yStartPosition !== null)
            dom.style.bottom = `-${this.yStartPosition}px`;
        this.xPosition = this.xStartPosition;
        this.yPosition = this.yStartPosition;
        this.dom.player = this;
        this.dom = dom;
        return dom;
    }
    goForward() {
        if (this.dom === null)
            throw new Error("Cannot move Player that have not dom, create it using this.render(), and then append it to DOM");
        if (this.xPosition === null || this.yPosition === null)
            throw new Error("Something went wrong with xPosition or yPosition");
        return new Vector({
            player: this,
            x: this.forwardSpeed
        });
    }
    goBack() {
        if (this.dom === null)
            throw new Error("Cannot move Player that have not dom, create it using this.render(), and then append it to DOM");
        if (this.xPosition === null || this.yPosition === null)
            throw new Error("Something went wrong with xPosition or yPosition");
        return new Vector({
            player: this,
            x: -this.backwardSpeed
        });
    }
    chnagePosition(newXPosition, newYPosition) {
        if (this.dom === null)
            throw new Error("Cannot move player that have not dom. Use player.render() first");
        this.xPosition = newXPosition;
        this.yPosition = newYPosition;
        this.dom.style.left = `${newXPosition}px`;
        this.dom.style.bottom = `-${newYPosition}px`;
    }
    getPxPosition() {
        return {
            x: this.xPosition,
            y: this.yPosition
        };
    }
    getDom() {
        return this.dom;
    }
}
