let GameMap, GamePlayer
const loadGame = async ()=>{
  	const gameWrapperNode = document.getElementById("game-wrapper")
  	const startWrapperNode = document.getElementById("start-wrapper")
  	const startWrapperLoaderInfoNode = document.getElementById("start-wrapper-loader-info")
  	const startWrapperLoaderNode = document.getElementById("start-wrapper-loader")

  	gameWrapperNode.style.display="none"
  
  	startWrapperLoaderInfoNode.style.visibility="hidden"

  	if(!GameMap){
    	const module = await import("./modules/game-map.js")
    	GameMap = module.default
    }
  	if(!GamePlayer){
    	const module = await import("./modules/game-player.js")
    	GamePlayer = module.default
    }

  	startWrapperLoaderNode.style.visibility ="hidden"
  	startWrapperLoaderInfoNode.style.visibility=""

	window.addEventListener("keydown", function(event){
      	if(!GameMap.map || !GamePlayer.player)
          	return
      
      	switch (event.code){
            case "ArrowRight": 
            	GamePlayer.goForward()
            	break
            case "ArrowLeft":
            	GamePlayer.goBackward()
            	break
          	case "ArrowTop":
          	case "Space":
            	GamePlayer.jumpTop()
            	break;
        }
    })
  
	startWrapperNode.addEventListener("click", startGame)
  	
}

window.addEventListener("DOMContentLoaded", loadGame)

const startGame = async ()=>{
  	if(!GameMap || !GamePlayer)
      	throw new Error("Cannot start game when modules are not loaded, use loadGame first")
  	const startWrapperNode = document.getElementById("start-wrapper")
  	const gameWrapperNode = document.getElementById("game-wrapper")

  	await GameMap.create()
  	await GamePlayer.create()

  	startWrapperNode.style.display="none"
  	gameWrapperNode.style.display="" 	
  
}


