"use strict";
import Map from "/Explorer/src/engine/map.js";
import Block from "/Explorer/src/engine/block.js";
export default class GameMap {
    static async generate(newMapFragmentLength) {
        const newBlocks = [];
        const newBiomeName = Object.keys(GameMap.mapOptions.biomes)[Math.floor(Math.random() * (Object.keys(GameMap.mapOptions).length))];
        const newBiomeOptions = GameMap.mapOptions[newBiomeName];
        for (let newMapFragmentNumber = 0; newMapFragmentNumber < newMapFragmentLength; newMapFragmentNumber++) {
            GameMap.mapOptions.mapSkyHeight = Math.floor(Math.random() * 3) + GameMap.mapOptions.mapSkyHeight;
            for (let i = 0; i < GameMap.mapOptions.mapSkyHeight; i++) {
                const newBlockOptions = {
                    type: "penetrable",
                    backgroundColor: "transparent",
                    size: GameMap.mapOptions.mapBlockSize
                };
                if (i === (GameMap.mapOptions.mapSkyHeight - 1)) {
                    if (Math.random() < 0.5) {
                        newBlockOptions.backgroundImage = GameMap.mapOptions.biomes[newBiomeName].onGroundBlocksOptions[Math.floor(Math.random() * GameMap.mapOptions.biomes[newBiomeName].onGroundBlocksOptions.length)];
                    }
                }
                const newBlock = new Block(newBlockOptions);
                newBlocks.push(newBlock);
            }
            for (let i = 0; i < (GameMap.mapOptions.mapHeight - GameMap.mapOptions.mapSkyHeight); i++) {
                const defaultNewBlockOptions = {
                    type: "penetrable",
                    backgroundColor: "transparent",
                    size: GameMap.mapOptions.mapBlockSize
                };
                if (i === 0) {
                    const newBlockOptions = GameMap.mapOptions.biomes[newBiomeName].coverBlocksOptions[Math.floor(Math.random() * GameMap.mapOptions.biomes[newBiomeName].coverBlocksOptions.length)];
                    const newBlock = new Block(newBlockOptions);
                    newBlocks.push(newBlock);
                }
                else {
                    const newBlockOptions = GameMap.mapOptions.biomes[newBiomeName].groundBlocksOptions[Math.floor(Math.random() * GameMap.mapOptions.biomes[newBiomeName].groundBlocksOptions.length)];
                    const newBlock = new Block(newBlockOptions);
                    newBlocks.push(newBlock);
                }
            }
        }
        return newBlocks;
    }
    static async create() {
        if (GameMap.map !== undefined)
            throw new Error("Trying to create new map, one has already exist");
        const newMapOptions = {
            blocks: GameMap.generate(GameMap.mapOptions.mapWidth),
            xStartScroll: 2,
            yStartScroll: 0,
            background: `url(${(GameMap.mapOptions.mapBackground)})`
        };
        GameMap.map = new Map(newMapOptions);
    }
}
GameMap.node = null;
GameMap.mapHeight = 9;
GameMap.mapBlockSize = parseFloat(getComputedStyle(GameMap.node).height) / GameMap.mapHeight;
GameMap.mapWidth = 100;
GameMap.mapOptions = {
    mapHeight: GameMap.mapHeight,
    mapWidth: GameMap.mapWidth,
    mapSkyHeight: 6,
    mapBlockSize: GameMap.mapBlockSize,
    mapBackground: "assets/sky.jpg",
    biomes: {
        "outside": {
            onGroundBlocksOptions: [
                {
                    type: "penetrable",
                    backgroundImage: "assets/grass.png"
                }
            ],
            coverBlocksOptions: [
                {
                    type: "impenetrable",
                    backgroundImage: "assets/ground.png"
                }
            ],
            groundBlocksOptions: [
                {
                    type: "impenetrable",
                    backgroundImage: "assets/ground-dirt.png"
                }
            ]
        },
        "cave": {
            onGroundBlocksOptions: [
                {
                    type: "penetrable",
                    backgroundImage: "assets/rock.png"
                }
            ],
            coverBlocksOptions: [
                {
                    type: "impenetrable",
                    backgroundImage: "assets/ground-cave.png"
                }
            ],
            groundBlocksOptions: [
                {
                    type: "impenetrable",
                    backgroundImage: "assets/ground-rock.png"
                }
            ]
        },
    }
};
