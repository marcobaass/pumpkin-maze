# 🎃 Halloween Pumpkin Maze

An interactive Three.js mini-game inspired by classic wooden tilt-maze toys.

The player controls a physical Halloween game board by tilting it. A pumpkin rolls across the board according to gravity and momentum. The goal is to collect all the candy while avoiding holes, obstacles, and moving spiders, then reach the exit.

The visual direction is a **stylized miniature Halloween diorama**, viewed with an orthographic/isometric camera.

The project is intended both as a **Three.js Journey Halloween Challenge** and as a polished Creative Developer portfolio project.

---

## Core Concept

The player does **not control the pumpkin directly**.

Instead:

```text
Mouse movement
      ↓
Tilt the board
      ↓
Gravity changes
      ↓
Pumpkin rolls
      ↓
Player counter-steers
```

This indirect control is the central mechanic.

The challenge should come from managing momentum and anticipating how the pumpkin will move across the board.

### Core objective

🍬 Collect all candy
🕳️ Avoid falling into holes
🪦 Navigate around obstacles
🕷️ Avoid moving spiders
🚪 Reach the exit

---

# Development Philosophy

Build the project incrementally.

Do **not** start by creating the final Halloween environment.

Each iteration should introduce one new technical or gameplay problem while keeping the previous functionality working.

The project should always have a playable state.

The most important question early on is:

> Does tilting the board and rolling the object actually feel good?

Visual polish comes later.

---

# Phase 1 — Basic Prototype

### Goal

Test the fundamental interaction.

Build a completely generic board.

### Elements

- Orthographic camera
- Simple rectangular board
- Simple walls
- Simple sphere
- Gravity
- Mouse-controlled board rotation
- Sphere rolling across the board

No Halloween theme yet.

### Success criteria

The player should be able to:

1. Move the mouse.
2. Tilt the board.
3. See the sphere respond to gravity.
4. Counter-steer the board.
5. Stop the sphere reasonably reliably.

The interaction should feel predictable but have some inertia.

---

# Phase 2 — Holes

Introduce the main failure mechanic.

### Add

- Several holes in the board
- Sphere falling through holes
- Reset after falling

Example:

```text
┌─────────────────────┐
│                     │
│        ●            │
│              ○      │
│                     │
│    ○                │
│                     │
└─────────────────────┘
```

The holes should create situations where the player has to counter-steer and manage momentum.

### Important

Do not make the holes purely visual.

They should have actual gameplay consequences.

---

# Phase 3 — Level Design

Create the first hand-designed maze.

Initially continue using primitive geometry.

Possible elements:

- Walls
- Narrow passages
- Open areas
- Holes
- Dead ends

Focus on gameplay rather than graphics.

### Design goal

A level should be understandable at a glance but require careful control.

Avoid creating huge mazes.

Prefer small, readable puzzle boards.

---

# Phase 4 — Candy 🍬

Introduce the actual objective.

### Add

- Candy collectibles
- Candy animation
- Collection detection
- Candy disappearing when collected
- Candy counter

Example UI:

```text
CANDY 3 / 7
```

The player must collect all candy before the exit becomes active.

### Candy placement

Candy should sometimes be placed in risky locations:

- Near holes
- Behind obstacles
- Near spider patrol paths
- At the end of narrow corridors

This turns collecting candy into a meaningful gameplay decision rather than simply following the safest route.

---

# Phase 5 — Pumpkin 🎃

Replace the prototype sphere with a custom pumpkin model.

The pumpkin will be created in Blender and exported as GLB/GLTF.

### Blender model

Keep the first version relatively simple:

- Rounded pumpkin body
- Slightly irregular shape
- Pumpkin grooves
- Stem
- Optional carved face

The pumpkin does not need a complex rig.

### Important architecture

Separate the **physics object** from the **visual object**.

Conceptually:

```text
Physics

Sphere collider
      ↓
Controls movement/collision


Visual

Pumpkin model
      ↓
Follows physics object
```

This makes the physics easier to manage and allows the pumpkin model to be replaced or modified without changing the gameplay system.

---

# Phase 6 — Halloween Environment 🪦

Replace generic obstacles with Halloween-themed assets.

### Primary environment assets

- Gravestones
- Wooden fences
- Dead trees
- Rocks
- Candles
- Pumpkin decorations
- Spider webs

Gravestones should function as the primary walls/obstacles.

