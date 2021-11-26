export default class Vector {
    constructor(vectorOptions) {
        this.x = 0;
        this.y = 0;
        if (vectorOptions.y !== undefined)
            this.y = vectorOptions.y;
        if (vectorOptions.x !== undefined)
            this.x = vectorOptions.x;
        this.player = vectorOptions.player;
    }
    apply(map) {
        if (this.player.getDom() === null)
            throw new Error("Cannot apply new player position to player that have not dom. Use player.render() first");
        const playerPxPosition = this.player.getPosition();
        const mapBlockSize = map.getBlockSize();
        const self = this;
        const gravity = function () {
            let blockAtBottom = map.getBlockAtPxPosition(playerPxPosition.x, playerPxPosition.y - mapBlockSize);
            while (blockAtBottom != null && blockAtBottom.type === "penetrable") {
                playerPxPosition.y -= mapBlockSize;
                self.player.getDom().style.bottom = `-${playerPxPosition.y}px`;
                blockAtBottom = map.getBlockAtPxPosition(playerPxPosition.x, playerPxPosition.y - mapBlockSize);
            }
        };
        const goForward = function () {
            const nextBlock = map.getBlockAtPxPosition(playerPxPosition.x + 1, playerPxPosition.y);
            if (nextBlock.type === "penetrable") {
                playerPxPosition.x++;
                self.player.getDom().style.left = `${playerPxPosition.x}`;
            }
        };
        const goBackward = function () {
            const previousBlock = map.getBlockAtPxPosition(playerPxPosition.x - 1, playerPxPosition.y);
            if (previousBlock.type === "penetrable") {
                playerPxPosition.x--;
                self.player.getDom().style.left = `${playerPxPosition.x}`;
            }
        };
        const jumpTop = function () {
            const blockAtTop = map.getBlockAtPxPosition(playerPxPosition.x, playerPxPosition.y + 1);
            if (blockAtTop.type === "penetrable") {
                playerPxPosition.y++;
                //self.player.getDom().style.left=`${playerPxPosition.y}px`
            }
        };
        if (this.x != 0 && this.y != 0) {
            gravity();
        }
        else if (this.x != 0) {
            if (this.x > 0) {
                for (let i = 0; i < this.x; i++) {
                    goForward();
                    gravity();
                }
            }
            else if (this.x < 0) {
                for (let i = this.x; i < 0; i++) {
                    goBackward();
                    gravity();
                }
            }
        }
        else if (this.y != 0) {
            if (this.y > 0) {
                for (let i = 0; i < this.y; i++) {
                    jumpTop();
                }
                gravity();
            }
        }
        this.player.updatePosition();
    }
}
