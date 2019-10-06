import "phaser"

export class IntroScene extends Phaser.Scene {
    constructor() {
        super({
            key: "IntroScene"
        });
    }

    preload() {
        // this.load.image('background_menu', 'assets/background_menu.png');
    }

    create() {
        const style = { fontFamily: 'Kalam', color: '#CCCCCC' }
        let text0 = this.add.text(350, 150, 'You start with nothing..', style)
        text0.setAlpha(0)
        let text1 = this.add.text(350, 150, '..nothing, except for an empty skewer.', style)
        text1.setAlpha(0)

        this.add.tween({
            targets: text0,
            alpha: 1,
            duration: 500,
        })
        this.add.tween({
            targets: text0,
            alpha: 0,
            delay: 1500,
            duration: 500,
        })
        
        this.add.tween({
            targets: text1,
            alpha: 1,
            delay: 2500,
            duration: 500,
        })
        this.add.tween({
            targets: text1,
            alpha: 0,
            delay: 1500+3000,
            duration: 500,
            onComplete: () => {
                this.game.scene.start('MainScene')
            }
        })
    }
}