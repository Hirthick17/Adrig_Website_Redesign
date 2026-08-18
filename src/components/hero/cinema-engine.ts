/* =============================================================================
   ADRIG — Industry City cinema engine
   -----------------------------------------------------------------------------
   Ported as-is from the approved hero.html / assets/adrig-hero/cinema.js.
   Not a video, not WebGL: an authored 3D city with a real perspective camera,
   rendered to a 2D canvas, where `t` (0..1) is the timeline. Every building is
   drawn from coordinates — nothing generated, so nothing to go wrong.

   Eight industry districts on a city grid, the ADRIG tower at the centre, data
   arcs carrying packets between the tower and every district.

   Design language: white massing, 1px precision edges, one blue. Depth comes
   from perspective and atmospheric fade — never glow. The math below is
   untouched from the validated original; only the module wrapper changed
   (IIFE-on-window → ES class) so it can be driven by an autoplay clock
   instead of scroll position.
   ============================================================================= */

type V3 = { x: number; y: number; z: number };
type Prim = {
  k: 0 | 1 | 2 | 3 | 4;
  p: V3[];
  f?: string | null;
  s?: string | null;
  w?: number;
  r?: number;
  t?: string;
  sz?: number;
  /** top/bottom rgb triples ("r,g,b") for a soft per-face light gradient, in place of a flat fill. */
  grad?: [string, string];
  _sp?: { x: number; y: number; z: number; s: number }[];
  _z?: number;
};
type District = { x: number; z: number; label: string; type: string; rise: number };
type CamFrame = { eye: V3; tgt: V3; fov: number };

