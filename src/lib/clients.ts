/**
 * Client logos for the "trusted by" ticker, pulled from each client's own
 * site project (Desktop/Arrowleaf Marketing/<client>/public) into
 * public/clients/. Shown as one-color white marks on Lapis.
 *
 * `tone` says how to get a clean white mark from the file:
 * - "silhouette": every inked pixel goes white (most logos).
 * - "light": keep the light parts and drop the dark ones (a white logo
 *   printed on a black box, like Auto Blinds).
 * - "threshold": hard black/white split, then flipped (a logo whose letters
 *   are cut out of colored shapes, like EmpowHer Play).
 *
 * `ratio` is width ÷ height of the mark itself, so every logo can be sized by
 * height. `scale` nudges optically small or heavy marks to match the rest.
 */
export type ClientLogo = {
  name: string;
  src: string;
  ratio: number;
  tone?: "silhouette" | "light" | "threshold";
  scale?: number;
};

export const clientLogos: readonly ClientLogo[] = [
  { name: "Bookmark Medical", src: "/clients/bookmark-medical.svg", ratio: 4.55 },
  { name: "Smith Family Medicine", src: "/clients/smith-family-medicine.svg", ratio: 2.18, scale: 1.55 },
  { name: "Sawtooth Fortified", src: "/clients/sawtooth-fortified.png", ratio: 4.67 },
  { name: "Auto Blinds", src: "/clients/auto-blinds.png", ratio: 1, tone: "light", scale: 1.5 },
  { name: "Lone Pine Truss & Building Supply", src: "/clients/lone-pine-truss.svg", ratio: 4.16 },
  { name: "Arcadia Hotel", src: "/clients/arcadia-hotel.png", ratio: 3.48 },
  { name: "American Subcontractors Association of Idaho", src: "/clients/asa-of-idaho.png", ratio: 3.54, scale: 1.25 },
  { name: "Maddyn Homes", src: "/clients/maddyn-homes.webp", ratio: 3.53, scale: 1.15 },
  { name: "New Wave Construction", src: "/clients/new-wave-construction.png", ratio: 5.04 },
  { name: "Noble Aerotech", src: "/clients/noble-aerotech.svg", ratio: 6.82, scale: 0.9 },
  { name: "Clean Space Services", src: "/clients/clean-space.svg", ratio: 3.71 },
  { name: "Car Keys Pro", src: "/clients/car-keys-pro.png", ratio: 11.06, scale: 0.55 },
  { name: "Allegiant Pump Solutions", src: "/clients/allegiant-pump.png", ratio: 3.2, scale: 1.3 },
  { name: "Silvercreek Realty Group", src: "/clients/hailey-powell.png", ratio: 4.78 },
  { name: "Birch Glen Lodge", src: "/clients/birch-glen-lodge.png", ratio: 8, scale: 0.75 },
  { name: "Outwest Creative House", src: "/clients/outwest-creative.svg", ratio: 4.53 },
  { name: "What's Happening Southern Utah", src: "/clients/whats-happening.png", ratio: 2.94 },
  { name: "EmpowHer Play", src: "/clients/empowher-play.png", ratio: 3.32, tone: "threshold" },
  { name: "Cowboy RV Park", src: "/clients/cowboy-rv-park.svg", ratio: 1, scale: 2.1 },
  { name: "Lillian Breeze", src: "/clients/lillian-breeze.svg", ratio: 1.74, scale: 1.4 },
  { name: "Tiffany Wheeler", src: "/clients/tiffany-wheeler.png", ratio: 2.74, scale: 1.45 },
  { name: "Dustin Garr", src: "/clients/dustin-garr.svg", ratio: 1.31, scale: 1.3 },
  { name: "Anyspace Media", src: "/clients/anyspace-media.png", ratio: 1, scale: 1.5 },
  { name: "Aleya Platforms", src: "/clients/aleya-platforms.png", ratio: 2.16, scale: 1.35 },
] as const;
