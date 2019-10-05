import { Level } from "../rules/level"
import { Rule } from "../rules/rule"
import { RegExpEvent } from "../rules/regExpEvent"
import { OccurrenceRule } from "../rules/occurrenceRule"


export let levels: Level[] = [
    new Level([
        new OccurrenceRule(new RegExpEvent("t"), 2, undefined,
            "must have at least two tomatoes"),
        new OccurrenceRule(new RegExpEvent("tt"), undefined, 0,
            "must not have two consecutive tomatoes"),
    ], 1),
    new Level([
        new OccurrenceRule(new RegExpEvent("e"), 2, undefined,
            "must have at least two lileks"),
        new OccurrenceRule(new RegExpEvent("ee"), undefined, 0,
            "must not have two consecutive lileks"),
    ], 2),
    new Level([
        new OccurrenceRule(new RegExpEvent("o"), 2, undefined,
            "must have at least two cibulas"),
        new OccurrenceRule(new RegExpEvent("oo"), undefined, 0,
            "must not have two consecutive cibulas"),
    ], 1),
]
