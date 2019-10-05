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
            numberText.setVisible(false)
            this.numberText.push(numberText)

            let ruleText = scene.add.text(31, 20 + i * 95, "", { fontFamily: 'Kalam' })
            ruleText.setColor('black')
            ruleText.setWordWrapWidth(230)
            ruleText.setVisible(false)
            this.ruleText.push(ruleText)
        }
        this.updateProgress()
    }

    public updateProgress(): void {
        let ok = true
        for (let i = 0; i <= this.curRule; i++) {
            if (!levels[this.curLevel].rules[i].acceptable(this.scene.foodManager.getArrangement())) {
                ok = false
            }
        }

        if (ok) {
            if (this.curRule == levels[this.curLevel].rules.length - 1) {
                console.warn('you aced this level')
            } else {
                this.curRule += 1
            }
        }

        for (let i = 0; i <= this.curRule; i++) {
            this.ruleText[i].setVisible(true)
            this.numberText[i].setVisible(true)

            let rule = levels[this.curLevel].rules[i]
            this.ruleText[i].setText(rule.description)
            if (rule.acceptable(this.scene.foodManager.getArrangement())) {
                this.numberText[i].setColor('green')
                this.ruleText[i].setColor('green')
            } else {
                ok = false
                this.numberText[i].setColor('red')
                this.ruleText[i].setColor('red')
            }
        }

    }
}