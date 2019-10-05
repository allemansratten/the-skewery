import { expect } from 'chai'
import 'mocha'

import '../src/rules/regExpEvent'
import { RegExpEvent } from "../src/rules/regExpEvent"
import { Ingredient } from "../src/misc/ingredient"

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
