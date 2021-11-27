import Map from "./map.js"
import Player from "./player.js"

export interface VectorOptions{
  	player: Player
  	x?: number
  	y?: number
}

export default class Vector {
  constructor(vectorOptions: VectorOptions) {
    	if(vectorOptions.y !== undefined)
          this.y = vectorOptions.y
    	if(vectorOptions.x !==undefined)
          	this.x = vectorOptions.x

    	this.player = vectorOptions.player
    	
  }
  readonly player: Player
  apply(map: Map){
    	if(this.player.getDom() === null)
          	throw new Error("Cannot apply new player position to player that have not dom. Use player.render() first")
          	
    	const playerPxPosition: {x: number; y: number} = this.player.getPosition()

    	//const mapBlockSize = map.getBlockSize()

    	const self = this
		const gravity = function(){
          	let blockAtBottom = map.getBlockAtPxPosition(playerPxPosition.x, playerPxPosition.y+1)
          
          	while(blockAtBottom!=null && blockAtBottom.type === "penetrable"){
              	playerPxPosition.y++
              	self.player.getDom().style.top = `${playerPxPosition.y}px`
              	blockAtBottom = map.getBlockAtPxPosition(playerPxPosition.x, playerPxPosition.y+1)
            }
        }
    
		const goForward = function () {
          	const nextBlock = map.getBlockAtPxPosition(playerPxPosition.x+1, playerPxPosition.y)

          	if(nextBlock.type === "penetrable"){
              	playerPxPosition.x++
    		  	self.player.getDom().style.left=`${playerPxPosition.x}px`	
            }
		}

    	const goBackward = function () {
    	  	const previousBlock = map.getBlockAtPxPosition(playerPxPosition.x-1, playerPxPosition.y)

          	if(previousBlock.type === "penetrable"){
              	playerPxPosition.x--
    		  	self.player.getDom().style.left=`${playerPxPosition.x}px`	
            }
    	}

    	const jumpTop = function () {
    	  	const blockAtTop = map.getBlockAtPxPosition(playerPxPosition.x, playerPxPosition.y+1)
          	if(blockAtTop.type === "penetrable"){
              	playerPxPosition.y++
    		  	//self.player.getDom().style.left=`${playerPxPosition.y}px`
            }
    	}
    
    	if(this.x!=0 && this.y!=0){
          	gravity()
        }
    	else if(this.x!=0){
          	if(this.x>0){
              	for(let i=0; i<this.x; i++){
                  	goForward()
                  	gravity()
                }
            }
          	else if(this.x<0){
              	for(let i=this.x; i<0; i++){
                  	goBackward()
                  	gravity()
                }
            }
        }
    	else if(this.y!=0){
          	if(this.y>0){
              	for(let i=0; i<this.y; i++){
                  	jumpTop()
                }
              	gravity();
            }
        }

    	this.player.updatePosition();
    
  }
  x: number = 0
  y: number = 0
}