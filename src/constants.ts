import { Season } from "./types";

export const SEASONS: Season[] = [
  {
    id: 1,
    name: "Borneo",
    theme: "The Original",
    location: "Pulau Tiga, Malaysia",
    year: 2000,
    isReturnee: false,
    spoils: [],
    description: "The season that started it all. A social experiment in its purest form."
  },
  {
    id: 2,
    name: "The Australian Outback",
    theme: "Survival",
    location: "Queensland, Australia",
    year: 2001,
    isReturnee: false,
    spoils: [],
    description: "One of the most watched seasons, focusing heavily on the survival aspect."
  },
  {
    id: 3,
    name: "Africa",
    theme: "Survival in the Wild",
    location: "Shaba National Reserve, Kenya",
    year: 2001,
    isReturnee: false,
    spoils: [],
    description: "One of the most grueling seasons physically, with tribes living among dangerous wildlife."
  },
  {
    id: 4,
    name: "Marquesas",
    theme: "The Fall of the Empire",
    location: "Nuku Hiva, Marquesas Islands",
    year: 2002,
    isReturnee: false,
    spoils: [],
    description: "Features the first ever 'Purple Rock' tie-breaker and the debut of Boston Rob."
  },
  {
    id: 6,
    name: "The Amazon",
    theme: "Battle of the Sexes",
    location: "Amazon River, Brazil",
    year: 2003,
    isReturnee: false,
    spoils: [],
    description: "Rob Cesternino's strategic masterclass. The first season to divide tribes by gender."
  },
  {
    id: 7,
    name: "Pearl Islands",
    theme: "Pirates",
    location: "Pearl Islands, Panama",
    year: 2003,
    isReturnee: false,
    spoils: [],
    description: "Widely considered one of the best seasons ever, featuring iconic characters like Rupert and Jonny Fairplay."
  },
  {
    id: 8,
    name: "All-Stars",
    theme: "Returnees",
    location: "Pearl Islands, Panama",
    year: 2004,
    isReturnee: true,
    spoils: [1, 2, 3, 4, 5, 6, 7],
    description: "The first ever returnee season. High stakes and high drama."
  },
  {
    id: 13,
    name: "Cook Islands",
    theme: "Race War (Controversial)",
    location: "Aitutaki, Cook Islands",
    year: 2006,
    isReturnee: false,
    spoils: [],
    description: "Introduced many legends like Parvati, Ozzy, and Yul. Known for its controversial tribe division."
  },
  {
    id: 15,
    name: "China",
    theme: "Culture",
    location: "Zhelin Reservoir, China",
    year: 2007,
    isReturnee: false,
    spoils: [],
    description: "Excellent location and cast. A fan favorite for its unique challenges and cultural integration."
  },
  {
    id: 16,
    name: "Micronesia",
    theme: "Fans vs. Favorites",
    location: "Palau",
    year: 2008,
    isReturnee: true,
    spoils: [7, 9, 12, 13, 14, 15],
    description: "Famous for the 'Black Widow Brigade' and some of the biggest blindsides in history."
  },
  {
    id: 18,
    name: "Tocantins",
    theme: "The Brazilian Highlands",
    location: "Tocantins, Brazil",
    year: 2009,
    isReturnee: false,
    spoils: [],
    description: "Introduced Coach and JT. A classic back-to-basics feel with a great cast."
  },
  {
    id: 19,
    name: "Samoa",
    theme: "Russell Hantz",
    location: "Samoa",
    year: 2009,
    isReturnee: false,
    spoils: [],
    description: "Dominated by the gameplay of Russell Hantz, changing how the game was played forever."
  },
  {
    id: 20,
    name: "Heroes vs. Villains",
    theme: "Legends",
    location: "Samoa",
    year: 2010,
    isReturnee: true,
    spoils: [2, 4, 7, 8, 10, 12, 13, 15, 16, 17, 18, 19],
    description: "Often cited as the greatest season of all time. A clash of the biggest legends."
  },
  {
    id: 25,
    name: "Philippines",
    theme: "Second Chances",
    location: "Caramoan, Philippines",
    year: 2012,
    isReturnee: true,
    spoils: [2, 13, 16, 19],
    description: "Features three returning players who were medically evacuated in previous seasons."
  },
  {
    id: 28,
    name: "Cagayan",
    theme: "Brawn vs. Brains vs. Beauty",
    location: "Cagayan, Philippines",
    year: 2014,
    isReturnee: false,
    spoils: [],
    description: "Incredible cast and chaotic gameplay. Tony Vlachos' debut."
  },
  {
    id: 31,
    name: "Cambodia",
    theme: "Second Chance",
    location: "Koh Rong, Cambodia",
    year: 2015,
    isReturnee: true,
    spoils: [1, 2, 7, 12, 15, 18, 19, 25, 27, 28, 29, 30],
    description: "Cast entirely by fan vote. High-level strategy and 'voting blocks'."
  },
  {
    id: 33,
    name: "Millennials vs. Gen X",
    theme: "Generations",
    location: "Mamanuca Islands, Fiji",
    year: 2016,
    isReturnee: false,
    spoils: [],
    description: "A surprisingly wholesome and strategic season with a very likable cast."
  },
  {
    id: 37,
    name: "David vs. Goliath",
    theme: "Underdogs",
    location: "Mamanuca Islands, Fiji",
    year: 2018,
    isReturnee: false,
    spoils: [],
    description: "A modern masterpiece with perfect editing and a stellar cast."
  },
  {
    id: 40,
    name: "Winners at War",
    theme: "All Winners",
    location: "Mamanuca Islands, Fiji",
    year: 2020,
    isReturnee: true,
    spoils: [3, 4, 7, 8, 11, 13, 16, 20, 22, 23, 24, 25, 27, 28, 29, 31, 32, 33, 34, 35, 36, 37],
    description: "The ultimate showdown. 20 winners return to compete for $2 million."
  },
  {
    id: 42,
    name: "Survivor 42",
    theme: "The New Era Continued",
    location: "Mamanuca Islands, Fiji",
    year: 2022,
    isReturnee: false,
    spoils: [],
    description: "A very high-energy season with a stellar cast and one of the most satisfying winners in recent history."
  },
  {
    id: 44,
    name: "Survivor 44",
    theme: "The Tika Three",
    location: "Mamanuca Islands, Fiji",
    year: 2023,
    isReturnee: false,
    spoils: [],
    description: "Dominated by the 'Tika Three' alliance, featuring some of the most entertaining characters of the New Era."
  },
  {
    id: 45,
    name: "Survivor 45",
    theme: "90-Minute Episodes",
    location: "Mamanuca Islands, Fiji",
    year: 2023,
    isReturnee: false,
    spoils: [],
    description: "The first season with consistent 90-minute episodes, allowing for much deeper character development."
  },
  {
    id: 46,
    name: "Survivor 46",
    theme: "Chaos",
    location: "Mamanuca Islands, Fiji",
    year: 2024,
    isReturnee: false,
    spoils: [],
    description: "Known for its extremely chaotic cast and multiple players going home with idols in their pockets."
  }
];
