import "phaser"

export class OutroScene extends Phaser.Scene {
    constructor() {
        super({
            key: "OutroScene"
        });
    }

    bouncers: Array<Phaser.GameObjects.Sprite> = new Array<Phaser.GameObjects.Sprite>()

    preload() {
        this.load.spritesheet('ingredient', 'assets/ingredient.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        let transitionRectangle = this.add.rectangle(0, 0, 900, 400, 0x000000)
        transitionRectangle.setOrigin(0, 0)
        transitionRectangle.setDepth(1000)
        this.add.tween({
            targets: transitionRectangle,
            alpha: 0,
            duration: 200,
            onComplete: () => {
                transitionRectangle.destroy(true)
            }
        })


        const style = { fontFamily: 'Kalam', color: '#CCCCCC' }
        let text0 = this.add.text(80, 330, '      Vilda\n(programming)\n    (chef)', style)
        let text1 = this.add.text(310, 330, '      Vašek\n   (content)\n(programming)', style)
        let text2 = this.add.text(550, 330, '     Jirka\n(programming)\n   (sound)', style)
        let text3 = this.add.text(750, 330, '   Bety\n(graphics)\n  (jokes)', style)

        let animBouncer = (i: number) => {
            const BOUNCE_TIME = 500
            const UP_Y = 100
            const DOWN_Y = 300
            let ingredient = this.add.sprite(-i * 200, DOWN_Y, 'ingredient', i % 4)

            // permanent rotation
            this.add.tween({
                targets: ingredient,
                rotation: 7 * Math.PI * 2,
                duration: 10000,
            })

            return ingredient
        }

        for (let i = 0; i < 8; i++) {
            this.bouncers.push(animBouncer(i))
        }
    }

    update(time: number, delta: number) {
        const SPEED_X = 0.18
        const RANGE_Y = 100
        const SPEED_Y = 0.025

        let ok = true
        for (let i = 0; i < this.bouncers.length; i++) {
            let bouncer = this.bouncers[i]
            let x = bouncer.getCenter().x
            let y = bouncer.getCenter().y
            x += delta * SPEED_X
            y = Math.sin(x * SPEED_Y) * RANGE_Y
            bouncer.setPosition(x, y + 200)
            if (x > 1000) {
                bouncer.destroy(true)
            } else {
                ok = false
            }
        }
        // all is dead
        if (ok) {
            let transitionRectangle = this.add.rectangle(0, 0, 900, 400, 0x000000)
            transitionRectangle.setOrigin(0, 0)
            transitionRectangle.setDepth(1000)
            this.add.tween({
                targets: transitionRectangle,
                alpha: 0,
                duration: 500,
                onComplete: () => {
                    window.location.reload();
                }
            })
        }
    }
}