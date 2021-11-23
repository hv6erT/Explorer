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
  	forwardSpeed?: number
  	backwardSpeed?: number
}

export default class Player {
  constructor(playerOptions: PlayerOptions) {
    	if(playerOptions.backgroundImage !== undefined)
          	this.backgroundImage = playerOptions.backgroundImage 
    
    	if(playerOptions.xStartPosition !== undefined)
          	this.xStartPosition = playerOptions.xStartPosition
    	if(playerOptions.yStartPosition !== undefined)
          	this.yStartPosition = playerOptions.yStartPosition
    
    	if(playerOptions.forwardSpeed !== undefined)
          	this.forwardSpeed = playerOptions.forwardSpeed
    	if(playerOptions.backwardSpeed !==undefined)
          	this.backwardSpeed = playerOptions.backwardSpeed
  }
  backgroundImage: string | null = null
  forwardSpeed: number = 5
  backwardSpeed: number = 3
  xStartPosition: number | null = null
  yStartPosition: number | null = null
  render(): HTMLPlayerElement{
    
	const dom = new HTMLPlayerElement()
    dom.style.position = "relative"
    if(this.backgroundImage !== null)
      	dom.style.backgroundImage = `url(${this.backgroundImage})`
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
  goForward(): Vector{
    	if(this.dom === null)
  			throw new Error("Cannot move Player that have not dom, create it using this.render(), and then append it to DOM")

    	if(this.xPosition === null || this.yPosition === null)
          	throw new Error("Something went wrong with xPosition or yPosition")

    	return new Vector({
          	player: this,
          	x: this.forwardSpeed
        })
    	
  }
  goBack(): Vector{
    	if(this.dom === null)
  			throw new Error("Cannot move Player that have not dom, create it using this.render(), and then append it to DOM")

    	if(this.xPosition === null || this.yPosition === null)
          	throw new Error("Something went wrong with xPosition or yPosition")

    	return new Vector({
          	player: this,
          	x: -this.backwardSpeed
        })
  }
  changePosition(newXPosition: number, newYPosition: number): void{
    	if(this.dom === null)
          	throw new Error("Cannot move player that have not dom. Use player.render() first")
    	this.xPosition = newXPosition
    	this.yPosition = newYPosition
    	this.dom.style.left = `${newXPosition}px`
    	this.dom.style.bottom = `-${newYPosition}px`
    	
  }
  getPxPosition():{x: number, y: number}{
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