import { Level } from "../rules/level"
import { RegExpEvent } from "../rules/regExpEvent"
import { OccurrenceRule } from "../rules/occurrenceRule"


export let levels: Level[] = [
    // Uvodni, seznami hrace s prvky na obrazovce
    new Level([
        new OccurrenceRule(new RegExpEvent("t"), 1, undefined,
            "must have at least one tomato"),
        new OccurrenceRule(new RegExpEvent("o"), 1, undefined,
            "must have at least one onion"),
    ], 1),
    // Uvodni, rekne hracovi, ze toto bude puzzle hra o špízu
    new Level([
        new OccurrenceRule(new RegExpEvent("t"), 2, undefined,
            "must have at least two tomatoes"),
        new OccurrenceRule(new RegExpEvent("tt"), undefined, 0,
            "must not have two consecutive tomatoes"),
    ], 1),
    // TODO cca 10-15 levelů, podle toho co zvládne Vašek
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
