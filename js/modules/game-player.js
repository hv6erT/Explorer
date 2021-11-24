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
        const playerDom = GamePlayer.player.render();
        playerDom.style.width = GamePlayer.blockSize + "px";
        playerDom.style.height = GamePlayer.blockSize + "px";
        GamePlayer.node.insertBefore(GamePlayer.player.render(), null);
    }
}
GamePlayer.playerBackground = "assets/alienGreen.png";
GamePlayer.forwardSpeed = 5;
GamePlayer.backwardSpeed = 2;
