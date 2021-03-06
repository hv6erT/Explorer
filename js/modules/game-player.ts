import Game from "./game.js"
import GameMap from "./game-map.js"

import Player from "../../engine/player.js"
import {PlayerOptions} from "../../engine/player.js"

import Vector from "../../engine/vector.js"
import {VectorOptions} from "../../engine/vector.js"

export default class GamePlayer extends Game{
  static playerBackground = "assets/alienGreen.png"
  static forwardSpeed: number = 5
  static backwardSpeed: number = 2
  static player: Player
  static async create(): Promise<void>{
  	if(GamePlayer.player !== undefined)
      	throw new Error("Trying to create new player, one has already exist")

    const newPlayerOptions: PlayerOptions = {
      	backgroundImage: GamePlayer.playerBackground,
		width: GamePlayer.blockSize,
      	height: GamePlayer.blockSize
    }

    GamePlayer.player = new Player(newPlayerOptions)
    
    GamePlayer.node.insertBefore(GamePlayer.player.render(), null)
  }
  static goForward(): void{
    	const vectorOptions: VectorOptions = {
          	player: GamePlayer.player,
          	x: GamePlayer.forwardSpeed
        }
    	const vector: Vector = new Vector(vectorOptions)
    	vector.apply(GameMap.map)
  }
  static goBackward(): void{
    	const vectorOptions: VectorOptions = {
          	player: GamePlayer.player,
          	x: this.backwardSpeed * (-1)
        }
    	const vector: Vector = new Vector(vectorOptions)
    	vector.apply(GameMap.map)
  }
  static jumpTop(): void{
    	const vectorOptions: VectorOptions = {
          	player: GamePlayer.player,
          	y: -100
        }
    	const vector: Vector = new Vector(vectorOptions)
    	vector.apply(GameMap.map)
  }
}