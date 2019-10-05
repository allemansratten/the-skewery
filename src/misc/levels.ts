import { Level } from "../rules/level"
import { Rule } from "../rules/rule"
import { RegExpEvent } from "../rules/regExpEvent"


export let levels : Level[] = [
    new Level([
        new Rule(new RegExpEvent("t"), 2, undefined),
        new Rule(new RegExpEvent("tt"), undefined, 0),
    ])
]
