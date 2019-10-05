import { Level } from "../rules/level"
import { Rule } from "../rules/rule"
import { RegExpEvent } from "../rules/regExpEvent"


export let levels : Level[] = [
    new Level([
        new Rule(new RegExpEvent("t"), 2, undefined,
            "must have at least two tomatoes"),
        new Rule(new RegExpEvent("tt"), undefined, 0,
            "must not have two consecutive tomatoes"),
    ])
]
