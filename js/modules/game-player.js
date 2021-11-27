import Game from "./game.js";
import GameMap from "./game-map.js";
import Player from "../../engine/player.js";
import Vector from "../../engine/vector.js";
export default class GamePlayer extends Game {
    static async create() {
        if (GamePlayer.player !== undefined)
            throw new Error("Trying to create new player, one has already exist");
        const newPlayerOptions = {
            backgroundImage: GamePlayer.playerBackground,
            width: GamePlayer.blockSize,
            height: GamePlayer.blockSize
        };
        GamePlayer.player = new Player(newPlayerOptions);
        GamePlayer.node.insertBefore(GamePlayer.player.render(), null);
    }
    static goForward() {
        const vectorOptions = {
            player: GamePlayer.player,
            x: GamePlayer.forwardSpeed
        };
        const vector = new Vector(vectorOptions);
        vector.apply(GameMap.map);
    }
    static goBackward() {
        const vectorOptions = {
            player: GamePlayer.player,
            x: this.backwardSpeed * (-1)
        };
        const vector = new Vector(vectorOptions);
        vector.apply(GameMap.map);
    }
}
GamePlayer.playerBackground = "assets/alienGreen.png";
GamePlayer.forwardSpeed = 5;
GamePlayer.backwardSpeed = 2;