### Art direction

The board should feel like a **physical miniature Halloween toy** rather than a conventional 3D game level.

Possible visual references:

- Wooden board games
- Halloween dioramas
- Miniature graveyards
- Hand-crafted tabletop toys
- Isometric game environments

Keep the overall composition readable from the orthographic camera.

---

# Phase 7 — Moving Spiders 🕷️

Introduce the first moving enemy.

Do not start with complicated AI or character rigging.

## Prototype spider

Build the spider procedurally from simple geometry:

- Body
- Head
- 8 legs
- Simple eyes

The spider does not initially require a Blender rig.

### Movement

Use predefined patrol paths.

Example:

```text
        🪦
        │
    🕷️ → → → 🕷️
        ↑     ↓
        ← ← ←
```

The spider continuously moves along a predefined route.

The player must time the pumpkin's movement to avoid collisions.

### First version

No chasing.

No complex AI.

No navigation system.

Just:

```text
Path
 ↓
Spider moves along path
 ↓
Collision with pumpkin
 ↓
Penalty / reset
```

If the mechanic works well, more sophisticated spider behavior can be added later.

---

# Phase 8 — Game Rules

Once the basic mechanics are working, establish the complete game loop.

## Possible rules

### Start

Player starts with:

- A pumpkin
- A fixed number of lives
- A level containing candy

### During gameplay

The player:

- Tilts the board
- Rolls the pumpkin
- Collects candy
- Avoids holes
- Avoids spiders
- Navigates obstacles

### Completion

Once all candy has been collected:

```text
EXIT UNLOCKED
```

The player must reach the exit.

### Failure

Falling into a hole or colliding with a spider results in a penalty.

Possible implementation:

- Lose one life
- Pumpkin returns to checkpoint
- Level resets

Keep the first implementation simple.

---

# Phase 9 — Level Progression

If the core game is fun, create several small hand-designed levels.

### Level 1 — Pumpkin Patch

Basic movement.

- Simple walls
- Few holes
- Easy candy placement

### Level 2 — Graveyard

Introduce:

- More complex walls
- Narrow passages
- More holes

### Level 3 — Spider Graveyard

Introduce:

- Moving spiders
- Patrol paths
- Risky candy placement

### Level 4 — Haunted Woods

Introduce:

- Trees
- More complex paths
- Multiple hazards

### Level 5 — Witch's Graveyard

Potentially introduce special mechanics.

Examples:

- Teleport holes
- Moving obstacles
- Webs
- Temporary hazards

Only add these if the core game is already polished.

---

# Phase 10 — Visual Polish

Once gameplay is solid, focus heavily on presentation.

## Environment

- Wooden board material
- Stylized Halloween props
- Gravestones
- Pumpkins
- Webs
- Candles
- Trees
- Fog

## Lighting

Possible setup:

- Moonlight / directional light
- Warm candle lights
- Soft ambient lighting
- Strong contact shadows
- Subtle atmospheric fog

The contrast between cool moonlight and warm candlelight could become an important part of the visual identity.

## Atmosphere

Consider:

- Floating dust
- Fog particles
- Small embers
- Fireflies
- Subtle animated vegetation
- Candle flame animation
- Moonlight

Keep effects subtle.

The board and gameplay should remain visually readable.

---

# Animation & Feel

Small details should make the game feel physical.

### Pumpkin

- Rolling rotation
- Slight squash/stretch when hitting obstacles
- Small bounce when collecting candy
- Spin when falling
- Small wobble after collisions

### Candy

- Gentle floating motion
- Slow rotation
- Small bounce when collected

### Spider

- Simple leg movement
- Slight body bob
- Movement synchronized with patrol

### Board

The board itself should have smooth movement.

Avoid directly setting rotation from the mouse.

Instead, use smoothing/interpolation so the board feels like a physical object.

---

# Camera

Use an orthographic camera.

The intended perspective is approximately:

```text
       CAMERA
          ↘
           ↘
      ┌───────────┐
      │  GAME     │
      │  BOARD    │
      └───────────┘
```

The camera should clearly communicate:

- Board boundaries
- Holes
- Obstacles
- Candy
- Spider positions
- Pumpkin position

The player should be able to understand the entire puzzle without constantly rotating the camera.

---

# Technical Architecture

Keep gameplay systems separated.

Possible structure:

