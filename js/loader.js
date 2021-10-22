let GameMap
const load = async ()=>{
  	const gameWrapperNode = document.getElementById("game-wrapper")
  	const startWrapperNode = document.getElementById("start-wrapper")

  	startWrapperNode.style.display="none"
  	gameWrapperNode.style.display="block"
  
  	GameMap = await import("./modules/game-map.js")

  	gameWrapperNode.style.display="none"
  	startWrapperNode.style.display="block"
}

window.addEventListener("DOMContentLoaded", load)


