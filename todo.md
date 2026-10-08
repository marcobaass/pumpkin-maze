# Halloween Pumpkin Maze — Implementation Todo

> **Guiding rule:** Make it playable first. Make it beautiful second.
>
> The player controls the board, not the pumpkin.
> Game rules live in [rules.md](rules.md). Design detail lives in [project.md](project.md).
>
> **Physics:** [`cannon-es`](https://github.com/pmndrs/cannon-es). Fixed blockers on the tray → shapes on kinematic `trayBody` + meshes in `trayGroup`. Moving hazards and the pumpkin → separate bodies posed/synced each frame.

Priority order: **Feel → Gameplay → Level design → Interaction → Visual identity → Polish**

---

## Game rules (from rules.md)

### Win

- Collect **all candy**

### Lose

- Pumpkin falls **off the tray**
- Pumpkin falls into a **grave** (hole)
- Pumpkin hits a **ghost** (moving)
- Pumpkin hits a **skeleton** (stationary)

### Items

| Item     | Role              | Physics notes                                                          |
| -------- | ----------------- | ---------------------------------------------------------------------- |
| Pumpkin  | Player ball       | Dynamic sphere body; visual follows body                               |
| Candy    | Collectible       | Trigger / overlap; remove on collect                                   |
| Ghost    | Moving hazard     | Separate kinematic body; patrol in tray-local space; collide = lose    |
| Skeleton | Stationary hazard | Shape on `trayBody` (or static collider glued to tray); collide = lose |
| Candle   | Blocking prop     | Shape on `trayBody` + mesh in `trayGroup`                              |
| Grave    | Hole / fail zone  | Not a solid blocker — gap or sensor; over grave + fall = lose          |

---

## Setup

- [x] Strip Vite starter UI from `src/main.ts` / `index.html`
- [x] Create Three.js scene: renderer, scene, lights, resize, animation loop
- [x] Install `cannon-es`
- [x] Physics world helper (`src/system/physics.ts`): world, gravity, materials, step
- [x] Step world each frame; sync pumpkin body → mesh
- [ ] Lightweight folders as needed (`components/`, `systems/`, `levels/`) — grow only when useful
- [ ] lil-gui for feel tuning (gravity, maxTilt, maxTraySpinSpeed, damping)

---

## Phase 1 — Basic Prototype (Feel)

Goal: tilt → roll feels good. Generic geometry OK.

- [x] Orthographic camera
- [x] Tray mesh + rim walls in `trayGroup`
- [x] Fixed casing (visual)
- [x] Prototype sphere (pumpkin stand-in)
- [x] Mouse tilt with diagonal mapping for isometric view
- [x] Capped tray spin (`angularVelocity`) instead of teleporting rotation
- [x] Compound kinematic `trayBody` (floor + wall shapes)
- [x] Sync tray visual ↔ tray physics after each step
- [x] Contact materials (tray ↔ pumpkin)
- [x] Casing physics so a ball that leaves the tray can bounce off / be contained for fail detection
- [x] Feel gate: counter-steer is reliable; ball does not tunnel on fast tilts (thicken floor if needed)
- [x] change tray tilt based on distance to the center of the tray, not window size
- [ ] Detect “fallen off tray” → lose / reset

**Gate:** mouse → tray tilts → ball rolls with inertia → counter-steer works. Do not theme yet.

---

## Phase 2 — Graves (holes)

Lose if the pumpkin falls into a grave.

- [ ] Grave visuals / hole regions on the tray
- [ ] Detect pumpkin over a grave (sensor, overlap, or floor gap)
- [ ] Allow fall-through / fail when appropriate
- [ ] Reset pumpkin (and clear velocities) after a grave fail

---

## Phase 3 — First maze layout

Small, readable hand-designed board. Primitive geometry + `trayBody` shapes.

- [ ] Inner walls / passages / dead ends as tray shapes + meshes
- [ ] Place graves so momentum management matters
- [ ] Place **candles** as blocking props on `trayBody`
- [ ] Place **skeletons** as stationary lose-on-contact blockers on the tray
- [ ] Keep orthographic readability

---

## Phase 4 — Candy (win condition)

Win = collect all candy (no exit required for v1 unless we add one later).

- [ ] Candy meshes on the board
- [ ] Collection detection (trigger / distance / contact)
- [ ] Remove candy on collect; update counter `CANDY x / y`
- [ ] Risky placements (near graves, skeletons, narrow paths)
- [ ] Win state when `collected === total`

---

## Phase 5 — Ghosts (moving hazards)

Lose on ghost contact. No complex AI in v1.

- [ ] Ghost visual (simple / procedural geometry first)
- [ ] Patrol paths in **tray-local** space
- [ ] Kinematic ghost body updated each frame from tray transform + local path
- [ ] Contact with pumpkin → lose / reset
- [ ] Simple motion animation (bob / drift) synced to patrol

---

## Phase 6 — Game loop

- [ ] Start: pumpkin at spawn, candy count, lives (optional but simple)
- [ ] Fail: off-tray / grave / ghost / skeleton → life lost or restart; reset body state
- [ ] Win: all candy collected
- [ ] Basic HUD: candy, lives, status text
- [ ] Keep fail/recover simple

---

## Phase 7 — Pumpkin model

- [ ] Blender pumpkin → GLB
- [ ] Keep Cannon sphere collider
- [ ] Visual follows physics body (position + roll)

---

## Phase 8 — Halloween look

All listed props remain **blocking** unless explicitly changed later.

- [ ] Theme tray / casing (wood, miniature toy)
- [ ] Skeleton visuals for stationary hazards
- [ ] Ghost visuals for moving hazards
- [ ] Candle visuals (still colliders on `trayBody`)
- [ ] Grave styling
- [ ] Readable ortho composition

---

## Phase 9 — Levels

Several small boards. Only add gimmicks after core rules feel good.

- [ ] Level 1 — intro: few graves, candy, maybe one skeleton
- [ ] Level 2 — denser walls + candles + more graves
- [ ] Level 3 — add ghosts on patrol
- [ ] Level 4 — combine all hazards + riskier candy
- [ ] Level transitions
- [ ] Optional later: extra mechanics (teleports, moving obstacles, etc.)

---

## Phase 10 — Polish

Only after gameplay is solid.

- [ ] Lighting (moonlight + candle warmth), shadows, fog
- [ ] Subtle particles / flame flicker
- [ ] Feel animations (pumpkin, candy, ghosts)
- [ ] Camera / UI transitions (GSAP)
- [ ] Sound + polished HUD / win-lose screens

---

## Explicitly defer early

- Complex ghost AI / chasing
- Procedural levels
- Heavy shaders / huge Blender dioramas
- Multiplayer
- Over-engineered physics beyond tray compound + synced movers
- Hand-rolled physics (stay on `cannon-es`)
