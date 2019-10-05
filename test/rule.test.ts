import { expect } from 'chai'
import 'mocha'

import '../src/rules/regExpEvent'
import { RegExpEvent } from "../src/rules/regExpEvent"
import { Ingredient } from "../src/misc/ingredient"
import { OccurrenceRule } from "../src/rules/occurrenceRule"

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
    });
    it('works with +', () => {
      let event = new RegExpEvent('t+')
      expect(event.count(s)).to.equal(2)
    });
    it('works with options', () => {
      let event = new RegExpEvent('[to]')
      expect(event.count(s)).to.equal(5)
    });
    it('works with $', () => {
      let event = new RegExpEvent('e$')
      expect(event.count(s)).to.equal(0)
    });
  })


describe('OccurrenceRule',
  () => {
    it('both bounds, false', () => {
      let rule = new OccurrenceRule(new RegExpEvent('t'), 1, 2)
      expect(rule.acceptable(s)).to.equal(false)
    });
    it('both bounds, true', () => {
      let rule = new OccurrenceRule(new RegExpEvent('t'), 3, 5)
      expect(rule.acceptable(s)).to.equal(true)
    });
    it('only min, false', () => {
      let rule = new OccurrenceRule(new RegExpEvent('t'), 5, undefined)
      expect(rule.acceptable(s)).to.equal(false)
    });
    it('only min, true', () => {
      let rule = new OccurrenceRule(new RegExpEvent('t'), 3, undefined)
      expect(rule.acceptable(s)).to.equal(true)
    });
  })