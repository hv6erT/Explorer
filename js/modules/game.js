export default class Game {
}
Game.node = document.getElementById("game-wrapper");
Game.mapHeight = 9;
Game.mapWidth = 100;
Game.blockSize = parseFloat(getComputedStyle(Game.node).height) / Game.mapHeight;
