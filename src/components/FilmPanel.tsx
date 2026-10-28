/**
 * 3D rendering of KOSMEX film faced plywood panels, textured with the genuine
 * 1250 × 2500 mm film print artwork. Pure CSS (no WebGL): decorative, aria-hidden.
 */
const PLY_V =
  "repeating-linear-gradient(to bottom, #2b221e 0 2px, #d8b47f 2px 5px, #a87a45 5px 6px, #e2c393 6px 9px, #9b6e3c 9px 10px)";
const PLY_H =
  "repeating-linear-gradient(to right, #2b221e 0 2px, #d8b47f 2px 5px, #a87a45 5px 6px, #e2c393 6px 9px, #9b6e3c 9px 10px)";

function Board({ z, dx = 0, dy = 0, top = false }: { z: number; dx?: number; dy?: number; top?: boolean }) {
  return (
    <div
      className="absolute inset-0 [transform-style:preserve-3d]"
      style={{ transform: `translate3d(${dx}px, ${dy}px, ${z}px)` }}
    >
      <div
        className="film-surface absolute inset-0"
        style={{ transform: "translateZ(var(--t))", boxShadow: top ? "inset 0 0 0 1px rgba(255,255,255,.06)" : undefined }}
      >
        {top && <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,.16)_0%,rgba(255,255,255,0)_38%,rgba(255,255,255,0)_70%,rgba(255,255,255,.07)_100%)]" />}
      </div>
      <div
        className="absolute bottom-0 left-0 w-full origin-bottom"
        style={{ height: "var(--t)", transform: "rotateX(-90deg)", background: PLY_V, filter: "brightness(.92)" }}
      />
      <div
        className="absolute right-0 top-0 h-full origin-right"
        style={{ width: "var(--t)", transform: "rotateY(90deg)", background: PLY_H, filter: "brightness(.78)" }}
      />
    </div>
  );
}

export function FilmPanel({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`relative [perspective:2200px] ${className}`}>
      <div
        className="absolute left-1/2 top-1/2 [--t:22px] [transform-style:preserve-3d] [--w:220px] [--l:440px] sm:[--w:250px] sm:[--l:500px]"
        style={{
          width: "var(--w)",
          height: "var(--l)",
          marginLeft: "calc(var(--w) / -2)",
          marginTop: "calc(var(--l) / -2)",
          transform: "rotateX(56deg) rotateZ(-38deg)",
        }}
      >
        {/* soft contact shadow */}
        <div className="absolute inset-[-8%] rounded-[50%] bg-black/45 blur-3xl" style={{ transform: "translateZ(-2px)" }} />
        <Board z={0} />
        <Board z={24} dx={-6} dy={8} />
        <Board z={48} dx={-30} dy={-26} top />
      </div>
    </div>
  );
}
