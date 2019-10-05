import 'phaser'

class Vector2 extends Phaser.Math.Vector2 { }
class Image extends Phaser.GameObjects.Image { }
class Circle extends Phaser.GameObjects.Arc { }

export class BallManager {

    scene: Phaser.Scene
    block: Image
    ball: Circle

    constructor(scene: Phaser.Scene) {
        this.scene = scene
        
        let addBlock = (x: number, y: number): Image => {
            let object = scene.add.image(x, y, 'block')
            object.setDisplaySize(20, 20)
            return object
        }

        let addBall = (x: number, y: number, r: number): Circle => {
            let object = scene.add.circle(x, y, r, 0xff0000)
            return object
        }

        this.block = addBlock(400, 100);
        this.ball = addBall(500, 100, 20);
    }

    update(time: number, delta: number) {
        this.ball.setPosition(this.ball.getCenter().x, this.ball.getCenter().y+delta*0.1)
    }
}