```text
src/
├── components/
│   ├── Pumpkin
│   ├── Spider
│   ├── Candy
│   ├── Grave
│   └── Board
│
├── systems/
│   ├── Physics
│   ├── Collision
│   ├── Level
│   ├── Input
│   └── GameState
│
├── levels/
│   ├── level01
│   ├── level02
│   └── level03
│
├── shaders/
│
├── utils/
│
└── main
```

The exact structure can change as implementation develops.

Do not over-engineer the project before the prototype exists.

---

# Physics

The most important technical system is the relationship between:

```text
Input
 ↓
Board rotation
 ↓
Gravity vector
 ↓
Pumpkin acceleration
 ↓
Velocity
 ↓
Position
 ↓
Collision
```

The player should never directly set the pumpkin's position.

The pumpkin should emerge from the physics simulation.

This is central to the game.

---

# Suggested Prototype Strategy

Always keep the current prototype playable.

### Prototype 01

```text
Board
+
Sphere
+
Gravity
+
Mouse tilt
```

### Prototype 02

```text
Prototype 01
+
Holes
+
Reset
```

### Prototype 03

```text
Prototype 02
+
Maze
+
Collision
```

### Prototype 04

```text
Prototype 03
+
Candy
+
Win condition
```

### Prototype 05

```text
Prototype 04
+
Pumpkin model
```

### Prototype 06

```text
Prototype 05
+
Halloween environment
```

### Prototype 07

```text
Prototype 06
+
Moving spider
```

### Prototype 08

```text
Prototype 07
+
Multiple levels
+
Lives
+
UI
```

### Prototype 09

```text
Prototype 08
+
Lighting
+
Particles
+
Sound
+
Animation
+
Polish
```

---

# Technical Priorities

When deciding what to work on next, use this order:

1. **Feel**
2. **Gameplay**
3. **Level design**
4. **Interaction**
5. **Visual identity**
6. **Polish**

Do not spend significant time modeling or shading assets while the core movement still feels wrong.

---

# Things to Avoid Early

Do not start with:

- Complex spider rigging
- Advanced enemy AI
- Procedural level generation
- Complex shaders
- Detailed Blender environments
- Multiplayer
- Large levels
- Complicated UI
- Over-engineered physics architecture

All of these can be added later if the core game works.

---

# Portfolio Goal

The finished project should demonstrate more than "I can make a Halloween scene in Three.js."

It should demonstrate:

- Three.js
- 3D interaction
- Physics
- Input handling
- Orthographic/isometric composition
- 3D asset integration
- Animation
- Collision systems
- Game logic
- Level design
- Visual art direction
- GSAP / smooth transitions
- Lighting and atmosphere

The project should feel like a **small, deliberately designed interactive experience**, not simply a technical demo.

---

# Core Design Principle

Keep returning to this:

> **The player controls the board, not the pumpkin.**

The pumpkin's movement should feel like a consequence of the player's decisions.

The fun comes from:

**Tilt → roll → anticipate → counter-steer → collect → avoid → recover.**

Everything else should support that mechanic.

---

# Current Development Status

## Prototype

- [ ] Orthographic camera
- [ ] Board
- [ ] Sphere
- [ ] Board tilt
- [ ] Gravity
- [ ] Rolling physics
- [ ] Collision

## Gameplay

- [ ] Holes
- [ ] Reset
- [ ] Maze
- [ ] Candy
- [ ] Win condition
- [ ] Exit
- [ ] Lives/checkpoints

## Halloween

- [ ] Pumpkin model
- [ ] Gravestones
- [ ] Fences
- [ ] Trees
- [ ] Candles
- [ ] Spider
- [ ] Webs
- [ ] Halloween environment

## Spiders

- [ ] Simple spider geometry
- [ ] Patrol paths
- [ ] Spider animation
- [ ] Pumpkin collision
- [ ] Penalty/reset

## Polish

- [ ] Lighting
- [ ] Shadows
- [ ] Fog
- [ ] Particles
- [ ] Pumpkin animation
- [ ] Candy animation
- [ ] Spider animation
- [ ] Camera transitions
- [ ] Sound
- [ ] UI
- [ ] Level transitions

---

# Guiding Rule

**Make it playable first. Make it beautiful second.**

If the basic sphere rolling around a gray box is already fun, the final Halloween version has a strong foundation.

If the basic interaction isn't fun, no amount of Halloween assets, shaders, lighting, or post-processing will fix it.
