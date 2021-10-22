let GameMap
const loadGame = async ()=>{
  	const gameWrapperNode = document.getElementById("game-wrapper")
  	const startWrapperNode = document.getElementById("start-wrapper")

  	startWrapperNode.style.display="none"
  	gameWrapperNode.style.display="block"

  	startWrapperNode.addEventListener("click", startGame)
  
  	GameMap = await import("./modules/game-map.js")
}

window.addEventListener("DOMContentLoaded", loadGame)

const startGame = async ()=>{
  	gameWrapperNode.style.display="none"
  	startWrapperNode.style.display="block"
}


