let GameMap
const loadGame = async ()=>{
  	const gameWrapperNode = document.getElementById("game-wrapper")
  	const startWrapperNode = document.getElementById("start-wrapper")

  	startWrapperNode.style.display="none"
  	gameWrapperNode.style.display=""

  	startWrapperNode.addEventListener("click", startGame)
  
  	GameMap = await import("./modules/game-map.js")
}

window.addEventListener("DOMContentLoaded", loadGame)

const startGame = async ()=>{
	const gameWrapperNode = document.getElementById("game-wrapper")
  	const startWrapperNode = document.getElementById("start-wrapper")
  
  	gameWrapperNode.style.display="none"
  	startWrapperNode.style.display=""
}


