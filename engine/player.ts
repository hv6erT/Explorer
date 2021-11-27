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
  	width: number,
  	height: number,
  	moveAnimation?: string
}

export default class Player {
  constructor(playerOptions: PlayerOptions) {
    	if(playerOptions.backgroundImage !== undefined)
          	this.backgroundImage = playerOptions.backgroundImage 

    	this.width = playerOptions.width
    	this.height = playerOptions.height
    
    	if(playerOptions.xStartPosition !== undefined)
          	this.xStartPosition = playerOptions.xStartPosition
    	if(playerOptions.yStartPosition !== undefined)
          	this.yStartPosition = playerOptions.yStartPosition
  }
  width: number
  height: number
  backgroundImage: string | null = null
  xStartPosition: number | null = null
  yStartPosition: number | null = null
  render(): HTMLPlayerElement{
    
	const dom = new HTMLPlayerElement()
    dom.style.position = "relative"
    dom.style.width = `${this.width}px`
    dom.style.height = `${this.height}px`
    if(this.backgroundImage !== null){
      	dom.style.backgroundImage = `url(${this.backgroundImage})`
      	dom.style.backgroundSize = "cover"
      	dom.style.backgroundRepeat = "no-repeat"
    }
    if(this.xStartPosition !== null){
      	dom.style.left = `${this.xStartPosition}px`
      	this.xPosition = this.xStartPosition + (this.width/2)
    }
    else
      	this.xPosition = 0 + (this.width/2)
    if(this.yStartPosition !== null){
      	dom.style.top = `${this.yStartPosition}px`
      	this.yPosition = this.yStartPosition + (this.height/2)
    }
    else
      	this.yPosition = 0 + (this.height/2)

	this.dom = dom
    
	this.dom.player = this
    return dom
    
  }
  private dom: HTMLPlayerElement | null = null
  updatePosition():void{
    	if(this.dom !== undefined){
          	const nodeHeight = parseFloat(getComputedStyle(this.dom).height)
          	const nodeWidth = parseFloat(getComputedStyle(this.dom).width)

          	if(!Number.isNaN(nodeHeight) && !Number.isNaN(nodeWidth)){
            	this.xPosition = parseFloat(getComputedStyle(this.dom).left) + (nodeWidth/2)
              	this.yPosition = parseFloat(getComputedStyle(this.dom).top) + (nodeHeight/2)
            }
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