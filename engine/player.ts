import Vector from "./vector.js"

export class HTMLPlayerElement extends HTMLDivElement{
	constructor(){super(); return this;}
	player: (Player | null) = null
}

customElements.define("game-player", HTMLPlayerElement, { extends: 'div' })

export interface PlayerOptions{
  	backgroundImage?: string
    xStartPosition?: number
    yStartPosition?: number
  	moveAnimation?: string
}

export default class Player {
  constructor(playerOptions: PlayerOptions) {
    	if(playerOptions.backgroundImage !== undefined)
          	this.backgroundImage = playerOptions.backgroundImage 
    
    	if(playerOptions.xStartPosition !== undefined)
          	this.xStartPosition = playerOptions.xStartPosition
    	if(playerOptions.yStartPosition !== undefined)
          	this.yStartPosition = playerOptions.yStartPosition
  }
  backgroundImage: string | null = null
  xStartPosition: number | null = null
  yStartPosition: number | null = null
  render(): HTMLPlayerElement{
    
	const dom = new HTMLPlayerElement()
    dom.style.position = "relative"
    if(this.backgroundImage !== null){
      	dom.style.backgroundImage = `url(${this.backgroundImage})`
      	dom.style.backgroundSize = "cover"
      	dom.style.backgroundRepeat = "no-repeat"
    }
    if(this.xStartPosition !== null)
      	dom.style.left = `${this.xStartPosition}px`
    if(this.yStartPosition !== null)
      	dom.style.bottom = `-${this.yStartPosition}px`

	this.xPosition = this.xStartPosition;
    this.yPosition = this.yStartPosition;

	this.dom = dom
    
	this.dom.player = this
    return dom
    
  }
  private dom: HTMLPlayerElement | null = null
  updatePosition():void{
    	if(this.dom !== undefined){
        	this.xPosition = parseFloat(getComputedStyle(this.dom).left)
          	this.yPosition = parseFloat(getComputedStyle(this.dom).bottom) * (-1)
        }
  }
  getPosition():{x: number, y: number}{
    return {
      	x: this.xPosition,
      	y: this.yPosition
    }
  }
  getDom(): (HTMLPlayerElement | null){
	return this.dom
  }
  private xPosition: number | null = null
  private yPosition: number | null = null
}