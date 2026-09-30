import { siteConfig } from '../site.config';

export const content = {
  meta: {
    title: "Earth — Our Home, Seen From Orbit",
    description:
      "A scroll-driven 3D journey around planet Earth. Explore what makes it special, its layers, and 4.5 billion years of history.",
  },
  nav: [
    { label: "Why", href: "#why" },
    { label: "Layers", href: "#layers" },
    { label: "Journey", href: "#journey" },
    { label: "Facts", href: "#facts" },
    { label: "FAQ", href: "#faq" },
  ],
  hero: {
    headline: "Our home. The only one we know of.",
    subtext:
      "A slow spin around the one planet we know that supports life.",
    button: "Explore Earth",
    statNumber: "~8 Billion",
    stat: "About 8 billion people. One planet.",
    scrollHint: "Scroll to travel",
  },
  why: {
    heading: "Why this planet is different.",
    points: [
      {
        title: "Liquid water.",
        text: "About 71% of the surface is ocean. Water in liquid form is essential to every form of life we know.",
      },
      {
        title: "A protective shield.",
        text: "The atmosphere and magnetic field help shield the surface from harmful solar radiation and keep temperatures livable.",
      },
      {
        title: "Life, everywhere.",
        text: "Earth is the only place known to host life, from deep-sea vents to mountain peaks.",
      },
    ],
  },
  layers: {
    heading: "Four layers, one planet.",
    intro: "Scroll or select to examine each layer.",
    items: [
      {
        id: "atmosphere",
        name: "Atmosphere",
        accent: "text-atmosphere",
        text: "A thin gas layer, mostly nitrogen (about 78%) and oxygen (about 21%). It holds the air we breathe and moves heat around the planet.",
      },
      {
        id: "oceans",
        name: "Oceans",
        accent: "text-blue-400",
        text: "Water covers most of the surface. Currents carry heat and shape climate worldwide.",
      },
      {
        id: "land",
        name: "Land",
        accent: "text-continent",
        text: "Continents rise from the crust and keep slowly moving, a few centimeters a year, driven by plate tectonics.",
      },
      {
        id: "life",
        name: "Life",
        accent: "text-canopy",
        text: "From microbes to forests to cities. At night, city lights show where people live.",
      },
    ],
  },
  journey: {
    heading: "4.5 billion years, five moments.",
    steps: [
      {
        number: "01",
        title: "Formation",
        subtitle: "About 4.5 billion years ago",
        desc: "Dust and rock gather around the young Sun and form a molten, incandescent planet.",
      },
      {
        number: "02",
        title: "Oceans",
        subtitle: "Over 4 billion years ago",
        desc: "Earth cools. Water vapor condenses and collects on the surface, birthing the first primordial oceans.",
      },
      {
        number: "03",
        title: "First life",
        subtitle: "At least 3.5 billion years ago",
        desc: "Single-celled anaerobic organisms emerge in geothermal waters, beginning biological evolution.",
      },
      {
        number: "04",
        title: "Oxygen",
        subtitle: "About 2.4 billion years ago",
        desc: "Photosynthesizing cyanobacteria flood the atmosphere with oxygen during the Great Oxidation Event.",
      },
      {
        number: "05",
        title: "Humans",
        subtitle: "About 300,000 years ago",
        desc: "Modern humans appear. All of recorded civilizations, cities, and spaceflight fit in this final breath.",
      },
    ],
  },
  facts: {
    heading: "What the view from orbit tells you.",
    items: [
      {
        title: "Thin, and it shows.",
        text: "About 99% of the atmosphere's mass sits within roughly 30 km of the surface. From orbit it looks like a fragile blue pencil stroke.",
      },
      {
        title: "A lap every 90 minutes.",
        text: "The International Space Station orbits about 400 km up and circles Earth roughly every 90 minutes, giving astronauts sixteen sunrises every day.",
      },
      {
        title: "Not a perfect sphere.",
        text: "Earth bulges slightly at the equator due to planetary rotation. It is about 42 km wider across the equator than from pole to pole.",
      },
    ],
  },
  faq: [
    {
      q: "How old is Earth?",
      a: "About 4.54 billion years old, based on radiometric dating of meteorites and the oldest known terrestrial and lunar rock samples.",
    },
    {
      q: "Why is it called the Blue Marble?",
      a: "A famous 1972 photograph of the illuminated Earth captured by the Apollo 17 crew showed a brilliant blue, cloud-swirled sphere, and the moniker stuck.",
    },
    {
      q: "Why does Earth have seasons?",
      a: "Earth's rotational axis is tilted about 23.4 degrees relative to its orbital plane. As it travels around the Sun, hemispheres tilt toward or away from direct sunlight.",
    },
    {
      q: "How long is a year?",
      a: "About 365.25 days. That quarter-day difference is reconciled by adding a leap day every four years in our calendar system.",
    },
    {
      q: "How was this website built?",
      a: "Engineered with React, Three.js (@react-three/fiber), and GSAP. The 3D globe renders in real-time in WebGL using authentic NASA and open-licensed planetary textures.",
    },
  ],
  about: {
    heading: `Built by ${siteConfig.name}.`,
    body: "I'm a software developer passionate about crafting web experiences that are visually breathtaking and rigorously architected underneath. This project demonstrates scroll-driven 3D choreography, WebGL shaders, and high-performance frontend engineering.",
    links: [
      { label: "GitHub", href: siteConfig.github },
    ],
  },
  cta: {
    heading: "Let's work together",
    text: "I'm always open to new opportunities, collaborations, and interesting challenges.",
    buttons: [
      { label: "View Portfolio", link: siteConfig.portfolio, primary: true },
      { label: "Connect on LinkedIn", link: siteConfig.linkedin, primary: false },
    ],
    note: "Currently available for freelance & full-time roles.",
  },
  footer: {
    left: `Earth — a 3D web experience by ${siteConfig.name}.`,
    links: [
      { label: "Why", href: "#why" },
      { label: "Layers", href: "#layers" },
      { label: "Journey", href: "#journey" },
      { label: "FAQ", href: "#faq" },
    ],
    credits:
      "Earth textures: NASA Visible Earth & Solar System Scope (CC BY 4.0). Planetary facts: NASA.",
    year: 2026,
  },
  micro: {
    loading: "Loading Earth…",
    noWebGL: "Your browser can't show the 3D view. Here's a picture of Earth instead.",
    reducedMotion: "Animation is reduced to match your device settings.",
  },
};

