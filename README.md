# 🌍 The Earth — A Scroll-Driven 3D Web Experience

A cinematic, scroll-driven journey around planet Earth rendered in real-time WebGL. Built with React, Three.js, and GSAP to demonstrate scroll-choreographed 3D animation, custom GLSL shaders, and high-performance frontend engineering.

**[Live Site →](#)**&ensp;·&ensp;[Portfolio](https://adityapaswanportfolio.netlify.app/)&ensp;·&ensp;[LinkedIn](https://www.linkedin.com/in/aditya-paswan-a870082a1)

---

## ✨ Features

| Feature | Details |
|---|---|
| **Real-time 3D Globe** | A photorealistic Earth rendered with custom GLSL vertex/fragment shaders — day/night terminator, specular ocean reflections, cloud layer, and atmospheric glow |
| **Scroll Choreography** | Every section drives the camera, globe position, scale, and visual properties through GSAP ScrollTrigger with buttery-smooth Lenis scrolling |
| **Interactive Rotation** | Click-drag to spin the globe on desktop with inertia physics; touch-friendly on mobile |
| **Layer Explorer** | Scroll through Atmosphere → Oceans → Land → Life, each highlighting a different visual property (atmosphere bloom, specular, vegetation tint, city lights) |
| **4.5 Billion Year Journey** | Five geological milestones animate the globe from molten red (reddish shader tint) through oceans, life, and modern civilisation |
| **Live Population Counter** | A real-time ticking counter based on UN World Population Prospects 2024 data (~2.3 people/second net growth) |
| **Custom Cursor** | Precise dot + lagging ring cursor that reacts to drags, hovers, and interactive elements (desktop only) |
| **Home Location Pin** | A 3D map pin that appears on the globe in the CTA section, positioned at the configured lat/lon coordinates |
| **Glassmorphism UI** | Frosted-glass navigation bar and panels with backdrop blur, subtle borders, and responsive layouts |
| **Reduced Motion** | Respects `prefers-reduced-motion` — disables smooth scrolling, drag inertia, and cloud rotation while keeping ambient planetary spin |
| **Mobile Optimised** | Lower geometry segments, reduced star count, adapted DPR, and responsive layouts for performant mobile rendering |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev) + [TypeScript 6](https://www.typescriptlang.org/) |
| **Build** | [Vite 8](https://vite.dev) |
| **3D Rendering** | [Three.js](https://threejs.org/) via [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei) |
| **Shaders** | Custom GLSL (day/night blending, specular masking, colour tinting) |
| **Scroll Animation** | [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) with a custom colour palette and typography |
| **Fonts** | [Fraunces](https://fonts.google.com/specimen/Fraunces) (display) · [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) (body) |
| **Linting** | [Oxlint](https://oxc.rs/) |

---

## 📂 Project Structure

```
The-Earth/
├── public/
│   ├── textures/            # NASA Earth textures (day, night, clouds, specular, normal)
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── three/               # WebGL / Three.js layer
│   │   ├── Earth.tsx         # Globe mesh, GLSL shaders, per-frame choreography
│   │   ├── Atmosphere.tsx    # Animated atmosphere glow shell
│   │   ├── Scene.tsx         # Canvas, lighting, starfield, drag handlers
│   │   ├── choreography.ts   # Per-section camera/shader targets & layer/journey states
│   │   └── latLon.ts         # Lat/lon → 3D vector/Euler math
│   ├── sections/             # Page sections (Hero, Why, Layers, Journey, Facts, FAQ, About, CTA, Footer, Nav)
│   ├── components/           # Reusable UI (Button, Pill, Accordion, CustomCursor)
│   ├── hooks/                # Custom hooks (useIsMobile, useLivePopulation, useReducedMotion)
│   ├── state/                # Lightweight pub-sub scroll state (no Redux/Zustand)
│   ├── content/              # All copy, section data, and link config
│   ├── site.config.ts        # Name, social links, home location coordinates
│   ├── App.tsx               # Root: scroll triggers, Lenis init, section composition
│   ├── App.css               # Global CSS (glass panels, gradients, animations)
│   └── index.css             # Tailwind directives, base resets
├── index.html                # Entry point with SEO meta, OG tags, font preloads
├── tailwind.config.js        # Custom colour palette & typography
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 10

### Install & Run

```bash
# Clone the repository
git clone https://github.com/adityapaswan568/The-Earth.git
cd The-Earth

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in a Chromium-based browser for the best WebGL experience.

### Build for Production

```bash
npm run build     # Type-checks with tsc, then bundles with Vite
npm run preview   # Preview the production build locally
```

---

## ⚙️ Configuration

All personal info and coordinates live in [`src/site.config.ts`](src/site.config.ts):

```ts
export const siteConfig = {
  name: "Aditya Paswan",
  portfolio: "https://adityapaswanportfolio.netlify.app/",
  github: "https://github.com/adityapaswan568",
  linkedin: "https://www.linkedin.com/in/aditya-paswan-a870082a1",
  homeLocation: { lat: 25.32, lon: 82.99, city: "Varanasi" },
};
```

The home location drives both the CTA section's map pin on the globe and the coordinate display in the UI.

---

## 🎨 Design System

The Tailwind config defines a custom colour palette inspired by Earth from orbit:

| Token | Hex | Use |
|---|---|---|
| `deep-ocean` | `#06182B` | Page background |
| `abyss` | `#030D18` | Deepest dark |
| `atmosphere` | `#5BB0F0` | Accent / interactive elements |
| `cloud` | `#EAF1F6` | Primary text |
| `mist` | `#9FB4C6` | Secondary text |
| `continent` | `#C9A45C` | Land accent |
| `canopy` | `#4E9A6B` | Life / vegetation accent |
| `glass` | `rgba(234,241,246,0.06)` | Glass panel backgrounds |

---

## 🌐 How the 3D Choreography Works

1. **GSAP ScrollTrigger** tracks which section is in the viewport and reports per-section scroll progress.
2. A [`choreography.ts`](src/three/choreography.ts) lookup table maps each section to target values: globe X-position, scale, camera distance, shader uniforms (dim level, night boost, specular, green tint, reddish tint), atmosphere strength, and cloud opacity.
3. On every animation frame, [`Earth.tsx`](src/three/Earth.tsx) lerps all current values toward the active target, creating smooth, continuous transitions as you scroll between sections.
4. **Layers** and **Journey** sections have sub-states that further modify shader uniforms — cycling through atmosphere/ocean/land/life highlights and formation/ocean/life/oxygen/human geological eras.

---

## 🙏 Credits

- **Earth Textures** — [NASA Visible Earth](https://visibleearth.nasa.gov/) & [Solar System Scope](https://www.solarsystemscope.com/textures/) (CC BY 4.0)
- **Planetary Facts** — [NASA](https://www.nasa.gov/)
- **Population Data** — UN World Population Prospects 2024 revision

---

## 📄 License

This project is open source. See [LICENSE](LICENSE) for details.

---

<p align="center">
  Built with 💙 by <a href="https://github.com/adityapaswan568">Aditya Paswan</a>
</p>
