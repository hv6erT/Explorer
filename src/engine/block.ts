export class HTMLBlockElement extends HTMLDivElement{
	constructor(){super(); return this;}
	block: (Block | null) = null
}

customElements.define("game-block", HTMLBlockElement)

export type BlockType = "impenetrable" | "penetrable"

export interface BlockOptions{
  	type: BlockType
  	backgroundImage?: string
  	backgroundColor?: string
  	size?: number
}

export default class Block{
  	constructor(blockOptions: BlockOptions){
      	this.type = blockOptions.type
      	if(blockOptions.backgroundImage)
          	this.backgroundImage = blockOptions.backgroundImage
      	if(blockOptions.backgroundColor)
          	this.backgroundColor = blockOptions.backgroundColor
      	if(blockOptions.size){
          	this.size= blockOptions.size
        }
    }
  	type: BlockType
  	backgroundImage: string | null = null
  	backgroundColor: string | null = "transparent"
  	size: number | null = 16
  	render(): HTMLBlockElement{
		const dom = new HTMLBlockElement()
      	if(this.backgroundImage !== null)
      		dom.style.backgroundImage = `url(${this.backgroundImage})`
      	if(this.backgroundColor !== null)
      		dom.style.backgroundColor = this.backgroundColor
      	if(this.size !== null){
          	if(this.size < 0)
              	throw new Error("Cannot create block dom, invalid value of this.size")
          	dom.style.width = `${this.size}px`
          	dom.style.height = `${this.size}px`
        }

      	dom.block = this
      	this.dom = dom
      	return dom
    }
  	private dom: HTMLBlockElement | null = null
	getDom(): (HTMLBlockElement | null){
		return this.dom
  	}
}