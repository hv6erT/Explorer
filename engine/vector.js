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
    async apply(map) {
        if (this.player.getDom() === null)
            throw new Error("Cannot apply new player position to player that have not dom. Use player.render() first");
        const playerPxPosition = this.player.getPosition();
        const playerWidth = parseFloat(getComputedStyle(this.player.getDom()).width);
        const playerHeight = parseFloat(getComputedStyle(this.player.getDom()).height);
        const self = this;
        const gravity = async function () {
            let blockAtBottomLeft, blockAtBottomRight;
            do {
                blockAtBottomLeft = map.getBlockAtPxPosition(playerPxPosition.x - (playerWidth / 2) + (playerWidth / 10), playerPxPosition.y + (playerHeight / 2) + 1);
                blockAtBottomRight = map.getBlockAtPxPosition(playerPxPosition.x + (playerWidth / 2) - (playerWidth / 10), playerPxPosition.y + (playerHeight / 2) + 1);
                if (blockAtBottomLeft.type === "penetrable" && blockAtBottomRight.type === "penetrable") {
                    playerPxPosition.y++;
                    self.player.getDom().style.top = `${playerPxPosition.y - (playerHeight / 2)}px`;
                }
                else
                    return;
            } while (blockAtBottomLeft != null && blockAtBottomRight != null);
        };
        const goForward = async function () {
            const nextBlock = map.getBlockAtPxPosition(playerPxPosition.x + (playerWidth / 2) + 1, playerPxPosition.y);
            if (nextBlock.type === "penetrable") {
                playerPxPosition.x++;
                self.player.getDom().style.left = `${playerPxPosition.x - (playerWidth / 2)}px`;
            }
        };
        const goBackward = async function () {
            const previousBlock = map.getBlockAtPxPosition(playerPxPosition.x - (playerWidth / 2) - 1, playerPxPosition.y);
            if (previousBlock.type === "penetrable") {
                playerPxPosition.x--;
                self.player.getDom().style.left = `${playerPxPosition.x - (playerWidth / 2)}px`;
            }
        };
        const jumpTop = async function () {
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
                    gravity();
                    goForward();
                }
                gravity();
            }
            else if (this.x < 0) {
                for (let i = 0; i > this.x; i--) {
                    goBackward();
                    gravity();
                }
                gravity();
            }
        }
        else if (this.y != 0) {
            if (this.y > 0) {
                //jumpTop
                gravity();
            }
        }
        this.player.updatePosition();
    }
}
