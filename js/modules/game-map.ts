"use strict"

import Map from "../../engine/map.js"
import {MapOptions} from "../../engine/map.js"

import Block from "../../engine/block.js"
import {BlockOptions} from "../../engine/block.js"

interface Biome{
  	onGroundBlocksOptions: BlockOptions[],
  	coverBlocksOptions: BlockOptions[],
  	groundBlocksOptions: BlockOptions[]
}

export default class GameMap{ 
  	private static node = document.getElementById("game-wrapper")
	private static mapHeight = 9
	private static mapBlockSize = parseFloat(getComputedStyle(GameMap.node).height)/GameMap.mapHeight
	private static mapWidth = 100
	private static mapBackground = "assets/sky.png"
	private static biomes = {
        outside: {
            onGroundBlocksOptions: [
              {
                type: "penetrable",
                backgroundImage: "assets/grass.png"
              }],
            coverBlocksOptions: [
              {
                type: "impenetrable",
                backgroundImage: "assets/ground.png"
              }],
            groundBlocksOptions: [
              {
                type: "impenetrable",
                backgroundImage: "assets/ground-dirt.png"
			}]
        },
        cave: {
            onGroundBlocksOptions: [
              {
                type: "penetrable",
                backgroundImage: "assets/rock.png"
              }],
            coverBlocksOptions: [
              {
                type: "impenetrable",
                backgroundImage: "assets/ground-cave.png"
              }],
            groundBlocksOptions: [
              {
                type: "impenetrable",
                backgroundImage: "assets/ground-rock.png"
              }]
          }
      }
  	private static activeMapFactors = {
      	mapSkyHeight: 6, 
		mapGroundHeight: 3
    }
  	static map: Map
  	static async generate(newMapFragmentLength: number): Promise<Block[]>{
      	const newBlocks: Block[] = []
      	const newBiomeName = Object.keys(GameMap.biomes)[Math.floor(Math.random() * (Object.keys(GameMap.activeMapFactors).length))]
      	for(let newMapFragmentNumber = 0; newMapFragmentNumber<newMapFragmentLength; newMapFragmentNumber++){
          	GameMap.activeMapFactors.mapSkyHeight = Math.floor(Math.random() * 3) + GameMap.activeMapFactors.mapSkyHeight
			GameMap.activeMapFactors.mapGroundHeight = GameMap.mapHeight - GameMap.activeMapFactors.mapSkyHeight
          	for(let i=0; i<GameMap.activeMapFactors.mapSkyHeight; i++){
              	const newBlockOptions: BlockOptions = {
                  	type: "penetrable",
                	backgroundColor: "transparent",
                	size: GameMap.mapBlockSize
                }
              	if(i === (GameMap.activeMapFactors.mapSkyHeight-1)){
                  	if(Math.random() < 0.5){
                      	newBlockOptions.backgroundImage = GameMap.biomes[newBiomeName].onGroundBlocksOptions[Math.floor(Math.random() * GameMap.biomes[newBiomeName].onGroundBlocksOptions.length)]
                    }
                }
              	const newBlock = new Block(newBlockOptions)
              	newBlocks.push(newBlock)
            }
        	for(let i=0; i<GameMap.activeMapFactors.mapGroundHeight; i++){
              	const defaultNewBlockOptions: BlockOptions = {
                  	type: "impenetrable",
                	backgroundColor: "transparent",
                	size: GameMap.mapBlockSize
                }
				if(i === 0){
                  	const newBlockOptions = GameMap.biomes[newBiomeName].coverBlocksOptions[Math.floor(Math.random() * GameMap.biomes[newBiomeName].coverBlocksOptions.length)]
                  	const newBlock = new Block({...defaultNewBlockOptions, ...newBlockOptions})
              		newBlocks.push(newBlock)
                }
              	else{
                  	const newBlockOptions = GameMap.biomes[newBiomeName].groundBlocksOptions[Math.floor(Math.random() * GameMap.biomes[newBiomeName].groundBlocksOptions.length)]
                  	const newBlock = new Block({...defaultNewBlockOptions, ...newBlockOptions})
              		newBlocks.push(newBlock)
                }
              	
            }
        }
      	return newBlocks
    }
  	static async create(): Promise<void>{
  		if(GameMap.map === undefined)
          	throw new Error("Trying to create new map, one has already exist")

      	const newMapOptions: MapOptions = {
          	blocks: await GameMap.generate(GameMap.mapWidth),
        	xStartScroll: 2,
        	yStartScroll: 0,
        	background: `url(${GameMap.mapBackground})`
        }

      	GameMap.map = new Map(newMapOptions)
      	
    }
}
