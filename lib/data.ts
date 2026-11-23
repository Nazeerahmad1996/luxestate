const u = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=800&q=85`;

export const THUMB = u('1600607687939-ce8a6c25118c');

export const PROPS = [
  {
    name: 'The Royal Penthouse',
    sub: 'Palm Jumeirah, Dubai',
    price: '$8,900,000',
    tags: ['5 Beds', '6 Baths', '7,400 sqft', 'Infinity Pool'],
    img: u('1613490493576-7fde63acd811'),
  },
  {
    name: 'Bulgari Bay Villa',
    sub: 'Jumeira Bay Island, Dubai',
    price: '$14,500,000',
    tags: ['6 Beds', '8 Baths', '11,200 sqft', 'Private Berth'],
    img: u('1600585154340-be6161a56a0c'),
  },
  {
    name: 'Downtown Sky Mansion',
    sub: 'Downtown, Dubai',
    price: '$6,200,000',
    tags: ['4 Beds', '5 Baths', '5,100 sqft', 'Burj View'],
    img: u('1600596542815-ffad4c1539a9'),
  },
  {
    name: 'Emirates Hills Haven',
    sub: 'Emirates Hills, Dubai',
    price: '$12,800,000',
    tags: ['7 Beds', '9 Baths', '13,500 sqft', 'Golf Course'],
    img: u('1512917774080-9991f1c4c750'),
  },
];

