# Fizzi

HI chat :D, This is an interactive 3D landing page and e-commerce experience for a fictional soda brand, built with Next.js (App Router), Three.js / React Three Fiber, GSAP, and Prismic CMS.

---

## Tech Stack & Architecture

### 1. Three.js & React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
* **Purpose**: Real-time 3D rendering directly in the browser via WebGL.
* **Where it's used**:
  * **Global Fixed Canvas (`src/components/ViewCanvas.tsx`)**: Rather than instantiating multiple heavy WebGL canvases across the page, a single fixed Three.js canvas sits behind the content. Individual sections hook into this viewport using Drei's `<View />` component.
  * **3D Soda Can Model (`src/components/SodaCan.tsx`)**: Loads the can mesh (`.gltf`) and applies dynamic PBR materials and high-res label textures mapped to each flavor (Black Cherry, Lemon Lime, Grape, Strawberry Lemonade, Watermelon).
  * **3D Scenes across Slices**:
    * `Hero/Scene.tsx`: Floating hero can with procedural particle bubbles (`Bubbles.tsx`).
    * `SkyDive/Scene.tsx`: Multi-can scene tumbling through simulated clouds.
    * `AlternatingText/Scene.tsx`: Can rotating and traveling across alternating text layouts.
    * `Carousel/`: Interactive flavor showcase rotating cans on user interaction.

### 2. GSAP & ScrollTrigger (`gsap`, `@gsap/react`)
* **Purpose**: Coordinates complex timeline animations and synchronizes 3D element transformations directly with user scroll.
* **Where it's used**:
  * **Scroll-driven Choreography**: In the `Hero`, `SkyDive`, and `AlternatingText` slices, GSAP `ScrollTrigger` pins sections and scrubs the 3D can's position, rotation, and camera FOV based on scroll progress.
  * **Text Reveals (`src/components/TextSplitter.tsx`)**: Splits headline strings into character spans for staggered entrance and reveal animations.
  * **Micro-interactions**: Smooth transitions between carousel slides, flavor changes, and UI button hovers.

### 3. Prismic CMS & Slice Machine (`@prismicio/client`, `@prismicio/next`, `slice-machine-ui`)
* **Purpose**: Headless CMS providing component-driven content management (Slices).
* **Where it's used**:
  * **Slice Architecture (`src/slices/`)**: Each section (`Hero`, `SkyDive`, `AlternatingText`, `BigText`, `Carousel`) is built as an independent slice with its own schema definition (`model.json`).
  * **Dynamic Page Rendering (`src/app/[uid]/page.tsx`)**: Fetches document data via the Prismic client and renders the section tree through `<SliceZone />`. Editors can reorder, add, or edit sections in Prismic without touching code.
  * **Slice Simulator (`src/app/slice-simulator/page.tsx`)**: Local development preview canvas used by Slice Machine UI to iterate on slices with mock data.

### 4. Next.js 14 (App Router) & TypeScript
* **Purpose**: Framework core, server-side data fetching, SEO optimization, and routing.
* **Where it's used**:
  * Server components fetch Prismic page data at build/request time for fast initial load.
  * Dynamic route `[uid]` maps URL slugs directly to Prismic page documents.
  * Client components (`"use client"`) isolate WebGL canvas, GSAP triggers, and interactive state.

### 5. Zustand (`src/hooks/useStore.ts`)
* **Purpose**: Lightweight global state management.
* **Where it's used**:
  * Coordinates the currently selected soda flavor between UI controls (flavor buttons, carousel navigators) and the 3D can textures without prop drilling.

### 6. Tailwind CSS
* **Purpose**: Utility styling and layout.
* **Where it's used**:
  * Responsive layout grids, typography, custom brand color tokens, and overlay positioning over the 3D canvas.
