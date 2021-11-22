import Player from "../../engine/player.js"
import {PlayerOptions} from "../../engine/player.js"

export default class GamePlayer {
  static playerBackground = "assets/alienGreen.png"
  static forwardSpeed = 5
  static backwardSpeed = 2
  static player: Player
  static async create(): Promise<void>{
  	if(GamePlayer.player !== undefined)
      	throw new Error("Trying to create new player, one has already exist")

    const newPlayerOptions: PlayerOptions = {
      	backgroundImage: GamePlayer.playerBackground,
        xStartPosition: 2,
        yStartPosition: 2,
      	forwardSpeed: GamePlayer.forwardSpeed,
      	backwardSpeed: GamePlayer.backwardSpeed
    }

    GamePlayer.player = new Player(newPlayerOptions)
  }
}