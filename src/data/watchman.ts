export type WatchmanKind = 'gloves' | 'boots' | 'coat' | 'book' | 'necklace' | 'watch'

export type WatchmanItem = {
  kind: WatchmanKind
  name: string
  wielder: string
  sense: string
  sync: number
  status: string
  ref: string
  weaponClass: string
  blurb: string
}

export const watchmanImage = (kind: WatchmanKind, width: 480 | 960) => `/img/watchman/${kind}-${width}.webp`

export const watchmanItems: WatchmanItem[] = [
  {
    kind: 'gloves',
    name: '3R (Gloves)',
    wielder: 'Rudo',
    sense: 'Touch',
    sync: 88,
    status: 'Active',
    ref: 'R-01',
    weaponClass: 'Restricted',
    blurb: 'Gives "life" to any discarded object, turning it into a temporary Jinki. High risk of contamination beyond safety limits.',
  },
  {
    kind: 'boots',
    name: 'Watchman Boots',
    wielder: 'Amo',
    sense: 'Smell',
    sync: 94,
    status: 'Deployed',
    ref: 'A-42',
    weaponClass: 'Combat Ready',
    blurb: 'Emits scents that trigger memories and powerful sensory illusions.',
  },
  {
    kind: 'coat',
    name: 'Mishra (Coat)',
    wielder: 'Zodyl',
    sense: 'Taste',
    sync: 76,
    status: 'Testing',
    ref: 'Z-89',
    weaponClass: 'Prototype',
    blurb: 'Mutates the user\'s body based on whatever they "consume" — wings, scales, and worse.',
  },
  {
    kind: 'book',
    name: 'Watchman Book',
    wielder: 'Tamsy',
    sense: 'Sight',
    sync: 81,
    status: 'Stolen',
    ref: 'T-13',
    weaponClass: 'Forbidden',
    blurb: 'Alters or rewrites the memories of anyone who looks at its pages.',
  },
  {
    kind: 'necklace',
    name: 'Connect (Necklace)',
    wielder: 'Gountess',
    sense: 'Hearing',
    sync: 69,
    status: 'Linked',
    ref: 'G-07',
    weaponClass: 'Support',
    blurb: 'Links thoughts and feelings; the source of the communication chokers.',
  },
  {
    kind: 'watch',
    name: 'Wristwatch',
    wielder: 'Enjin',
    sense: 'Intuition',
    sync: 97,
    status: 'Sealed',
    ref: 'E-00',
    weaponClass: 'Unknown',
    blurb: 'Recently revealed to manipulate time — or a precognitive "instinct".',
  },
]
