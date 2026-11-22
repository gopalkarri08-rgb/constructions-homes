import "server-only";

/**
 * Why a step matters, in homeowner language, plus a time or money hint.
 * Optional steps are few. Core work is never marked optional.
 */
export const stepExtras = {
  "soil-investigation": {
    why: [
      "A wrong foundation is the most expensive mistake in the house.",
      "The test tells you if the soil is filled, weak, or the swelling black-cotton type.",
      "It costs little next to digging the footings out and doing them again.",
    ],
    timeHint: "Do this before anyone digs. Usually a few days.",
  },
  "site-setup-excavation": {
    why: [
      "If the pits are in the wrong place, every wall above them is wrong.",
      "A pit that is too shallow will not hold the house the drawing promised.",
      "Termites travel through untreated soil under the floor.",
    ],
    timeHint: "One or two days of digging. Check depth before concrete arrives.",
  },
  "pcc-and-footings": {
    why: [
      "This concrete and steel carry the whole house, then disappear under the ground.",
      "Extra water in the mix makes pouring easy and the concrete weak.",
      "Fixing a bad footing means breaking it out.",
    ],
    timeHint: "Cast only after the engineer has looked. One pour per set of pits.",
  },
  "plinth-beam-dpc": {
    why: [
      "This beam ties the columns at ground level.",
      "The damp-proof layer (DPC) stops moisture climbing into the walls.",
      "Loose soil under the ground floor sinks and cracks the floor later.",
    ],
    timeHint: "After the footings, before the walls. Do not rush the damp-proof layer.",
  },
  columns: {
    why: [
      "Columns carry the floors. A leaning column is a leaning house.",
      "Holes in the concrete at the foot of a column are a common, serious defect.",
      "You cannot see the steel again after the pour.",
    ],
    timeHint: "Check each column for straightness before concrete goes in.",
  },
  beams: {
    why: [
      "Beams carry walls and floors into the columns.",
      "A pipe cut through a beam later also cuts the steel.",
      "If the supports sag, the beam sags.",
    ],
    timeHint: "Place pipe sleeves before the pour. Supports stay up for days, not hours.",
  },
  "slab-casting": {
    why: [
      "This is the floor you will live on.",
      "The steel inside is hidden the day it is cast.",
      "A joint left in the middle of the slab, because the mixer was late, is a weak line.",
    ],
    timeHint: "One continuous pour. The engineer should see the steel first.",
  },
  "curing-and-striking": {
    why: [
      "Concrete only gets strong if it stays wet.",
      "Taking the supports out too soon can crack the slab.",
      "Most house sites in India use blended cement, which needs longer wetting.",
    ],
    timeHint: "Keep a slab wet for about 10 to 14 days. Supports stay until the engineer says so.",
  },
  "concrete-sample": {
    optional: true,
    why: [
      "A lab test tells you if the concrete was as strong as the drawing asked.",
      "You find a weak mix before the next floor is built on it.",
      "Many small houses skip this. It is useful, not a legal must on every house.",
    ],
    timeHint: "Cubes are taken on pour day. The result comes at 28 days.",
  },
  "materials-and-mortar": {
    why: [
      "A dry clay brick steals water from the mortar, so the joint never sets.",
      "Light blocks (AAC) are laid differently from clay bricks. Mixing the methods weakens the wall.",
      "Bad joints become dusty plaster and cracks.",
    ],
    timeHint: "Check the first few courses, not only the finished wall.",
  },
  "building-the-walls": {
    why: [
      "A wavy wall is hidden with thick plaster, and thick plaster cracks.",
      "The gap under a beam is where cracks start if it is stuffed with loose bits.",
    ],
    timeHint: "Walls for one floor usually take several days. Check them while they are still low.",
  },
  "lintels-and-bands": {
    why: [
      "The wall above a door must not sit on the door frame.",
      "Without a small beam (lintel) over the opening, cracks run from the corners.",
      "In earthquake areas the drawing may also ask for a band. Do not treat that as optional.",
    ],
    timeHint: "Cast lintels as the walls rise, before the frames arrive.",
  },
  "electrical-conduits": {
    why: [
      "Wires run inside pipes that are buried in the wall.",
      "A bad pipe or a deep cut in a thin wall is hard to fix after plaster.",
      "The safety switch and the earth are planned now, not on painting day.",
    ],
    timeHint: "Agree the switch positions before the grooves are cut.",
  },
  plumbing: {
    why: [
      "A leak inside a wall means breaking the wall.",
      "A drain without slope holds dirty water and smells.",
      "Testing now is cheap. Testing after plaster is demolition.",
    ],
    timeHint: "Pressure-test water lines before they are covered. About an hour is a sound test.",
  },
  waterproofing: {
    why: [
      "Bathroom leaks start under the filling, not in the tile joint.",
      "A balcony that was never flooded as a test often leaks into the room below.",
      "Cutting a beam to pass a forgotten pipe also cuts the steel.",
    ],
    timeHint: "Flood the sunken bathroom for at least 48 hours before filling it.",
  },
  "terrace-extra-coat": {
    optional: true,
    why: [
      "An open terrace takes the full rain. A second waterproof layer is an upgrade, not the basic bathroom work.",
      "It costs more now and can save a ceiling leak later.",
      "Skip it only if the drawing already has a full terrace system you are happy with.",
    ],
    timeHint: "Do it before tiles or the final terrace finish. Flood-test again if you add it.",
  },
  "before-plaster": {
    why: [
      "Plaster covers every pipe and wire. You will not see them again.",
      "Cracks start where brick meets a column if there is no mesh.",
      "Plastering over an open groove wastes the coat.",
    ],
    timeHint: "One check of each room before the plaster gang starts.",
  },
  "internal-plaster": {
    why: [
      "This is the surface you see every day.",
      "Very thick plaster is a sign the wall was not straight.",
      "Door frames and tiles show every crooked corner.",
    ],
    timeHint: "Inside walls are usually about 12 mm thick. Check a corner before the scaffold moves.",
  },
  ceilings: {
    why: [
      "Ceiling plaster falls off in patches when it never stuck to the slab.",
      "A smooth slab from steel plates needs a grip or a bonding coat.",
      "Patching a fallen ceiling marks the room for years.",
    ],
    timeHint: "Ask to see the bonding coat before the ceiling is covered.",
  },
  "external-plaster": {
    why: [
      "This coat takes the rain.",
      "The tops of sunshades and the parapet are where water gets in first.",
      "A missing drip lets rain run back into the wall.",
    ],
    timeHint: "Do not let the scaffold leave before the outside, including the tops, is done.",
  },
  "wet-rooms-and-curing": {
    why: [
      "Paint is not waterproofing. Showers need a proper coat before tiles.",
      "Plaster that dries in the hot afternoon cracks and turns dusty.",
      "Seven days of keeping it damp is the usual minimum.",
    ],
    timeHint: "Name who wets the walls for a week, including Sunday.",
  },
  "before-tiling": {
    why: [
      "Tiles do not stop water. The layer under them does.",
      "A bathroom floor higher than the bedroom lets water walk in.",
      "Relaying a floor is dusty and expensive.",
    ],
    timeHint: "Set levels before the first tile is stuck down.",
  },
  laying: {
    why: [
      "A hollow tile cracks under a chair leg.",
      "Mixed boxes of tiles show as stripes of different shade.",
      "A raised edge is something you feel with a bare foot.",
    ],
    timeHint: "Large tiles need proper tile adhesive, not a thick sand-cement bed.",
  },
  "joints-slopes-finish": {
    why: [
      "A bathroom that holds a puddle was laid without a fall to the drain.",
      "Tight tiles with no gap cannot be grouted and chip at the edges.",
      "Glossy tiles on a wet stair are dangerous.",
    ],
    timeHint: "Pour a mug of water before grouting. It should reach the floor trap.",
  },
  "spare-tiles": {
    optional: true,
    why: [
      "You will break a tile. The same shade is often gone a year later.",
      "Keeping one box now is cheap. Matching it later may be impossible.",
      "The house can be finished without spares. You only miss them at the first crack.",
    ],
    timeHint: "Set one box aside before the last room uses it up.",
  },
  material: {
    why: [
      "Green wood shrinks after the first dry season. The shutter then will not lock.",
      "Very thin aluminium or plastic frames bend when you push them.",
      "A bad frame cannot be rescued by polish.",
    ],
    timeHint: "Check the frames when they arrive, before they are fixed.",
  },
  fixing: {
    why: [
      "A frame that is not straight makes a door that swings open by itself.",
      "Wet cement packed tight against wood holds damp and rots the bottom.",
      "The lintel carries the wall. The frame must not.",
    ],
    timeHint: "Fix frames plumb before the final plaster around them.",
  },
  "rain-and-glass": {
    why: [
      "Rain comes in at a sill that slopes the wrong way.",
      "Ordinary glass in a bathroom door cuts people when it breaks.",
      "A bedroom grill with no way out is a fire risk.",
    ],
    timeHint: "Agree the openable grill before the bars are welded for good.",
  },
  "shutters-and-hardware": {
    why: [
      "You touch the lock and the hinges every day.",
      "A heavy door on small hinges sags.",
      "Paint makes everyone unwilling to fix a bad hinge later.",
    ],
    timeHint: "Shutters should latch before the painter starts.",
  },
  "board-and-drawing": {
    why: [
      "Cheap board near a sink swells in the first monsoon.",
      "The word modular is not a grade of wood.",
      "Cutting before you agree door swings means remaking shutters.",
    ],
    timeHint: "Read the board grade on the sheet, and sign heights before cutting.",
  },
  "kitchen-carcass": {
    why: [
      "A raw plywood edge drinks humid air and swells.",
      "The day a pipe under the sink leaks, you need to reach the valve.",
      "The sink base takes water. Ordinary furniture board does not.",
    ],
    timeHint: "Check the sink cupboard before the countertop goes on.",
  },
  "shutters-hardware": {
    why: [
      "The hinge carries the shutter, not the laminate colour.",
      "A long wardrobe forced into a crooked wall will not close evenly.",
      "A drooping drawer shows up the first week you load it.",
    ],
    timeHint: "Open every shutter once before you pay for the polish.",
  },
  "services-and-lofts": {
    why: [
      "A chimney that ends inside a closed loft fills the kitchen with smoke.",
      "A socket trapped behind a box means cutting the shutter.",
      "A loft is not a godown. The slab was not designed for that unless the engineer said so.",
    ],
    timeHint: "Trace the chimney duct to the outside before the boxes are fixed.",
  },
  "false-ceiling": {
    optional: true,
    why: [
      "A false ceiling is a finish choice. The house does not need one to be safe.",
      "It can hide wiring and hold lights, and it costs extra.",
      "Bad hangers drilled into a beam can hit the steel. That part is not optional if you do choose a ceiling.",
    ],
    timeHint: "Decide before painting. Do not drill into beams.",
  },
  "ready-to-paint": {
    why: [
      "Paint on a damp new wall blisters and peels.",
      "Putty hides a crack for a month. It does not tie the joint.",
      "Waiting is free. Repainting is not.",
    ],
    timeHint: "After plaster has cured and dried. In humid weather this can take weeks.",
  },
  "primer-and-coats": {
    why: [
      "New cement plaster burns ordinary paint if the first coat is wrong.",
      "One thin coat looks finished on day one and fails.",
      "You will need the shade name for the first scuff.",
    ],
    timeHint: "Ask for a primer plus two finish coats, including the ceiling.",
  },
  "exterior-and-wet": {
    why: [
      "Outside paint is a different product from bedroom paint.",
      "The tops of sunshades take the rain first.",
      "Distemper in a bathroom does not survive water.",
    ],
    timeHint: "Include parapet tops and sunshade tops in the outside work.",
  },
  sanitary: {
    why: [
      "White cement around a toilet cracks and stains.",
      "A leak shows on the ceiling below, not always at the tap.",
      "You should be able to reach the small valve without breaking the tile.",
    ],
    timeHint: "Run every shower and watch the room below.",
  },
  "electrical-final": {
    why: [
      "The safety switch (RCCB or ELCB) cuts power if current leaks. It protects people.",
      "A geyser or AC on a light circuit can overheat.",
      "A wire twisted to a water pipe is not a real earth.",
    ],
    timeHint: "Press the test button on the safety switch before you move in.",
  },
  "fixtures-and-water": {
    why: [
      "A fan fixed only in plaster can fall.",
      "Rain dumped against the base of the wall soaks the foundation.",
      "A geyser above a ceiling needs a tray so a drip does not ruin the room.",
    ],
    timeHint: "Test fans, the geyser breaker, and one terrace outlet.",
  },
  "snag-and-papers": {
    why: [
      "The last payment is your leverage. A written list uses it.",
      "Drawings and shade codes disappear after the final bill.",
      "A smell of damp in the first year has a source. It is not 'normal'.",
    ],
    timeHint: "Walk the house before the last payment. Hold the papers the same day.",
  },
};
