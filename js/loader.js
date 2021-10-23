let GameMap
const loadGame = async ()=>{
  	const gameWrapperNode = document.getElementById("game-wrapper")
  	const startWrapperNode = document.getElementById("start-wrapper")
  	const startWrapperLoaderInfoNode = document.getElementById("start-wrapper-loader-info")
  	const startWrapperLoaderNode = document.getElementById("start-wrapper-loader")

  	gameWrapperNode.style.display="none"
  
  	startWrapperLoaderInfoNode.style.visibility="hidden"
  
  	GameMap = await import("./modules/game-map.js").GameMap

  	startWrapperLoaderNode.style.visibility ="hidden"
  	startWrapperLoaderInfoNode.style.visibility=""
  
	startWrapperNode.addEventListener("click", startGame)
  	
}

window.addEventListener("DOMContentLoaded", loadGame)

const startGame = async ()=>{
  	if(!GameMap)
      	throw new Error("Cannot start game when it is not loaded, use loadGame first")
  	const startWrapperNode = document.getElementById("start-wrapper")
  	const gameWrapperNode = document.getElementById("game-wrapper")
  
  	startWrapperNode.style.display="none"
  	gameWrapperNode.style.display=""
	console.log(GameMap)
  	await GameMap.create()
  
}


