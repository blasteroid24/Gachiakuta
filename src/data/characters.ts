export type Character = {
  name: string
  slug: string
  role: string
}

export type CharacterGroup = {
  id: string
  title: string
  characters: Character[]
}

export const charImage = (slug: string) => `/img/chars/${slug}.webp`

export const characterGroups: CharacterGroup[] = [
  {
    id: 'akuta',
    title: "Cleaners' Team Akuta",
    characters: [
      { name: 'Rudo', slug: 'rudo', role: 'The Trash Collector' },
      { name: 'Enjin', slug: 'enjin', role: 'Janitor Squad Leader' },
      { name: 'Zanka Nijiku', slug: 'zanka', role: 'The Iron-Willed Spear' },
      { name: 'Riyo', slug: 'riyo', role: 'The Ripper' },
    ],
  },
  {
    id: 'child',
    title: "Cleaners' Team Child",
    characters: [
      { name: 'Bro', slug: 'bro', role: 'Cleaners Member' },
      { name: 'Dear', slug: 'dear', role: 'Power Parasite' },
      { name: 'Guita', slug: 'guita', role: 'Cleaners Member' },
    ],
  },
  {
    id: 'supporter',
    title: 'Supporter',
    characters: [
      { name: 'Gris', slug: 'gris', role: 'Supporter' },
      { name: 'Tomme', slug: 'tomme', role: 'Supporter' },
    ],
  },
  {
    id: 'cleaners',
    title: 'Other members of the Cleaners',
    characters: [
      { name: 'Corvus', slug: 'corvus', role: 'Head of the Cleaners' },
      { name: 'Semiu', slug: 'semiu', role: 'HQ Receptionist' },
      { name: 'August', slug: 'august', role: 'Cleaners Member' },
      { name: 'Eishia', slug: 'eishia', role: 'Type: Heal' },
      { name: 'Falla', slug: 'falla', role: 'Cleaners Member' },
    ],
  },
  {
    id: 'raiders',
    title: 'The Raiders',
    characters: [
      { name: 'Zodyl', slug: 'zodyl', role: 'Raider Leader' },
      { name: 'Jabber', slug: 'jabber', role: 'Frontline Brawler' },
      { name: 'Cthoni', slug: 'cthoni', role: 'Raider' },
      { name: 'Noerde', slug: 'noerde', role: 'Raider' },
      { name: 'Fu', slug: 'fu', role: 'Raider' },
      { name: 'Bundus', slug: 'bundus', role: 'Heavy Hitter' },
    ],
  },
  {
    id: 'spherite',
    title: 'Spherite',
    characters: [
      { name: 'Regto', slug: 'regto', role: 'Spherite' },
      { name: 'Chiwa', slug: 'chiwa', role: 'Spherite' },
    ],
  },
  {
    id: 'other',
    title: 'Other',
    characters: [
      { name: 'Alice', slug: 'alice', role: 'Other' },
      { name: 'Remlin', slug: 'remlin', role: 'Other' },
      { name: 'Amo', slug: 'amo', role: 'Boots Wielder' },
    ],
  },
]

export type FeaturedCharacter = {
  name: string
  slug: string
  status: string
  title: string
  blurb: string
  accent: 'primary' | 'white'
  /** CSS object-position: these are full-length portraits, so frame the face. */
  focus: string
}

export const featuredCharacters: FeaturedCharacter[] = [
  {
    name: 'Rudo',
    slug: 'rudo-600',
    status: 'ACTIVE',
    title: 'The Trash Collector',
    blurb: 'Falsely accused of murder and thrown into the Pit, Rudo discovers his ability as a Giver—animating any object he values.',
    accent: 'primary',
    focus: 'center 12%',
  },
  {
    name: 'Enjin',
    slug: 'enjin',
    status: 'DEPLOYED',
    title: 'Janitor Squad Leader',
    blurb: 'A veteran Giver who wields Umbreaker, a sword-umbrella Jinki. He rescues Rudo and introduces him to the Cleaners.',
    accent: 'white',
    focus: 'center 45%',
  },
  {
    name: 'Zanka Nijiku',
    slug: 'zanka',
    status: 'ON MISSION',
    title: 'The Iron-Willed Spear',
    blurb: 'A former Hell Guard trainee whose Lovely Assistaff turns a simple stick into a high-density spear.',
    accent: 'primary',
    focus: 'center 40%',
  },
  {
    name: 'Riyo',
    slug: 'riyo',
    status: 'HUNTING',
    title: 'The Ripper',
    blurb: 'A former hitman who lives for high-stakes combat, swinging massive scissors that can also fire projectiles.',
    accent: 'white',
    focus: 'center 38%',
  },
]
