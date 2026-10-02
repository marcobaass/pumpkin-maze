# Halloween Pumpkin Maze — Implementation Todo

> **Guiding rule:** Make it playable first. Make it beautiful second.
>
> The player controls the board, not the pumpkin.
> Design detail lives in [project.md](project.md).

Priority order: **Feel → Gameplay → Level design → Interaction → Visual identity → Polish**

---

## Setup

Deps (`three`, `gsap`, `lil-gui`) are already installed. Start from the Vite scaffold.

- [x] Strip Vite starter UI from `src/main.ts` / `index.html`
- [x] Create Three.js scene: renderer, scene, lights placeholder, resize handler, animation loop
- [ ] Add a lightweight folder scaffold as needed (`components/`, `systems/`, `levels/`, `utils/`) — do not over-engineer before the prototype exists

---

## Phase 1 — Basic Prototype (Feel)

Goal: test the fundamental tilt → gravity → roll loop with generic geometry. No Halloween theme.

- [x] Orthographic (isometric-style) camera framed on the full board
- [x] Simple rectangular board mesh
- [x] Simple walls around the board
- [ ] Simple sphere as the rolling object
- [ ] Keyboard input that drives board rotation (W, A, S, D)
- [ ] Smooth/interpolate board tilt (do not snap rotation directly from keyboard)
- [ ] Derive gravity vector from board tilt
- [ ] Accelerate sphere from gravity; update velocity and position each frame
- [ ] Sphere–wall collision so the sphere stays on the board
- [ ] Tuning so the player can tilt, counter-steer, and stop the sphere reasonably reliably

**Gate — do not proceed until this feels good:** keyboard move → board tilts → sphere responds with inertia → counter-steer works.

---

## Phase 2 — Holes

Introduce the main failure mechanic. Holes must have real gameplay consequences, not just visuals.

- [ ] Add several holes to the board
- [ ] Detect when the sphere falls into a hole
- [ ] Animate / simulate the sphere falling through
- [ ] Reset the sphere to the start after a fall

---

## Phase 3 — Level Design (First Maze)

First hand-designed maze using primitive geometry. Prefer a small, readable puzzle board.

- [ ] Design one small maze layout (walls, narrow passages, open areas, dead ends, holes)
- [ ] Place holes so the player must manage momentum and counter-steer
- [ ] Verify the level is understandable at a glance from the orthographic camera
- [ ] Keep focusing on control feel, not graphics

---

## Phase 4 — Candy & Objective

Introduce the win path: collect all candy, then reach the exit.

- [ ] Add candy collectibles to the level
- [ ] Collection detection when the sphere touches candy
- [ ] Remove / hide candy on collect
- [ ] Candy counter UI (`CANDY x / y`)
- [ ] Place some candy in risky spots (near holes, behind obstacles, narrow corridors)
- [ ] Add an exit that stays locked until all candy is collected
- [ ] Unlock exit and allow win when the sphere reaches it after full collection

---

## Phase 5 — Pumpkin Model

Replace the prototype sphere with a custom pumpkin. Keep physics separate from visuals.

- [ ] Model a simple pumpkin in Blender (body, grooves, stem; optional carved face)
- [ ] Export as GLB/GLTF and load in Three.js
- [ ] Keep an invisible sphere (or equivalent) as the physics collider
- [ ] Attach the pumpkin visual so it follows the physics object
- [ ] Sync visual rolling rotation with physics velocity

---

## Phase 6 — Halloween Environment

Replace generic obstacles with themed assets. Aim for a miniature Halloween diorama / wooden toy look.

- [ ] Gravestones as primary walls / obstacles
- [ ] Wooden fences
- [ ] Dead trees, rocks, candles, pumpkin decorations, spider webs
- [ ] Wooden board material / board presentation
- [ ] Keep composition readable from the orthographic camera

---

## Phase 7 — Moving Spiders

First moving enemy. No AI, chasing, or complex rigging in v1.

- [ ] Build a procedural spider from simple geometry (body, head, 8 legs, eyes)
- [ ] Define patrol paths for spiders
- [ ] Move spiders continuously along their paths
- [ ] Detect spider–pumpkin collision
- [ ] Apply penalty / reset on collision
- [ ] Add simple leg / body motion synced to patrol movement

---

## Phase 8 — Game Rules & Loop

Establish a complete, simple game loop once mechanics work.

- [ ] Start state: pumpkin, lives, level with candy
- [ ] Fail state: hole or spider → lose a life + checkpoint return or level reset
- [ ] Complete state: all candy collected → exit unlocked → reach exit to win
- [ ] Basic HUD for lives, candy count, and exit status
- [ ] Keep the first fail/recover implementation simple

---

## Phase 9 — Level Progression

Several small hand-designed levels. Only add Level 5 special mechanics after the core is polished.

- [ ] Level 1 — Pumpkin Patch: basic walls, few holes, easy candy
- [ ] Level 2 — Graveyard: denser walls, narrow passages, more holes
- [ ] Level 3 — Spider Graveyard: patrol spiders + risky candy placement
- [ ] Level 4 — Haunted Woods: trees, more complex paths, multiple hazards
- [ ] Level transitions between levels
- [ ] Level 5 — Witch's Graveyard (optional later): teleport holes, moving obstacles, webs, temporary hazards

---

## Phase 10 — Visual Polish

Only after gameplay is solid.

### Environment & lighting

- [ ] Stylized materials for board and props
- [ ] Moonlight directional light + warm candle lights + soft ambient
- [ ] Contact shadows
- [ ] Subtle atmospheric fog

### Atmosphere & particles

- [ ] Floating dust / fog particles
- [ ] Small embers or fireflies
- [ ] Candle flame animation
- [ ] Subtle animated vegetation (keep effects readable)

### Feel animations

- [ ] Pumpkin: squash/stretch on hits, bounce on candy collect, spin when falling, wobble after collisions
- [ ] Candy: gentle float, slow rotation, collect bounce
- [ ] Board tilt smoothing refined
- [ ] Camera transitions (GSAP)

### Audio & UI

- [ ] Sound effects / ambience
- [ ] Polished UI (start, HUD, win/lose, level transitions)

---

## Explicitly defer early

Do not start with these until the core tilt/roll loop and basic gameplay are fun:

- Complex spider rigging or advanced enemy AI
- Procedural level generation
- Complex shaders / detailed Blender environments
- Multiplayer
- Large levels or complicated UI
- Over-engineered physics architecture
