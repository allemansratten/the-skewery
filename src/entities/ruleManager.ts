import 'phaser'

import { levels } from '../misc/levels'
import { MainScene } from '../scenes/main'

export class RuleManager {

    scene: MainScene

    curLevel: number = 0
    curRule: number = 0

    ruleText: Array<Phaser.GameObjects.Text> = new Array<Phaser.GameObjects.Text>()
    numberText: Array<Phaser.GameObjects.Text> = new Array<Phaser.GameObjects.Text>()

    constructor(scene: MainScene) {
        this.scene = scene
        let backgroundBoard = scene.add.image(10, 10, 'background_board_dark')
        backgroundBoard.setOrigin(0, 0)
        backgroundBoard.setDisplaySize(250, 380)
        backgroundBoard.setAlpha(0.5)

        for (let i = 0; i < 4; i++) {
            let numberText = scene.add.text(15, 20 + i * 95, '' + (i + 1), { fontFamily: 'Kalam' })
            numberText.setColor('black')
            this.numberText.push(numberText)

            let ruleText = scene.add.text(31, 20 + i * 95, "hello", { fontFamily: 'Kalam' })
            ruleText.setColor('black')
            ruleText.setWordWrapWidth(230)
            this.ruleText.push(ruleText)
        }
        this.updateLevelText()
    }

    public updateLevelText(): void {
        for (let i = 0; i < levels[this.curLevel].rules.length; i++) {
            let rule = levels[this.curLevel].rules[i]
            this.ruleText[i].setText(rule.description)
            if(rule.acceptable(this.scene.foodManager.getArrangement())) {
                this.numberText[i].setColor('green')
                this.ruleText[i].setColor('green')
            } else {
                this.numberText[i].setColor('red')
                this.ruleText[i].setColor('red')
            }
        }
    }
}