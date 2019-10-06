import 'phaser'

import { levels } from '../misc/levels'
import { MainScene } from '../scenes/main'
import { Rule } from '../rules/rule';
import { Skewer } from './skewer';
import { Ingredient } from '../misc/ingredient';
import { FoodSpot } from './foodSpot';

export class RuleManager {

    scene: MainScene

    curLevel: number = 0
    TOTAL_BOXES: number = 5

    ruleText: Array<Phaser.GameObjects.Text> = new Array<Phaser.GameObjects.Text>()
    numberText: Array<Phaser.GameObjects.Text> = new Array<Phaser.GameObjects.Text>()
    levelText: Phaser.GameObjects.Text

    constructor(scene: MainScene) {
        this.scene = scene
        let backgroundBoard = scene.add.image(0, 0, 'background_board_dark')
        backgroundBoard.setOrigin(0, 0)
        backgroundBoard.setDisplaySize(315, 450)
        backgroundBoard.setAlpha(1)

        for (let i = 0; i < this.TOTAL_BOXES; i++) {
            let numberText = scene.add.text(7, 20 + i * 81, '' + (i + 1), { fontFamily: 'Kalam', color: 'black' })
            this.numberText.push(numberText)

            let ruleText = scene.add.text(23, 20 + i * 81, "", { fontFamily: 'Kalam', color: 'black' })
            ruleText.setWordWrapWidth(285)
            this.ruleText.push(ruleText)
        }

        this.levelText = scene.add.text(840, 340, '', { fontFamily: 'Kalam', color: 'black', fontSize: '3.2em' })

        this.initLevel()
        this.updateProgress()
    }

    private initLevel(): void {
        let reset = () => {
            let level = levels[this.curLevel]
            if (level.skewers == 1) {
                this.scene.foodManager.skewers.push(new Skewer(this.scene, this.scene.foodManager, 315, 140))
            } else {
                this.scene.foodManager.skewers.push(new Skewer(this.scene, this.scene.foodManager, 315, 10))
                this.scene.foodManager.skewers.push(new Skewer(this.scene, this.scene.foodManager, 315, 170))
            }
        }

        if(this.scene.foodManager.skewers.length > 0) {
            if(this.scene.foodManager.skewers.length > 1) {
                this.scene.foodManager.skewers[1].die(() => {})
            }
            let tween = this.scene.foodManager.skewers[0].die(() => {
                reset()
            })
            
            this.scene.foodManager.arrangement = new Array<Array<FoodSpot>>()
            this.scene.foodManager.skewers = new Array<Skewer>()
        } else {
            reset()
        }

    }

    public updateProgress(): void {
        let atLeastOneArrangement = (rule: Rule): boolean => {
            for (let arrangement of this.scene.foodManager.getArrangement()) {
                if (rule.acceptable(arrangement))
                    return true
            }
            return false
        }

        // Compute number of satisfied rules
        let good = 0
        let arrangements = this.scene.foodManager.getArrangement()
        for (let i = 0; i < levels[this.curLevel].rules.length; i++) {
            for (let arrangement of arrangements) {
                if (levels[this.curLevel].rules[i].acceptable(arrangement)) {
                    good += 1
                    break
                }
            }
        }

        if (good == levels[this.curLevel].rules.length) {
            if (this.curLevel == levels.length - 1) {
            } else {
                this.curLevel += 1
                this.initLevel()
            }
        }

        for (let i = 0; i < levels[this.curLevel].rules.length; i++) {
            let rule = levels[this.curLevel].rules[i]
            this.ruleText[i].setText(rule.description)
            if (atLeastOneArrangement(rule)) {
                this.numberText[i].setColor('#119900')
                this.ruleText[i].setColor('#119900')
            } else {
                this.numberText[i].setColor('#AA1111')
                this.ruleText[i].setColor('#AA1111')
            }
        }
        this.levelText.setText((this.curLevel + 1) + '/' + levels.length)
    }
}