import { expect } from 'chai'
import 'mocha'

import '../src/rules/regExpEvent'
import { RegExpEvent } from "../src/rules/regExpEvent"
import { Ingredient } from "../src/misc/ingredient"
import { Rule } from "../src/rules/rule"
import { OccurrenceRule } from "../src/rules/occurrenceRule"
import { PalindromeEvent } from "../src/rules/palindromeEvent"
import { CompositeRule } from "../src/rules/compositeRule"

let s = [
    Ingredient.Tomato,
    Ingredient.Onion,
    Ingredient.Tomato,
    Ingredient.Tomato,
    Ingredient.Eggplant,
    Ingredient.Onion
]

describe('RegExpEvent',
    () => {
        it('works with literals', () => {
            let event = new RegExpEvent('t')
            expect(event.count(s)).to.equal(3)
        })
        it('works with +', () => {
            let event = new RegExpEvent('t+')
            expect(event.count(s)).to.equal(2)
        })
        it('works with options', () => {
            let event = new RegExpEvent('[to]')
            expect(event.count(s)).to.equal(5)
        })
        it('works with $', () => {
            let event = new RegExpEvent('e$')
            expect(event.count(s)).to.equal(0)
        })
    })

describe('OccurrenceRule',
    () => {
        it('both bounds, false', () => {
            let rule = new OccurrenceRule(new RegExpEvent('t'), 1, 2)
            expect(rule.acceptable(s)).to.equal(false)
        })
        it('both bounds, true', () => {
            let rule = new OccurrenceRule(new RegExpEvent('t'), 3, 5)
            expect(rule.acceptable(s)).to.equal(true)
        })
        it('only min, false', () => {
            let rule = new OccurrenceRule(new RegExpEvent('t'), 5, undefined)
            expect(rule.acceptable(s)).to.equal(false)
        })
        it('only min, true', () => {
            let rule = new OccurrenceRule(new RegExpEvent('t'), 3, undefined)
            expect(rule.acceptable(s)).to.equal(true)
        })
    })

describe('PalindromeEvent',
    () => {
        it('false', () => {
            let rule = new OccurrenceRule(new PalindromeEvent(), 1, undefined)
            let s = [
                Ingredient.Tomato,
                Ingredient.Onion,
                Ingredient.Tomato,
                Ingredient.Tomato,
            ]
            expect(rule.acceptable(s)).to.equal(false)
        })
        it('true odd', () => {
            let rule = new OccurrenceRule(new PalindromeEvent(), 1, undefined)
            let s = [
                Ingredient.Tomato,
                Ingredient.Onion,
                Ingredient.Tomato,
            ]
            expect(rule.acceptable(s)).to.equal(true)
        })
        it('true even', () => {
            let rule = new OccurrenceRule(new PalindromeEvent(), 1, undefined)
            let s = [
                Ingredient.Tomato,
                Ingredient.Onion,
                Ingredient.Onion,
                Ingredient.Tomato,
            ]
            expect(rule.acceptable(s)).to.equal(true)
        })
    })

describe('CompositeRule',
    () => {
        it('false', () => {
            let rule = new CompositeRule([
                new OccurrenceRule(new RegExpEvent("tt"), 1, undefined),
                new OccurrenceRule(new RegExpEvent("oo"), 1, undefined),
            ])
            expect(rule.acceptable(s)).to.equal(false)
        })
        it('true', () => {
            let rule = new CompositeRule([
                new OccurrenceRule(new RegExpEvent("tt"), 1, undefined),
                new OccurrenceRule(new RegExpEvent("o"), 1, undefined),
            ])
            expect(rule.acceptable(s)).to.equal(true)
        })
    })
