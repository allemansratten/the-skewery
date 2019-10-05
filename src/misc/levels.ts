import { Level } from "../rules/level"
import { Rule } from "../rules/rule"
import { RegExpEvent } from "../rules/regExpEvent"


export let levels: Level[] = [
    new Level([
        new Rule(new RegExpEvent("t"), 2, undefined,
            "must have at least two tomatoes"),
        new Rule(new RegExpEvent("tt"), undefined, 0,
            "must not have two consecutive tomatoes"),
    ], 1),
    new Level([
        new Rule(new RegExpEvent("e"), 2, undefined,
            "must have at least two lileks"),
        new Rule(new RegExpEvent("ee"), undefined, 0,
            "must not have two consecutive lileks"),
    ], 2),
    new Level([
        new Rule(new RegExpEvent("o"), 2, undefined,
            "must have at least two cibulas"),
        new Rule(new RegExpEvent("oo"), undefined, 0,
            "must not have two consecutive cibulas"),
    ], 1),
]
