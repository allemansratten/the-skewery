export enum Ingredient {
  Eggplant = "eggplant",
  Tomato = "tomato",
  Pepper = "pepper",
  Onion = "onion",
}

// I don't know TS that much..
export let Ingredient2Frame = {
  'eggplant': 0,
  'tomato': 1,
  'pepper': 2,
  'onion': 3,
}

// This could be done with some tricky map reduce, but nobody aint got time for that
export let Frame2Ingredient = {
  0: 'eggplant',
  1: 'tomato',
  2: 'pepper',
  3: 'onion',
}