function V(x: number, y: number, z: number): V3 {
  return { x, y, z };
}
function sub(a: V3, b: V3): V3 {
  return V(a.x - b.x, a.y - b.y, a.z - b.z);
}
function dot(a: V3, b: V3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}
function cross(a: V3, b: V3): V3 {
  return V(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
}
function norm(a: V3): V3 {
  const l = Math.sqrt(dot(a, a)) || 1;
  return V(a.x / l, a.y / l, a.z / l);
}
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
function lerpV(a: V3, b: V3, t: number): V3 {
  return V(lerp(a.x, b.x, t), lerp(a.y, b.y, t), lerp(a.z, b.z, t));
}
function clamp(v: number, a: number, b: number): number {
  return v < a ? a : v > b ? b : v;
}
function range(t: number, a: number, b: number): number {
  return clamp((t - a) / (b - a), 0, 1);
}
function ease(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}
function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

const BG = "#F7F9FC";
const INK = "11,18,32";
const BLUE = "14,92,238";
const BLUEL = "91,145,245";
function rgba(c: string, a: number): string {
  return "rgba(" + c + "," + (a < 0 ? 0 : a > 1 ? 1 : a).toFixed(3) + ")";
}
/** Lightens ("+" delta) or darkens a "r,g,b" triple toward white/black by `delta` (0..1). */
function shade(c: string, delta: number): string {
  const [r, g, b] = c.split(",").map(Number);
  const target = delta >= 0 ? 255 : 0;
  const k = Math.abs(delta);
  const mix = (v: number) => Math.round(v + (target - v) * k);
  return mix(r) + "," + mix(g) + "," + mix(b);
}

const PATH: { t: number; eye: V3; tgt: V3; fov: number }[] = [
  { t: 0.0, eye: V(0, 128, 340), tgt: V(0, 8, 0), fov: 33 },
  { t: 0.13, eye: V(-12, 84, 226), tgt: V(0, 14, 0), fov: 37 },
  { t: 0.34, eye: V(-116, 66, 146), tgt: V(-14, 24, 0), fov: 46 },
  { t: 0.5, eye: V(92, 52, 104), tgt: V(0, 30, 0), fov: 48 },
  { t: 0.63, eye: V(-80, 46, 92), tgt: V(0, 32, 0), fov: 48 },
  { t: 0.79, eye: V(-46, 62, 152), tgt: V(0, 22, 0), fov: 42 },
  { t: 1.0, eye: V(12, 76, 202), tgt: V(0, 18, 0), fov: 38 },
];

function camAt(t: number): CamFrame {
  let i = 0;
  while (i < PATH.length - 2 && t > PATH[i + 1].t) i++;
  const a = PATH[i],
    b = PATH[i + 1];
  const k = ease(range(t, a.t, b.t));
  return { eye: lerpV(a.eye, b.eye, k), tgt: lerpV(a.tgt, b.tgt, k), fov: lerp(a.fov, b.fov, k) };
}

const S = 62;
/* Transport folded into Logistics as one department (the warehouse district
   now carries its own delivery truck) — the (0,S) grid parcel that used to
   hold the separate terminal building is left as open pavement. */
const DISTRICTS: District[] = [
  { x: -S, z: -S, label: "HEALTHCARE", type: "hospital", rise: 0.1 },
  { x: 0, z: -S, label: "FINANCE", type: "bank", rise: 0.13 },
  { x: S, z: -S, label: "DATA & CLOUD", type: "data", rise: 0.16 },
  { x: -S, z: 0, label: "MANUFACTURING", type: "factory", rise: 0.19 },
  { x: S, z: 0, label: "RETAIL", type: "retail", rise: 0.22 },
  { x: -S, z: S, label: "LOGISTICS & TRANSPORT", type: "warehouse", rise: 0.25 },
  { x: S, z: S, label: "ENERGY", type: "energy", rise: 0.31 },
];

function fog(z: number, a: number): number {
  return a * clamp(1 - (z - 250) / 700, 0.5, 1);
}

/** The same arced route every data-flow line and message bubble travels — one district, one curve. */
export function arcPoint(districtIndex: number, u: number): V3 {
  const Dt = DISTRICTS[districtIndex];
  const arc = 34 + (districtIndex % 3) * 7;
  const yy = lerp(44, 20, u) + Math.sin(u * Math.PI) * arc;
  return V(lerp(0, Dt.x, u), yy, lerp(0, Dt.z, u));
}

export function districtCount(): number {
  return DISTRICTS.length;
}
export function districtLabel(i: number): string {
  return DISTRICTS[i].label;
}

const FN: V3[] = [V(0, -1, 0), V(0, 1, 0), V(0, 0, -1), V(0, 0, 1), V(-1, 0, 0), V(1, 0, 0)];
const FT: number[][] = [
  [0, 1, 5, 4],
  [3, 2, 6, 7],
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [0, 4, 7, 3],
  [1, 5, 6, 2],
];

const FACE_SHADE = [
  /* bottom */ "148,162,188",
  /* top    */ "252,254,255",
  /* front  */ "210,220,238",
  /* back   */ "172,184,206",
  /* left   */ "185,197,218",
  /* right  */ "165,178,202",
];

export class Cinema {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  t = 0;
  labels: Record<string, { x: number; y: number; vis: boolean; s: number }> = {};
  private _prims: Prim[] = [];
  private _onResize: () => void;
  private _ro?: ResizeObserver;
  W = 0;
  H = 0;
  dpr = 1;
  cssW = 0;
  cssH = 0;
  private _cw = 0;
  private _ch = 0;
  eye: V3 = V(0, 0, 0);
  fwd: V3 = V(0, 0, -1);
  right: V3 = V(1, 0, 0);
  up: V3 = V(0, 1, 0);
  focal = 1;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) throw new Error("2D canvas context unavailable");
    this.ctx = ctx;
    this._onResize = this.resize.bind(this);
    window.addEventListener("resize", this._onResize, { passive: true });
    if (window.ResizeObserver) {
      this._ro = new ResizeObserver(this._onResize);
      this._ro.observe(canvas);
    }
    this.resize();
  }

  resize(): void {
    const r = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(r.width * dpr));
    const h = Math.max(1, Math.round(r.height * dpr));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    this.W = w;
    this.H = h;
    this.dpr = dpr;
    this.cssW = r.width;
    this.cssH = r.height;
    this._cw = this.canvas.clientWidth;
    this._ch = this.canvas.clientHeight;
    this.render(this.t);
  }

  private _proj(p: V3): { x: number; y: number; z: number; s: number } | null {
    const v = sub(p, this.eye);
    const z = dot(v, this.fwd);
    if (z < 1) return null;
    const s = this.focal / z;
    return { x: this.W / 2 + dot(v, this.right) * s, y: this.H / 2 - dot(v, this.up) * s, z, s };
  }

  private _quad(a: V3, b: V3, c: V3, d: V3, f: string | null, s: string | null, w?: number): void {
    this._prims.push({ k: 0, p: [a, b, c, d], f, s, w: w || 1 });
  }
  /** Same as _quad, but filled with a soft screen-space vertical gradient instead of a flat colour —
      the difference between a face reading as lit surface vs. flat folded paper. */
  private _quadGrad(a: V3, b: V3, c: V3, d: V3, grad: [string, string], s: string | null, w?: number): void {
    this._prims.push({ k: 0, p: [a, b, c, d], grad, s, w: w || 1 });
  }
  private _line(a: V3, b: V3, s: string, w?: number): void {
    this._prims.push({ k: 1, p: [a, b], s, w: w || 1 });
  }
  private _dot(p: V3, r: number, f: string): void {
    this._prims.push({ k: 2, p: [p], r, f });
  }
  private _poly(pts: V3[], s: string, w?: number): void {
    this._prims.push({ k: 3, p: pts, s, w: w || 1 });
  }
  private _text(p: V3, str: string, size: number, f: string): void {
    this._prims.push({ k: 4, p: [p], t: str, sz: size, f });
  }

  private _solid(c: V3, s: V3, a: number, edge?: number | null): void {
    const sx = s.x / 2,
      sz = s.z / 2,
      by = c.y - s.y / 2;

    // Ambient occlusion shadow — dark bleed on the ground around building base
    this._quad(
      V(c.x - sx - 1.8, by + 0.04, c.z - sz - 1.8),
      V(c.x + sx + 1.8, by + 0.04, c.z - sz - 1.8),
      V(c.x + sx + 1.8, by + 0.04, c.z + sz + 1.8),
      V(c.x - sx - 1.8, by + 0.04, c.z + sz + 1.8),
      rgba(INK, 0.09 * a),
      null,
      0
    );

    const x = s.x / 2,
      y = s.y / 2,
      z = s.z / 2;
    const P: V3[] = [
      V(c.x - x, c.y - y, c.z - z),
      V(c.x + x, c.y - y, c.z - z),
      V(c.x + x, c.y + y, c.z - z),
      V(c.x - x, c.y + y, c.z - z),
      V(c.x - x, c.y - y, c.z + z),
      V(c.x + x, c.y - y, c.z + z),
      V(c.x + x, c.y + y, c.z + z),
      V(c.x - x, c.y + y, c.z + z),
    ];
    const e = rgba(INK, (edge == null ? 0.38 : edge) * a);
    for (let i = 0; i < 6; i++) {
      const n = FN[i];
      const fc = V(c.x + n.x * x, c.y + n.y * y, c.z + n.z * z);
      if (dot(n, sub(this.eye, fc)) <= 0) continue;
      const corners: [V3, V3, V3, V3] = [P[FT[i][0]], P[FT[i][1]], P[FT[i][2]], P[FT[i][3]]];
      if (i === 2 || i === 3 || i === 4 || i === 5) {
        // Side faces: strong gradient — bright highlight at crown, deep shadow at base
        const topC = rgba(shade(FACE_SHADE[i], 0.32), a);
        const botC = rgba(shade(FACE_SHADE[i], -0.22), a);
        this._quadGrad(corners[0], corners[1], corners[2], corners[3], [topC, botC], e, 1.2);
      } else {
        this._quad(corners[0], corners[1], corners[2], corners[3], rgba(FACE_SHADE[i], a), e, 1.2);
      }
    }
    // Bright corner edge highlights — the crisp lines that read as architectural precision
    const topY = c.y + y;
    const botY = c.y - y;
    const corners3D = [
      [V(c.x - x, botY, c.z - z), V(c.x - x, topY, c.z - z)],
      [V(c.x + x, botY, c.z - z), V(c.x + x, topY, c.z - z)],
      [V(c.x - x, botY, c.z + z), V(c.x - x, topY, c.z + z)],
      [V(c.x + x, botY, c.z + z), V(c.x + x, topY, c.z + z)],
    ];
    for (const [bot, top] of corners3D) {
      const fb = V(bot.x - c.x, 0, bot.z - c.z);
      if (dot(fb, sub(this.eye, c)) > 0)
        this._line(bot, top, rgba("255,255,255", 0.55 * a), 1.4);
    }
    // Crown edge — bright top perimeter line, the "cornice" that anchors shape
    this._line(P[3], P[2], rgba("255,255,255", 0.7 * a), 1.5);
    this._line(P[7], P[6], rgba("255,255,255", 0.4 * a), 1.5);
    this._line(P[3], P[7], rgba("255,255,255", 0.5 * a), 1.5);
    this._line(P[2], P[6], rgba("255,255,255", 0.4 * a), 1.5);
  }

  private _mass(cx: number, cz: number, w: number, d: number, h: number, a: number, floors?: number): void {
    this._solid(V(cx, h / 2, cz), V(w, h, d), a);
    const n = floors == null ? Math.max(3, Math.round(h / 4.5)) : floors;
    const frontZ = this.eye.z > cz ? 1 : -1;
    const sideX = this.eye.x > cx ? 1 : -1;
    const faceZ = cz + frontZ * (d / 2 + 0.08);
    const faceX = cx + sideX * (w / 2 + 0.08);

    for (let f = 1; f < n; f++) {
      const y = f * (h / n);
      // Horizontal floor-plate line on front face
      this._line(V(cx - w / 2 + 0.8, y, faceZ), V(cx + w / 2 - 0.8, y, faceZ), rgba(INK, 0.18 * a), 1.1);
      // Horizontal floor-plate on side face
      this._line(V(faceX, y, cz - d / 2 + 0.8), V(faceX, y, cz + d / 2 - 0.8), rgba(INK, 0.13 * a), 1.1);
    }

    // Vertical window-bay mullions on front face — the defining mark of a real curtain wall
    const cols = Math.max(2, Math.round(w / 5));
    for (let c2 = 1; c2 < cols; c2++) {
      const wx = cx - w / 2 + c2 * (w / cols);
      this._line(V(wx, 0.5, faceZ), V(wx, h - 0.5, faceZ), rgba(INK, 0.10 * a), 1);
    }

    // Lit window panels — a band of warm glow on upper floors (office-lit look)
    if (h > 14 && n > 3) {
      const winY0 = h * 0.45;
      const winY1 = h * 0.85;
      for (let c2 = 0; c2 < cols - 1; c2++) {
        const wx0 = cx - w / 2 + c2 * (w / cols) + 1;
        const wx1 = wx0 + w / cols - 2;
        this._quad(
          V(wx0, winY0, faceZ), V(wx1, winY0, faceZ),
          V(wx1, winY1, faceZ), V(wx0, winY1, faceZ),
          rgba(BLUEL, 0.13 * a), null, 0
        );
      }
    }
  }

  private _district(D: District, a: number, live: number): void {
    const x = D.x,
      z = D.z;
    let i: number;

    this._quad(
      V(x - 24, 0.12, z - 24),
      V(x + 24, 0.12, z - 24),
      V(x + 24, 0.12, z + 24),
      V(x - 24, 0.12, z + 24),
      rgba("236,241,248", 0.95 * a),
      rgba(INK, 0.2 * a),
      1.1
    );

    switch (D.type) {
      case "hospital": {
        this._mass(x - 6, z, 20, 16, 26, a);
        this._mass(x + 10, z + 4, 10, 12, 15, a);
        const hz = this.eye.z > z ? 1 : -1;
        this._line(V(x - 6, 20, z + hz * 8.15), V(x - 6, 15, z + hz * 8.15), rgba(BLUE, 0.9 * a), 3);
        this._line(V(x - 8.5, 17.5, z + hz * 8.15), V(x - 3.5, 17.5, z + hz * 8.15), rgba(BLUE, 0.9 * a), 3);
        break;
      }
      case "bank": {
        this._mass(x, z, 28, 20, 4, a, 1);
        this._solid(V(x, 14, z), V(20, 16, 14), a);
        const bz = this.eye.z > z ? 1 : -1;
        for (i = 0; i < 5; i++)
          this._line(V(x - 8 + i * 4, 4.4, z + bz * 7.15), V(x - 8 + i * 4, 20, z + bz * 7.15), rgba(INK, 0.4 * a), 2);
        this._solid(V(x, 22.9, z), V(23, 1.8, 17), a);
        break;
      }
      case "data": {
        for (i = 0; i < 4; i++) {
          const dx = x - 9 + (i % 2) * 18,
            dz = z - 9 + Math.floor(i / 2) * 18;
          const hh = 20 + (i % 3) * 7;
          this._mass(dx, dz, 11, 11, hh, a, Math.round(hh / 3.4));
          this._dot(V(dx, hh + 2, dz), 1.5, rgba(BLUE, (0.35 + 0.5 * live) * a));
        }
        break;
      }
      case "factory": {
        this._mass(x - 2, z, 30, 18, 12, a, 2);
        for (i = 0; i < 4; i++) {
          const sx = x - 15 + i * 7.6;
          this._quad(
            V(sx, 12, z - 9),
            V(sx + 3.8, 17.6, z - 9),
            V(sx + 3.8, 17.6, z + 9),
            V(sx, 12, z + 9),
            rgba("223,230,240", a),
            rgba(INK, 0.32 * a),
            1.1
          );
          this._quad(
            V(sx + 3.8, 17.6, z - 9),
            V(sx + 7.6, 12, z - 9),
            V(sx + 7.6, 12, z + 9),
            V(sx + 3.8, 17.6, z + 9),
            rgba("248,250,253", a),
            rgba(INK, 0.32 * a),
            1.1
          );
        }
        this._solid(V(x + 15, 13, z - 6), V(5, 26, 5), a);
        break;
      }
      case "retail": {
        this._mass(x, z - 3, 28, 14, 11, a, 2);
        this._quad(
          V(x - 15, 12.4, z + 4),
          V(x + 15, 12.4, z + 4),
          V(x + 15, 12.4, z + 11),
          V(x - 15, 12.4, z + 11),
          rgba(BLUE, 0.13 * a),
          rgba(BLUE, 0.4 * a),
          1.2
        );
        for (i = 0; i < 3; i++)
          this._line(V(x - 9 + i * 9, 0.3, z + 10.6), V(x - 9 + i * 9, 12.4, z + 10.6), rgba(INK, 0.26 * a), 1.3);
        break;
      }
      case "warehouse": {
        this._mass(x - 3, z, 32, 20, 11, a, 1);
        const wz = this.eye.z > z ? 1 : -1;
        for (i = 0; i < 4; i++) {
          const bx = x - 15 + i * 8;
          this._quad(
            V(bx, 0.35, z + wz * 10.12),
            V(bx + 5, 0.35, z + wz * 10.12),
            V(bx + 5, 6, z + wz * 10.12),
            V(bx, 6, z + wz * 10.12),
            rgba("219,226,238", a),
            rgba(INK, 0.3 * a),
            1.1
          );
        }
        // delivery truck, parked at the dock — trailer + cab + wheels
        const tx = x + 16,
          tz = z + 15;
        this._solid(V(tx, 3.4, tz), V(11, 6.4, 5.2), a); // trailer box
        this._solid(V(tx - 7.3, 2.6, tz), V(4.4, 4.8, 5), a); // cab
        this._solid(V(tx - 7.3, 5.3, tz - 0.2), V(3, 2.2, 3.2), a, 0.4); // cab roof
        for (const [wx, wz2] of [
          [tx - 8.6, tz - 2.7],
          [tx - 8.6, tz + 2.7],
          [tx - 1.2, tz - 2.7],
          [tx - 1.2, tz + 2.7],
          [tx + 4.4, tz - 2.7],
          [tx + 4.4, tz + 2.7],
        ] as [number, number][]) {
          this._dot(V(wx, 0.5, wz2), 1.15, rgba(INK, 0.55 * a));
        }
        break;
      }
      case "energy": {
        for (i = 0; i < 6; i++) {
          const ry = i * 4.4,
            wA = (15 - i * 1.5) / 2,
            wB = (15 - (i + 1) * 1.5) / 2;
          this._quad(
            V(x - 8 - wA, ry, z - 8 - wA),
            V(x - 8 + wA, ry, z - 8 - wA),
            V(x - 8 + wB, ry + 4.4, z - 8 - wB),
            V(x - 8 - wB, ry + 4.4, z - 8 - wB),
            rgba("243,247,251", a),
            rgba(INK, 0.28 * a),
            1.1
          );
          this._quad(
            V(x - 8 + wA, ry, z - 8 - wA),
            V(x - 8 + wA, ry, z - 8 + wA),
            V(x - 8 + wB, ry + 4.4, z - 8 + wB),
            V(x - 8 + wB, ry + 4.4, z - 8 - wB),
            rgba("224,231,242", a),
            rgba(INK, 0.28 * a),
            1.1
          );
        }
        this._solid(V(x + 10, 5, z + 7), V(13, 10, 13), a);
        this._solid(V(x + 10, 10.6, z + 7), V(14, 1.4, 14), a);
        break;
      }
    }

    this._text(V(x, 30, z + 26), D.label, 11, rgba(INK, 0.32 * a));
  }

  private _tower(a: number, live: number): void {
    let i: number;
    // Wide podium base — two stepped slabs
    this._solid(V(0, 2, 0), V(52, 4, 52), a);
    this._solid(V(0, 6.5, 0), V(40, 5, 40), a);

    let y = 11,
      w = 27;
    const fz = this.eye.z > 0 ? 1 : -1;
    for (i = 0; i < 5; i++) {
      const h = 9.4 - i * 0.7;
      this._solid(V(0, y + h / 2, 0), V(w, h, w), a);
      // Vertical mullions on front face
      for (let m = 1; m < 4; m++) {
        const mx = -w / 2 + m * (w / 4);
        this._line(V(mx, y + 0.6, fz * (w / 2 + 0.08)), V(mx, y + h - 0.6, fz * (w / 2 + 0.08)), rgba(INK, 0.18 * a), 1.2);
      }
      // Lit floor band — thin bright stripe at each setback cornice
      this._line(
        V(-w / 2, y + h, fz * (w / 2 + 0.05)),
        V(w / 2, y + h, fz * (w / 2 + 0.05)),
        rgba("220,232,255", (0.7 + live * 0.3) * a), 1.8
      );
      y += h;
      w -= 3.6;
    }

    // Mechanical crown cap
    this._solid(V(0, y + 1.5, 0), V(w + 4, 3, w + 4), a);
    // Antenna spire
    this._line(V(0, y + 3, 0), V(0, y + 20, 0), rgba(INK, 0.45 * a), 1.8);
    // Beacon at tip — pulses brighter when live
    this._dot(V(0, y + 20, 0), 2.4, rgba(BLUE, (0.5 + live * 0.5) * a));
    if (live > 0.3) {
      // Outer halo ring at beacon when system is active
      this._dot(V(0, y + 20, 0), 4.5, rgba(BLUE, 0.18 * live * a));
    }

    // ADRIG logomark chevron on front facade
    const mz = fz * 13.9;
    this._line(V(-5, 30, mz), V(0, 39.6, mz), rgba(BLUE, (0.8 + live * 0.2) * a), 3.2);
    this._line(V(0, 39.6, mz), V(5, 30, mz), rgba(BLUE, (0.8 + live * 0.2) * a), 3.2);
    this._line(V(-2.7, 33.4, mz), V(2.7, 33.4, mz), rgba(BLUEL, (0.7 + live * 0.3) * a), 3);

    // Rising data-flow particles — visible once system is live
    if (live > 0.01) {
      for (i = 0; i < 18; i++) {
        const ph = (this.t * 2.8 + i / 18) % 1;
        const sz2 = 1.8 - ph * 0.9;
        this._dot(V(0, 6 + ph * 52, 0), sz2, rgba(BLUE, (1 - ph) * 0.8 * live));
      }
    }
  }

  private _build(t: number): void {
    let i: number, j: number;
    this._prims.length = 0;

    const gridIn = ease(range(t, 0.0, 0.16));
    const reach = 92 + gridIn * 120;
    for (i = -14; i <= 14; i++) {
      const c = i * 15.5;
      if (Math.abs(c) > reach) continue;
      const fade = 1 - Math.abs(c) / (reach + 1);
      const al = 0.075 * fade * (0.55 + gridIn * 0.45);
      this._line(V(c, 0, -reach), V(c, 0, reach), rgba(INK, al), 1);
      this._line(V(-reach, 0, c), V(reach, 0, c), rgba(INK, al), 1);
    }
    const roadIn = ease(range(t, 0.06, 0.24));
    if (roadIn > 0.01) {
      [-31, 31].forEach((o) => {
        this._quad(V(-96, 0.06, o - 5), V(96, 0.06, o - 5), V(96, 0.06, o + 5), V(-96, 0.06, o + 5), rgba(INK, 0.035 * roadIn), null, 0);
        this._quad(V(o - 5, 0.06, -96), V(o + 5, 0.06, -96), V(o + 5, 0.06, 96), V(o - 5, 0.06, 96), rgba(INK, 0.035 * roadIn), null, 0);
      });
    }

    const appr = ease(range(t, 0.005, 0.2));
    if (appr > 0.001 && appr < 0.999) {
      const lanes = [
        { a: V(-150, 0.5, -31), b: V(0, 0.5, -31) },
        { a: V(150, 0.5, 31), b: V(0, 0.5, 31) },
        { a: V(-31, 0.5, 150), b: V(-31, 0.5, 0) },
        { a: V(31, 0.5, -150), b: V(31, 0.5, 0) },
      ];
      for (i = 0; i < lanes.length; i++) {
        const L = lanes[i];
        const k = clamp(appr * 1.35 - i * 0.06, 0, 1);
        if (k <= 0) continue;
        const head = lerpV(L.a, L.b, easeOut(k));
        const tail = lerpV(L.a, L.b, easeOut(Math.max(0, k - 0.24)));
        this._line(tail, head, rgba(BLUE, 0.55 * (1 - appr * 0.35)), 2.2);
        this._dot(head, 2.4, rgba(BLUE, 0.9 * (1 - appr * 0.3)));
      }
      const land = ease(range(t, 0.12, 0.2));
      if (land > 0.01) {
        const rr2 = 34 * land;
        this._line(V(-rr2, 0.5, 0), V(rr2, 0.5, 0), rgba(BLUE, 0.3 * land), 1.6);
        this._line(V(0, 0.5, -rr2), V(0, 0.5, rr2), rgba(BLUE, 0.3 * land), 1.6);
      }
    }

    const conA = ease(range(t, 0.03, 0.2)) * (1 - ease(range(t, 0.28, 0.42)));
    if (conA > 0.01) {
      const R = 88;
      const sq = [V(-R, 0.2, -R), V(R, 0.2, -R), V(R, 0.2, R), V(-R, 0.2, R)];
      for (i = 0; i < 4; i++) {
        const A = sq[i],
          B = sq[(i + 1) % 4];
        const fr = clamp(ease(range(t, 0.03, 0.2)) * 4 - i, 0, 1);
        if (fr > 0) this._line(A, lerpV(A, B, easeOut(fr)), rgba(BLUE, 0.28 * conA), 1.2);
      }
      this._line(V(-14, 0.2, 0), V(14, 0.2, 0), rgba(INK, 0.2 * conA), 1);
      this._line(V(0, 0.2, -14), V(0, 0.2, 14), rgba(INK, 0.2 * conA), 1);
    }

    const live = ease(range(t, 0.56, 0.72));
    for (i = 0; i < DISTRICTS.length; i++) {
      const D = DISTRICTS[i];
      const r = ease(range(t, D.rise, D.rise + 0.18));
      if (r <= 0.002) continue;
      this._district(D, clamp(r * 2.6, 0, 1), live);
    }

    const towerIn = ease(range(t, 0.26, 0.46));
    if (towerIn > 0.002) this._tower(clamp(towerIn * 2.6, 0, 1), live);

    const flow = ease(range(t, 0.5, 0.7));
    if (flow > 0.002) {
      for (i = 0; i < DISTRICTS.length; i++) {
        const seg = 26,
          pts: V3[] = [];
        for (j = 0; j <= seg; j++) pts.push(arcPoint(i, j / seg));
        const grow = clamp(flow * 1.5 - i * 0.045, 0, 1);
        const keep = Math.max(2, Math.round(pts.length * easeOut(grow)));
        this._poly(pts.slice(0, keep), rgba(BLUEL, 0.4 * flow), 1.5);
      }
    }

    const pin = ease(range(t, 0.02, 0.22));
    for (i = 0; i < 40; i++) {
      const a2 = i * 2.399963,
        rr = 40 + (i % 11) * 16;
      this._dot(
        V(Math.cos(a2 + t * 0.4) * rr, 14 + ((i * 9.1) % 62) + Math.sin(t * 3 + i) * 2, Math.sin(a2 + t * 0.4) * rr),
        1.1,
        rgba(BLUEL, 0.3 * pin)
      );
    }
  }

  /**
   * `extraZoom` (0..1) is an additional slow dolly toward the tower, on top
   * of the authored camera path — driven by real elapsed seconds from
   * Hero.tsx (a continuous 0.2%-per-second creep), not by the story timeline,
   * so the shot keeps quietly tightening even once the city has finished assembling.
   */
  render(t: number, extraZoom = 0): void {
    this.t = t = clamp(t, 0, 1);

    if (this.canvas.clientWidth !== this._cw || this.canvas.clientHeight !== this._ch) {
      this._cw = this.canvas.clientWidth;
      this._ch = this.canvas.clientHeight;
      this.resize();
      return;
    }
    const ctx = this.ctx,
      W = this.W,
      H = this.H;
    if (!W || !H) return;

    const cam = camAt(t);

    const wide = this.cssW / this.cssH > 1.15;
    const bias = ease(range(t, 0.78, 1.0));
    if (wide) {
      const dx = -72 * bias;
      cam.eye = V(cam.eye.x + dx, cam.eye.y, cam.eye.z);
      cam.tgt = V(cam.tgt.x + dx, cam.tgt.y, cam.tgt.z);
    } else {
      cam.eye = V(cam.eye.x, cam.eye.y * 1.06, cam.eye.z * (1 + 0.36 * bias));
    }

    if (extraZoom > 0) {
      cam.eye = lerpV(cam.eye, cam.tgt, clamp(extraZoom, 0, 0.4));
    }

    this.eye = cam.eye;
    this.fwd = norm(sub(cam.tgt, cam.eye));
    this.right = norm(cross(this.fwd, V(0, 1, 0)));
    this.up = cross(this.right, this.fwd);
    this.focal = H / 2 / Math.tan(((cam.fov * Math.PI) / 180) / 2);

    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);

    this._build(t);

    const list: Prim[] = [];
    for (let k = 0; k < this._prims.length; k++) {
      const pr = this._prims[k];
      const sp: { x: number; y: number; z: number; s: number }[] = [];
      let ok = true;
      let zc = 0;
      for (let m = 0; m < pr.p.length; m++) {
        const q = this._proj(pr.p[m]);
        if (!q) {
          ok = false;
          break;
        }
        sp.push(q);
        zc += q.z;
      }
      if (!ok) continue;
      pr._sp = sp;
      pr._z = zc / sp.length;
      list.push(pr);
    }
    list.sort((a, b) => (b._z as number) - (a._z as number));

    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    for (let k = 0; k < list.length; k++) {
      const pr = list[k];
      const sp = pr._sp as { x: number; y: number; z: number; s: number }[];
      ctx.globalAlpha = fog(pr._z as number, 1);

      if (pr.k === 0) {
        ctx.beginPath();
        ctx.moveTo(sp[0].x, sp[0].y);
        for (let n = 1; n < 4; n++) ctx.lineTo(sp[n].x, sp[n].y);
        ctx.closePath();
        if (pr.grad) {
          // Gradient axis = the screen-space top-most to bottom-most corner,
          // whatever the face's winding order — robust to orientation.
          let top = sp[0],
            bottom = sp[0];
          for (let n = 1; n < 4; n++) {
            if (sp[n].y < top.y) top = sp[n];
            if (sp[n].y > bottom.y) bottom = sp[n];
          }
          const g = ctx.createLinearGradient(top.x, top.y, bottom.x, bottom.y);
          g.addColorStop(0, pr.grad[0]);
          g.addColorStop(1, pr.grad[1]);
          ctx.fillStyle = g;
          ctx.fill();
        } else if (pr.f) {
          ctx.fillStyle = pr.f;
          ctx.fill();
        }
        if (pr.s) {
          ctx.strokeStyle = pr.s;
          ctx.lineWidth = (pr.w as number) * this.dpr;
          ctx.stroke();
        }
      } else if (pr.k === 1) {
        ctx.beginPath();
        ctx.moveTo(sp[0].x, sp[0].y);
        ctx.lineTo(sp[1].x, sp[1].y);
        ctx.strokeStyle = pr.s as string;
        ctx.lineWidth = (pr.w as number) * this.dpr;
        ctx.stroke();
      } else if (pr.k === 2) {
        ctx.beginPath();
        ctx.arc(sp[0].x, sp[0].y, Math.max(0.6, (pr.r as number) * sp[0].s) * this.dpr * 0.5, 0, 6.2832);
        ctx.fillStyle = pr.f as string;
        ctx.fill();
      } else if (pr.k === 3) {
        ctx.beginPath();
        ctx.moveTo(sp[0].x, sp[0].y);
        for (let o = 1; o < sp.length; o++) ctx.lineTo(sp[o].x, sp[o].y);
        ctx.strokeStyle = pr.s as string;
        ctx.lineWidth = (pr.w as number) * this.dpr;
        ctx.stroke();
      } else {
        const fs = clamp((pr.sz as number) * sp[0].s * 0.42, 6.5, 12.5) * this.dpr;
        ctx.font = "600 " + fs.toFixed(1) + "px Inter, system-ui, sans-serif";
        ctx.fillStyle = pr.f as string;
        ctx.save();
        (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = (fs * 0.12).toFixed(1) + "px";
        ctx.fillText(pr.t as string, sp[0].x, sp[0].y);
        ctx.restore();
      }
    }
    ctx.globalAlpha = 1;

    this._labelAt("core", V(0, 62, 0));
    this._labelAt("flow", V(-96, 34, 30));
  }

  private _labelAt(id: string, p: V3): void {
    const q = this._proj(p);
    this.labels[id] = q
      ? { x: q.x / this.dpr, y: q.y / this.dpr, vis: true, s: clamp(q.s * 12, 0.7, 1.25) }
      : { x: 0, y: 0, vis: false, s: 1 };
  }

  /** Projects an arbitrary world point using this frame's already-computed camera — for DOM
      overlays (message bubbles) that need to track a moving point in the scene. Call after render(). */
  projectWorld(p: V3): { x: number; y: number; vis: boolean; scale: number } | null {
    const q = this._proj(p);
    if (!q) return null;
    return { x: q.x / this.dpr, y: q.y / this.dpr, vis: q.z > 0, scale: clamp(q.s * 10, 0.35, 2.2) };
  }

  destroy(): void {
    window.removeEventListener("resize", this._onResize);
    this._ro?.disconnect();
  }
}
