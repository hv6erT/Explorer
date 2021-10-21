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
          	
    	const playerPxPosition: {x: number; y: number} = this.player.getPxPosition()

    	const mapBlockSize = map.getBlockSize()

		const gravity = function(){
          	let blockAtBottom = map.getBlockAtPxPosition(playerPxPosition.x, playerPxPosition.y-mapBlockSize)
          
          	while(blockAtBottom!=null && blockAtBottom.blockType === "penetrable"){
              	playerPxPosition.y-=mapBlockSize
              	this.player.getDom().style.bottom = `-${playerPxPosition.y}px`
              	blockAtBottom = map.getBlockAtPxPosition(playerPxPosition.x, playerPxPosition.y-mapBlockSize)
            }
        }
    
		const goForward = function () {
          	const nextBlock = map.getBlockAtPxPosition(playerPxPosition.x+1, playerPxPosition.y)

          	if(nextBlock.blockType === "penetrable"){
              	playerPxPosition.x++
    		  	this.player.getDom().style.left=`${playerPxPosition.x}`	
            }
		}

    	const goBackward = function () {
    	  	const previousBlock = map.getBlockAtPxPosition(playerPxPosition.x-1, playerPxPosition.y)

          	if(previousBlock.blockType === "penetrable"){
              	playerPxPosition.x--
    		  	this.player.getDom().style.left=`${playerPxPosition.x}`	
            }
    	}

    	const jumpTop = function () {
    	  	const blockAtTop = map.getBlockAtPxPosition(playerPxPosition.x, playerPxPosition.y+1)
          	if(blockAtTop.blockType === "penetrable"){
              	playerPxPosition.y++
    		  	this.player.getDom().style.left=`-${playerPxPosition.y}px`
            }
    	}
    
    	if(this.x!=0 && this.y!=0){
          	
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

    	
    
  }
  x: number = 0
  y: number = 0
}