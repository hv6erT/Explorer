"use strict"

import Map from "/Explorer/src/engine/map.js"
import {MapOptions} from "/Explorer/src/engine/map.js"

import Block from "/Explorer/src/engine/block.js"
import {BlockOptions} from "/Explorer/src/engine/block.js"

interface Biome{
  	onGroundBlocksOptions: BlockOptions[],
  	coverBlocksOptions: BlockOptions[],
  	groundBlocksOptions: BlockOptions[]
}

export default class GameMap{ 
  	readonly static node = document.getElementById("game-wrapper")
  	private static mapOptions = {
      	mapHeight: 9,
      	mapWidth: parseFloat(getComputedStyle(GameMap.node).width/parseFloat(getComputedStyle(GameMap.node).height)/GameMap.mapOptions.mapHeight),
      	mapSkyHeight: 6,
      	blockSize: parseFloat(getComputedStyle(GameMap.node).height)/GameMap.mapOptions.mapHeight,
      	mapBackground: "assets/sky.jpg",
      	biomes: {
          "outside": {
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
          "cave": {
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
          },
        }
    }
  	static map: Map
  	static async generate(newMapFragmentLength: number){
      	const newBlocks: Block[] = []
      	const newBiomeName = Object.keys(GameMap.mapOptions.biomes)[Math.floor(Math.random() * (Object.keys(GameMap.mapOptions).length))]
      	const newBiomeOptions: Biome = GameMap.mapOptions[newBiomeName]
      	for(let newMapFragmentNumber = 0; newMapFragmentNumber<newMapFragmentLength; newMapFragmentNumber++){
          	GameMap.mapOptions.mapSkyHeight = Math.floor(Math.random() * 3) + GameMap.mapOptions.mapSkyHeight
          	for(let i=0; i<GameMap.mapOptions.mapSkyHeight; i++){
              	const newBlockOptions: BlockOptions = {
                  	type: "penetrable",
                	backgroundColor: "transparent",
                	size: GameMap.mapOptions.blockSize
                }
              	if(i === (GameMap.mapOptions.mapSkyHeight-1)){
                  	if(Math.random() < 0.5){
                      	newBlockOptions.backgroundImage = GameMap.mapOptions.biomes[newBiomeName].onGroundBlocksOptions[Math.floor(Math.random() * GameMap.mapOptions.biomes[newBiomeName].onGroundBlocksOptions.length)]
                    }
                }
              	const newBlock = new Block(newBlockOptions)
              	newBlocks.push(newBlock)
            }
        	for(let i=0; i<(GameMap.mapOptions.mapHeight - GameMap.mapOptions.mapSkyHeight); i++){
              	const defaultNewBlockOptions: BlockOptions = {
                  	type: "penetrable",
                	backgroundColor: "transparent",
                	size: GameMap.mapOptions.blockSize
                }
				if(i === 0){
                  	const newBlockOptions = GameMap.mapOptions.biomes[newBiomeName].coverBlocksOptions[Math.floor(Math.random() * GameMap.mapOptions.biomes[newBiomeName].coverBlocksOptions.length)]
                  	const newBlock = new Block(newBlockOptions)
              		newBlocks.push(newBlock)
                }
              	else{
                  	const newBlockOptions = GameMap.mapOptions.biomes[newBiomeName].groundBlocksOptions[Math.floor(Math.random() * GameMap.mapOptions.biomes[newBiomeName].groundBlocksOptions.length)]
                  	const newBlock = new Block(newBlockOptions)
              		newBlocks.push(newBlock)
                }
              	
            }
        }
      	return newBlocks
    }
  	static async create(){
  		if(GameMap.map !== undefined)
          	throw new Error("Trying to create new map, one has already exist")

      	const newMapOptions: MapOptions = {
          	blocks: GameMap.generate(GameMap.mapOptions.mapWidth),
        	xStartScroll: 2,
        	yStartScroll: 0,
        	background: `url(${(GameMap.mapOptions.mapBackground)})`
        }

      	GameMap.map = new Map(newMapOptions)
      	
    }
}
