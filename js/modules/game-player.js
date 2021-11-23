import Game from "./game.js";
import Player from "../../engine/player.js";
export default class GamePlayer extends Game {
    static async create() {
        if (GamePlayer.player !== undefined)
            throw new Error("Trying to create new player, one has already exist");
        const newPlayerOptions = {
            backgroundImage: GamePlayer.playerBackground,
            xStartPosition: 2,
            yStartPosition: 2,
            forwardSpeed: GamePlayer.forwardSpeed,
            backwardSpeed: GamePlayer.backwardSpeed
        };
        GamePlayer.player = new Player(newPlayerOptions);
        GamePlayer.node.appendChild(GamePlayer.player.render());
    }
}
GamePlayer.playerBackground = "assets/alienGreen.png";
GamePlayer.forwardSpeed = 5;
GamePlayer.backwardSpeed = 2;
