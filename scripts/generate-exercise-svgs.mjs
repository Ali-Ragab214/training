// Generates one stick-figure SVG per exercise in public/images/exercises/.
// Run: node scripts/generate-exercise-svgs.mjs
import { mkdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const OUT_DIR = join(
  dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
  'images',
  'exercises',
)

const PLUM = '#34243B'
const ROSE = '#E879A9'
const ROSE_LIGHT = '#F4A7C6'
const LAVENDER = '#B9A6E8'
const LAVENDER_LIGHT = '#D4C9F2'
const PEACH = '#FFC6A8'
const CREAM = '#FFF9FC'

const W = 480
const H = 270
const FLOOR_Y = 222

// ---------------------------------------------------------------
// Pose definitions. Coordinates in the 480x270 canvas (y down).
// Each figure: head [x,y,r] and polylines (arrays of points).
// `decor` adds dashed motion arcs / wall lines etc.
// ---------------------------------------------------------------
const POSES = {
  'd1-warmup': {
    head: [240, 62, 17],
    polylines: [
      // torso
      [[240, 82], [240, 148]],
      // left arm bent forward
      [[240, 95], [206, 110], [214, 80]],
      // right arm bent back
      [[240, 95], [274, 110], [266, 80]],
      // standing leg
      [[240, 148], [234, 178], [238, 218]],
      // marching knee lifted
      [[240, 148], [262, 126], [256, 158]],
    ],
    decor: ['<circle cx="196" cy="98" r="4" fill="#B9A6E8" opacity="0.6"/>'],
  },
  'd1-bodyweight-squat': {
    head: [268, 84, 17],
    polylines: [
      // torso leaning slightly forward
      [[258, 104], [228, 158]],
      // hips -> knee
      [[228, 158], [272, 160]],
      // knee -> ankle
      [[272, 160], [276, 216]],
      // foot
      [[276, 216], [296, 216]],
      // arms extended forward
      [[254, 108], [300, 122], [318, 114]],
    ],
    decor: ['<path d="M228 160 Q 250 190 276 216" fill="none" stroke="#B9A6E8" stroke-width="3" stroke-dasharray="4 6" opacity="0.5"/>'],
  },
  'd1-glute-bridge': {
    head: [124, 200, 15],
    polylines: [
      // shoulders -> hips (lifted)
      [[148, 194], [214, 156]],
      // hips -> knees
      [[214, 156], [278, 188]],
      // knees -> feet
      [[278, 188], [300, 218]],
      // foot
      [[300, 218], [322, 218]],
      // arms alongside body
      [[152, 198], [196, 194]],
    ],
    decor: ['<path d="M148 194 L 278 188" fill="none" stroke="#B9A6E8" stroke-width="3" stroke-dasharray="4 6" opacity="0.4"/>'],
  },
  'd1-donkey-kicks': {
    head: [150, 152, 15],
    polylines: [
      // shoulders -> hips
      [[158, 162], [226, 162]],
      // hips -> support knee -> floor
      [[226, 162], [222, 218]],
      // hands -> shoulders
      [[158, 218], [158, 172]],
      // lifted leg: thigh back/up, shin bent up
      [[226, 160], [276, 140], [308, 108]],
    ],
    decor: ['<path d="M226 162 Q 260 150 308 108" fill="none" stroke="#F4A7C6" stroke-width="3" stroke-dasharray="4 6" opacity="0.6"/>'],
  },
  'd1-reverse-lunge': {
    head: [268, 78, 17],
    polylines: [
      // torso
      [[258, 98], [246, 162]],
      // front thigh -> shin -> foot
      [[246, 162], [238, 164], [240, 216]],
      // back thigh -> shin -> toe
      [[246, 162], [276, 170], [306, 206]],
      // arm holding support
      [[256, 110], [300, 118]],
    ],
    decor: ['<line x1="312" y1="40" x2="312" y2="222" stroke="#B9A6E8" stroke-width="6" stroke-linecap="round" opacity="0.45"/>'],
  },
  'd1-calf-raises': {
    head: [228, 66, 17],
    polylines: [
      [[228, 86], [228, 156]],
      // leg up on toes
      [[228, 156], [232, 200]],
      [[232, 200], [248, 212]],
      // light support arm
      [[232, 100], [282, 112]],
    ],
    decor: ['<line x1="300" y1="40" x2="300" y2="222" stroke="#B9A6E8" stroke-width="6" stroke-linecap="round" opacity="0.45"/>'],
  },
  'd1-dead-bug': {
    head: [132, 200, 15],
    polylines: [
      // straight torso lying on back
      [[150, 200], [256, 198]],
      // working arm up toward ceiling
      [[168, 200], [164, 130]],
      // extended leg
      [[256, 198], [330, 172]],
      // bent supporting leg
      [[250, 198], [292, 168], [282, 130]],
    ],
    decor: ['<circle cx="164" cy="122" r="5" fill="#E879A9" opacity="0.7"/>'],
  },
  'd1-cooldown': {
    head: [240, 70, 17],
    polylines: [
      [[240, 90], [240, 160]],
      // arm arched overhead
      [[240, 100], [286, 74], [302, 52]],
      // legs with gentle stride
      [[240, 160], [236, 218]],
      [[240, 160], [214, 178], [208, 214]],
    ],
    decor: ['<path d="M300 60 q 20 -18 8 -34" fill="none" stroke="#B9A6E8" stroke-width="3" stroke-dasharray="3 6" opacity="0.6"/>'],
  },
  'd2-warmup': {
    head: [240, 62, 17],
    polylines: [
      [[240, 82], [240, 150]],
      // arms mid-circle
      [[240, 96], [198, 70]],
      [[240, 96], [282, 70]],
      // legs
      [[240, 150], [236, 218]],
      [[240, 150], [252, 218]],
    ],
    decor: [
      '<circle cx="196" cy="88" r="42" fill="none" stroke="#E879A9" stroke-width="3" stroke-dasharray="5 7" opacity="0.55"/>',
      '<circle cx="284" cy="88" r="42" fill="none" stroke="#E879A9" stroke-width="3" stroke-dasharray="5 7" opacity="0.55"/>',
    ],
  },
  'd2-wall-pushups': {
    head: [300, 96, 15],
    polylines: [
      // inclined body: shoulders -> hips -> feet
      [[292, 108], [236, 148], [168, 210]],
      // bent arms reaching the wall
      [[292, 108], [316, 124], [348, 108]],
      // foot
      [[168, 210], [186, 212]],
    ],
    decor: [
      '<line x1="366" y1="30" x2="366" y2="222" stroke="#B9A6E8" stroke-width="7" stroke-linecap="round" opacity="0.5"/>',
      '<path d="M316 124 L 348 108" fill="none" stroke="#F4A7C6" stroke-width="3" stroke-dasharray="4 6" opacity="0.8"/>',
    ],
  },
  'd2-prone-w-raises': {
    head: [240, 56, 15],
    polylines: [
      [[240, 74], [240, 156]],
      // left W arm: shoulder -> elbow out -> hand up
      [[226, 88], [166, 104], [186, 66]],
      // right W arm
      [[254, 88], [314, 104], [294, 66]],
      // legs slightly apart
      [[240, 156], [222, 214]],
      [[240, 156], [258, 214]],
    ],
    decor: [
      '<circle cx="186" cy="58" r="4" fill="#E879A9" opacity="0.7"/>',
      '<circle cx="294" cy="58" r="4" fill="#E879A9" opacity="0.7"/>',
    ],
  },
  'd2-reverse-snow-angels': {
    head: [240, 56, 15],
    polylines: [
      [[240, 74], [240, 156]],
      // arms swept outward/up
      [[228, 90], [168, 66]],
      [[252, 90], [312, 66]],
      // legs apart (prone)
      [[240, 156], [210, 212]],
      [[240, 156], [270, 212]],
    ],
    decor: [
      '<path d="M168 66 A 78 78 0 0 1 160 196" fill="none" stroke="#B9A6E8" stroke-width="3" stroke-dasharray="5 7" opacity="0.55"/>',
      '<path d="M312 66 A 78 78 0 0 0 320 196" fill="none" stroke="#B9A6E8" stroke-width="3" stroke-dasharray="5 7" opacity="0.55"/>',
    ],
  },
  'd2-wall-slides': {
    head: [196, 72, 15],
    polylines: [
      [[190, 92], [188, 158]],
      [[188, 158], [184, 214]],
      // arms slid up toward the wall (V shape)
      [[192, 96], [150, 66], [146, 38]],
      [[200, 96], [166, 120], [148, 44]],
    ],
    decor: [
      '<line x1="128" y1="30" x2="128" y2="222" stroke="#B9A6E8" stroke-width="7" stroke-linecap="round" opacity="0.5"/>',
      // ghost W start position
      '<path d="M192 118 L 158 132 M 200 118 L 160 136" stroke="#F4A7C6" stroke-width="3" stroke-dasharray="4 6" opacity="0.7" fill="none"/>',
    ],
  },
  'd2-biceps-curl': {
    head: [240, 62, 17],
    polylines: [
      [[240, 82], [240, 152]],
      // working arm curled up
      [[222, 92], [200, 132], [216, 84]],
      // resisting hand on the working wrist
      [[258, 92], [244, 108], [222, 86]],
      // legs
      [[240, 152], [234, 218]],
      [[240, 152], [254, 218]],
    ],
    decor: ['<path d="M216 84 Q 240 66 258 92" fill="none" stroke="#B9A6E8" stroke-width="3" stroke-dasharray="4 6" opacity="0.5"/>'],
  },
  'd2-close-grip-pushups': {
    head: [300, 96, 15],
    polylines: [
      [[292, 108], [236, 148], [172, 208]],
      // elbows tucked close to the torso
      [[292, 108], [300, 130], [336, 116]],
      [[172, 208], [190, 210]],
    ],
    decor: [
      '<line x1="354" y1="30" x2="354" y2="222" stroke="#B9A6E8" stroke-width="7" stroke-linecap="round" opacity="0.5"/>',
      '<path d="M292 108 L 300 130" stroke="#F4A7C6" stroke-width="5" stroke-linecap="round" opacity="0.8"/>',
    ],
  },
  'd2-knee-plank': {
    head: [296, 152, 15],
    polylines: [
      // straight line head -> hips -> knees
      [[286, 160], [218, 164], [156, 190]],
      // forearm support on the floor
      [[280, 164], [246, 196], [276, 202]],
      // shin from knee back/up
      [[156, 190], [128, 176]],
    ],
    decor: ['<path d="M286 160 L 156 190" stroke="#B9A6E8" stroke-width="3" stroke-dasharray="4 6" opacity="0.4" fill="none"/>'],
  },
  'd2-cooldown': {
    head: [240, 62, 17],
    polylines: [
      [[240, 84], [240, 152]],
      // right arm pulled across the chest
      [[256, 94], [188, 116]],
      // left hand holding the right arm
      [[224, 94], [214, 124], [232, 112]],
      // legs
      [[240, 152], [234, 218]],
      [[240, 152], [250, 218]],
    ],
    decor: ['<path d="M188 116 q -16 6 -22 22" fill="none" stroke="#B9A6E8" stroke-width="3" stroke-dasharray="3 6" opacity="0.6"/>'],
  },
}

function svgFor(id, pose) {
  const [hx, hy, hr] = pose.head
  const lines = pose.polylines
    .map(
      (pts) =>
        `<polyline points="${pts
          .map((p) => p.join(' '))
          .join(' ')}" fill="none" stroke="${PLUM}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>`,
    )
    .join('\n    ')

  const decor = (pose.decor ?? []).join('\n    ')

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-hidden="true">
  <defs>
    <linearGradient id="bg-${id}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FDEFF5"/>
      <stop offset="1" stop-color="#E4DCF8"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg-${id})"/>
  <circle cx="${hx}" cy="${hy}" r="${hr + 58}" fill="${LAVENDER_LIGHT}" opacity="0.35"/>
  <circle cx="${hx + 26}" cy="${hy - 18}" r="10" fill="${PEACH}" opacity="0.8"/>
  <circle cx="${hx - 44}" cy="${hy + 30}" r="7" fill="${ROSE_LIGHT}" opacity="0.7"/>
  <line x1="48" y1="${FLOOR_Y}" x2="${W - 48}" y2="${FLOOR_Y}" stroke="${PLUM}" stroke-width="4" stroke-linecap="round" opacity="0.18"/>
  ${lines}
  ${decor}
  <circle cx="${hx}" cy="${hy}" r="${hr}" fill="${ROSE_LIGHT}" stroke="${PLUM}" stroke-width="7"/>
  <line x1="70" y1="${FLOOR_Y + 18}" x2="86" y2="${FLOOR_Y + 18}" stroke="${ROSE}" stroke-width="5" stroke-linecap="round" opacity="0.6"/>
  <line x1="${W - 96}" y1="${FLOOR_Y + 18}" x2="${W - 76}" y2="${FLOOR_Y + 18}" stroke="${ROSE}" stroke-width="5" stroke-linecap="round" opacity="0.6"/>
</svg>
`
}

mkdirSync(OUT_DIR, { recursive: true })
for (const [id, pose] of Object.entries(POSES)) {
  const svg = svgFor(id, pose)
  const file = join(OUT_DIR, `${id}.svg`)
  writeFileSync(file, svg)
  console.log(`wrote ${file} (${svg.length} bytes)`)
}
console.log('done')
