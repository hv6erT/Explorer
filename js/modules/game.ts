export default class Game{
  	protected static node = document.getElementById("game-wrapper")
  	static readonly mapHeight = 9
  	static readonly mapWidth = 100
  	static readonly blockSize = parseFloat(getComputedStyle(Game.node).height)/Game.mapHeight
}