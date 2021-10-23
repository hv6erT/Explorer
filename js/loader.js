let GameMap
const loadGame = async ()=>{
  	const gameWrapperNode = document.getElementById("game-wrapper")
  	const startWrapperNode = document.getElementById("start-wrapper")
  	const startWrapperLoaderInfoNode = document.getElementById("start-wrapper-loader-info")
  	const startWrapperLoaderNode = document.getElementById("start-wrapper-loader")

  	gameWrapperNode.style.display="none"
  	startWrapperLoaderInfoNode.style.display="none"
  
  	GameMap = await import("./modules/game-map.js")

  	startWrapperLoaderNode.style.display ="none"
  	startWrapperLoaderInfoNode.style.display=""
	startWrapperNode.addEventListener("click", startGame)
  	
}

window.addEventListener("DOMContentLoaded", loadGame)

const startGame = async ()=>{
  	const startWrapperNode = document.getElementById("start-wrapper")
  
  	startWrapperNode.style.display="none"
}


