const dragonNames = [
  'Smaug',
  'Maleficent',
  'Draco',
  'Falkor',
  'Ryūnosuke Akutagawa',
  'Ancalagon',
  'Kalessin',
  'Rhuagh',
  'Ryath',
  'Shuruga',
  'Flamestrike',
  'Morkeleb',
  'Villentretenmerth',
  'Balerion',
  'Samaranth',
  'Pendragon',
  'Mushu',
  'Toothless',
  'Drogon',
  'Viserion',
  'Rhaegal',
  'Druk',
  'Granymyr',
  'Charizard',
  'Mandragora',
  'Nidhogg',
  'Rorix Bladewing',
  'Blue-Eyes White Dragon',
  'Apalala',
  'Ryūjin',
  'Zirnitra',
  'Grand King Ghidorah',
  'Dulcy',
  'Porunga',
  'Fafnir',
  'Shenron',
  'Trogdor the Burninator',
  'Bahamut',
  'Spyro',
  'Volvagia',
  'Mnementh',
  'Fantus',
  '🐉💧',
  'Alexstrasza',
  'Azure Drake',
  'Black Whelp',
  'Blackwing Corruptor',
  'Bone Drake',
  'Book Wyrm',
  'Carrion Drake',
  'Chillmaw',
  'Chromaggus',
  'Cobalt Scalebane',
  'Coldarra Drake',
  'Deathwing',
  'Deathwing, Dragonlord',
  'Dragon Consort',
  'Dragon Soul',
  'Dragon Spirit',
  'Dragoncaller Alanna',
  'Dragonslayer',
  'Drakonid Operative',
  'Duskbreaker',
  'Ebon Dragonsmith',
  'Emerald Drake',
  'Emeriss',
  'Faerie Dragon',
  'Fire Dragon',
  'Hoarding Dragon',
  'Hungry Dragon',
  'Malygos',
  'Marsh Drake',
  'Midnight Drake',
  'Nefarian',
  'Netherspite Historian',
  'Nightbane Templar',
  'Nightscale Matriarch',
  'Nozdormu',
  'Onyxia',
  'Primordial Drake',
  'Scaled Nightmare',
  'Sindragosa',
  'Sleepy Dragon',
  'Temporus',
  'Twilight Acolyte',
  'Twilight Drake',
  'Twilight Guardian',
  'Twilight Whelp',
  'Volcanic Drake',
  'Whelp',
  'Wrathion',
  'Ysera',
]
const generateDragonName = () => {
  return dragonNames[Math.floor(Math.random() * dragonNames.length)]
}
export {dragonNames, generateDragonName}
