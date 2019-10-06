import "phaser"
import { Ingredient } from "../misc/ingredient";
import { FoodManager } from '../entities/foodManager'
import { RuleManager } from '../entities/ruleManager'

export class MainScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MainScene"
        });
    }

    foodManager: FoodManager
    ruleManager: RuleManager

    preload() {
        this.load.audio('kebab_music', 'assets/Ralph_Marterie-shish_kebab.mp3');
        this.load.audio('cutting', 'assets/cutting.mp3');
        this.load.audio('squishing', 'assets/squishing.mp3');
        this.load.audio('transfer_vege', 'assets/transfer_vege.mp3');
        this.load.audio('rustling', 'assets/rustling.mp3');
        this.load.audio('put', 'assets/put.mp3');
        this.load.audio('eating', 'assets/eating.mp3');
        
        this.load.image('skewer', 'assets/skewer.png');
        this.load.image('food_spot', 'assets/food_spot.png');
        this.load.image('food_bin', 'assets/food_bin.png');
        this.load.image('background_board', 'assets/background_board.png');
        this.load.image('background_board_dark', 'assets/background_board_dark.png');
        this.load.spritesheet('ingredient', 'assets/ingredient.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ingredient_split', 'assets/ingredient_split.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('ingredient_base', 'assets/ingredient_base.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        this.foodManager = new FoodManager(this)
        this.ruleManager = new RuleManager(this)

        let music = this.sound.add('kebab_music', {
            loop: true,
            volume: 0.5
        });
        // music.play()
    }

    update(time: number, delta: number) {
    }
}