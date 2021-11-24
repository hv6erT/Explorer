"use strict";
import Game from "./game.js";
import Map from "../../engine/map.js";
import Block from "../../engine/block.js";
export default class GameMap extends Game {
    static async generate(newMapFragmentLength) {
        const newBlocks = [];
        const newBiomeName = Object.keys(GameMap.biomes)[Math.floor(Math.random() * (Object.keys(GameMap.activeMapFactors).length))];
        for (let newMapFragmentNumber = 0; newMapFragmentNumber < newMapFragmentLength; newMapFragmentNumber++) {
            const lastGameMapSkyHeight = GameMap.activeMapFactors.mapSkyHeight;
            GameMap.activeMapFactors.mapSkyHeight = Math.floor(Math.random() * 3) + GameMap.activeMapFactors.mapSkyHeight;
            if (GameMap.activeMapFactors.mapSkyHeight <= 0)
                GameMap.activeMapFactors.mapSkyHeight = Math.floor(Math.random() * 3) + lastGameMapSkyHeight - 3;
            else if (GameMap.activeMapFactors.mapSkyHeight >= (GameMap.mapHeight - 1))
                GameMap.activeMapFactors.mapSkyHeight = Math.floor(Math.random() * 3) + lastGameMapSkyHeight - 3;
            GameMap.activeMapFactors.mapGroundHeight = GameMap.mapHeight - GameMap.activeMapFactors.mapSkyHeight;
            for (let i = 0; i < GameMap.activeMapFactors.mapSkyHeight; i++) {
                const newBlockOptions = {
                    type: "penetrable",
                    backgroundColor: "transparent",
                    size: GameMap.blockSize
                };
                if (i === (GameMap.activeMapFactors.mapSkyHeight - 1)) {
                    if (Math.random() < 0.5) {
                        newBlockOptions.backgroundImage = GameMap.biomes[newBiomeName].onGroundBlocksOptions[Math.floor(Math.random() * GameMap.biomes[newBiomeName].onGroundBlocksOptions.length)];
                    }
                }
                const newBlock = new Block(newBlockOptions);
                newBlocks.push(newBlock);
            }
            for (let i = 0; i < GameMap.activeMapFactors.mapGroundHeight; i++) {
                const defaultNewBlockOptions = {
                    type: "impenetrable",
                    backgroundColor: "transparent",
                    size: GameMap.blockSize
                };
                if (i === 0) {
                    const newBlockOptions = GameMap.biomes[newBiomeName].coverBlocksOptions[Math.floor(Math.random() * GameMap.biomes[newBiomeName].coverBlocksOptions.length)];
                    const newBlock = new Block({ ...defaultNewBlockOptions, ...newBlockOptions });
                    newBlocks.push(newBlock);
                }
                else {
                    const newBlockOptions = GameMap.biomes[newBiomeName].groundBlocksOptions[Math.floor(Math.random() * GameMap.biomes[newBiomeName].groundBlocksOptions.length)];
                    const newBlock = new Block({ ...defaultNewBlockOptions, ...newBlockOptions });
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
            blocks: await GameMap.generate(GameMap.mapWidth),
            xStartScroll: 2,
            yStartScroll: 0,
            background: `url(${GameMap.mapBackground})`
        };
        GameMap.map = new Map(newMapOptions);
        GameMap.node.appendChild(GameMap.map.render());
    }
}
GameMap.mapBackground = "assets/sky.png";
GameMap.biomes = {
    outside: {
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
    cave: {
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
    }
};
GameMap.activeMapFactors = {
    mapSkyHeight: 6,
    mapGroundHeight: 3
};
