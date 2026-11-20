/**
 * Stage guidance for a typical RCC-framed independent house in India.
 *
 * This is the content source for the journey cards and /stage/[id].
 * Add a stage by appending an object with the fields below; keep ids
 * sequential from 1. Pages should read this module rather than hard-coding copy.
 *
 * @typedef {'structure' | 'masonry' | 'plaster' | 'flooring' | 'openings' | 'woodwork' | 'paint' | 'handover'} StageIcon
 *
 * @typedef {Object} Stage
 * @property {number} id
 * @property {StageIcon} icon
 * @property {string} title
 * @property {string} summary One line on the journey card.
 * @property {string} metaDescription
 * @property {string} covers Short scope line under the title.
 * @property {string} description
 * @property {string[]} bestPractice
 * @property {string[]} minimumAcceptable
 * @property {string[]} checklist
 * @property {string[]} redFlags
 */

/** @type {Stage[]} */
export const stages = [
  {
    id: 1,
    icon: "structure",
    title: "Structural Construction",
    summary:
      "Foundation, columns, beams, and slabs. The frame everything else depends on.",
    metaDescription:
      "How to judge structural work on an independent house in India: foundations, RCC columns, beams, slabs, curing, and cover to steel.",
    covers: "Excavation, foundations, columns, beams, and slabs",
    description:
      "This is the reinforced-concrete frame of the house. Once a footing or a slab is cast, the steel, the cover around it, and the soil under it are no longer visible, and they are expensive to put right. Slow this stage down.",
    bestPractice: [
      "Get a soil investigation and give it to the structural engineer before the foundation is fixed. Filled ground, black cotton soil, and a high water table change the design. A trial pit the engineer has actually seen is the least a very small, uniform site should have.",
      "Build to the sanctioned structural drawings. Column size, bar diameter, number of bars, and stirrup spacing are not for the site to adjust.",
      "Use the concrete grade on the drawing. In towns, ready-mix concrete with a delivery ticket is the clearer record of what arrived. If you mix on site, measure cement, sand, and aggregate with gauge boxes. Do not judge it by the ghamela.",
      "Keep water in the mix under control. Extra water makes concrete easier to pour and weaker for the life of the house. It is the most common quiet compromise on a house site.",
      "Use TMT of the grade on the drawing. Fe 500D and Fe 550D are the ductile grades usually specified. Ask for mill test certificates. Reject bars with heavy rust, a reduced section, or a bend that has been opened and bent again in the same place.",
      "Use the cover shown on the drawing, with proper cover blocks rather than bits of brick or stone. Where a drawing is silent, engineers commonly call for about 50 mm in footings, 40 mm in columns, and 20 to 30 mm in slabs.",
      "The structural engineer should see the reinforcement, the cover, and the shuttering before every footing, column, and slab pour. The first slab is not the only one that matters.",
      "Place and vibrate the concrete in layers so the steel is surrounded. Stop before the mix separates. If honeycombing shows when the shuttering comes off, call the engineer before anyone hides it with a cement wash.",
      "Cure in earnest. Pond the slab, or keep hessian continuously wet. Ordinary Portland cement needs at least a week of moist curing. PPC and PSC, which are what most Indian house sites actually buy, and slabs in hot or windy weather, need longer: plan on 10 to 14 days, and start as soon as the surface can take it.",
      "Leave props under slabs for the period your engineer gives. IS 456 is the usual reference, and the period is longer for larger spans and for blended cements. Do not send slab props back with the shuttering gang after three or four days.",
      "Do anti-termite treatment of the foundation pits and the soil under the plinth before that floor is closed. Keep a written note of the product and where it was applied.",
      "Cast a continuous damp-proof course (DPC) at plinth level, above outside ground. It is usually a rich concrete layer or an equivalent barrier. Do not let later external plaster bridge over it and carry damp up the wall.",
      "Place sleeves for future pipes and cables before the pour. Cutting a beam or a slab afterwards is not a small favour.",
      "If a pour has to stop, stop where the engineer allows a joint. A cold joint through the middle of a slab or a beam, smoothed over because the mixer was late, is a structural defect.",
    ],
    minimumAcceptable: [
      "A soil report, or trial pits the structural engineer has seen, before the foundation depth is decided.",
      "Concrete no leaner than the drawing. Do not drop below M20 for the frame if that is what was designed.",
      "ISI-marked cement of a known brand, and TMT from a supplier who will show a test certificate. Store both off the ground and covered.",
      "Cover blocks in place, shuttering that holds its line, and a needle vibrator actually used during the pour.",
      "The structural engineer inspects before each slab is cast, not only the first one.",
      "Moist curing for at least 7 days, and longer when the cement is PPC or PSC or the weather is hot and dry.",
      "Slab props kept for at least the period in IS 456 for your span.",
      "Anti-termite treatment at foundation and plinth, and a DPC that runs the full length of the walls without a gap.",
    ],
    checklist: [
      "The soil report is on site and matches the soil the engineer designed for.",
      "Excavation depth, width, and founding level match the drawing. Loose soil has not been thrown back in to make up the level.",
      "Standing water has been removed. Concrete is not going into a flooded pit.",
      "Plain cement concrete (PCC), the bedding under the footing, is done and level before footing steel is placed.",
      "Bar diameters, numbers, and stirrup spacing match this member on the drawing.",
      "Laps are at the location and length the drawing shows, and they are tied.",
      "Cover blocks are tied on the sides and the soffit, not pushed in after the pour starts.",
      "Shuttering is aligned, braced, and closed enough that slurry will not run out.",
      "Sleeves needed in this pour are fixed. Stair bars, if this pour includes them, match the drawing.",
      "The engineer has given a clear go-ahead before the concrete arrives.",
      "Curing water, mortar bunds, or hessian are on site before the pour, including a plan for Sunday.",
      "The date of the pour is written down so nobody strikes the props early.",
    ],
    redFlags: [
      "“The soil here is always good” used to skip a test, especially on filled plots or black cotton soil.",
      "Foundation depth reduced to save excavation or concrete.",
      "A proposal to shrink a column, drop a few bars, or open up the stirrup spacing.",
      "Water added freely at the mixer or the pump.",
      "Heavily rusted steel, or bars straightened and bent again at the same point.",
      "No cover blocks, or stone and brick pieces used in their place.",
      "A slab poured because the mixer was booked, before the engineer has seen the steel.",
      "Honeycombing covered with a cement wash before anyone inspects it.",
      "Slab props removed within a few days so the plates can go to another house.",
      "A chisel or a core cutter opening a beam or a slab for a pipe that should have been a sleeve.",
      "No one responsible for curing through a hot week or a festival break.",
    ],
  },
  {
    id: 2,
    icon: "masonry",
    title: "Masonry + Concealed Services",
    summary: "Walls, and the pipes and wires that will be hidden inside them.",
    metaDescription:
      "Brick and AAC blockwork, concealed electrical and plumbing, and waterproofing before plaster, for Indian independent houses.",
    covers: "Walls, electrical conduits, plumbing, and waterproofing",
    description:
      "Walls divide the house, and the first services go inside them: conduits, water supply, and drainage. This assumes a reinforced-concrete frame with infill walls of clay brick or AAC block, which is how most independent houses in Indian towns and cities are built. A load-bearing wall is a different structure. Do not chase or thin it without the engineer.",
    bestPractice: [
      "Soak clay bricks properly before laying, long enough that they stop pulling water out of the mortar. A quick splash is not soaking. AAC blocks (autoclaved aerated concrete) are the opposite: do not soak them. Use the thin-bed adhesive and the joint thickness the block maker specifies, a few millimetres, not a thick cement joint.",
      "For clay brick, a 1:6 cement-sand mortar is typical for 230 mm walls, and a richer 1:4 mix is commonly used for 115 mm partitions. Sand full of silt makes a weak, dusty joint.",
      "Keep walls plumb, in one line, and to the thickness agreed. Rake clay-brick joints a little so the plaster has a key. Pack the gap between the top of the wall and the beam properly. It is not a place for loose rubble and a smear of mortar on plaster day.",
      "Provide a lintel over every opening, with bearing on both sides, commonly 150 mm or more. The door or window frame must not carry the wall above it. In seismic areas, cast the lintel and sill bands the drawing shows.",
      "Plan chases before the walls are finished. Cut them neat and shallow, as a rule not deeper than about a third of the wall, and avoid long horizontal cuts in a thin partition. Vertical drops are kinder to the wall.",
      "Use heavy-gauge PVC conduit, with a junction box wherever a wire will be drawn or joined, and leave a draw wire inside. Keep power separate from TV and data. House circuits should be copper. Plan the distribution board, the earthing, and dedicated circuits for air-conditioners, the geyser, and the kitchen now.",
      "Run water supply in CPVC or a comparable ISI pipe, and drainage in the right grade of SWR or PVC pipe. Pressure-test supply lines and water-test drains before a chase is covered. Hold supply pressure long enough to walk every joint. An hour is a sound habit.",
      "Give waste pipes a continuous fall, commonly around 1 in 40 to 1 in 60 for smaller lines. No sags, no backfall, and a vent so the traps are not sucked dry.",
      "Waterproof sunken toilet slabs, balconies, and wet terraces before the filling goes in. Turn the layer up the wall, form a cove at the junction, and pond-test for at least 48 hours. Carry shower waterproofing up to shower height.",
      "Pass pipes through sleeves that were cast into the slab. Do not break a beam to slip a pipe through.",
      "Cure brick masonry for about 7 days. Agree floor levels, slopes, and drain points before the walls make them hard to change.",
      "Photograph every concealed line before it is covered. Those photos are the drawing you will wish you had.",
    ],
    minimumAcceptable: [
      "Clay bricks soaked, or AAC laid with the correct adhesive. Not whichever is faster.",
      "Mortar that holds, walls reasonably plumb, and a lintel with bearing over every opening.",
      "Conduits, boxes, and pipes on an agreed layout before plaster starts.",
      "A pressure test of water lines and a water test of drains before they are hidden.",
      "Waterproofing and a pond test of every sunken toilet and balcony.",
      "Chases that do not cut through most of a thin wall, and no pipe routed by breaking structural concrete.",
      "A decided place for the distribution board, and an earthing plan, before the plinth and the walls are closed.",
    ],
    checklist: [
      "Wall material and thickness match what you agreed, brick or block.",
      "Openings match the door and window sizes and sill heights.",
      "Every opening has a lintel bearing on both sides.",
      "The top of each wall is packed tight to the beam.",
      "Switch heights, socket positions, AC outlets, and the board location are marked and match your list.",
      "Conduits are firm, boxes will sit flush with the plaster, and a draw wire is in each run.",
      "Supply joints were watched while the line was under pressure.",
      "Drainage has fall, traps are in the right place, and a vent is provided.",
      "Sunken slabs and balconies are waterproofed, sloped, and pond-tested. The level did not drop, and the ceiling below stayed dry.",
      "No chase or pipe has cut a column or a beam.",
      "You have photos of the concealed work before it is covered.",
    ],
    redFlags: [
      "Dry clay bricks going into the wall, or AAC blocks drowned and laid in thick cement mortar.",
      "An opening with no lintel, or a lintel that barely sits on the wall.",
      "Long horizontal chases, especially in 115 mm walls.",
      "Plumbing or conduit covered with no test and no photograph.",
      "“We will waterproof after the tiles” in a sunken bathroom. The layer has to be under the filling.",
      "A mason breaking a beam, a column, or a slab to pass a pipe.",
      "Aluminium house wiring, or power and data stuffed into one conduit with no boxes.",
      "A drain that holds water when you pour a bucket, or a floor trap set proud of the future floor.",
      "Earthing described as something to poke in at the end, after the ground is closed.",
      "The distribution board planned inside a bathroom.",
    ],
  },
  {
    id: 3,
    icon: "plaster",
    title: "Plastering",
    summary: "Straight, sound plaster. The last chance to get the walls true.",
    metaDescription:
      "Plastering an RCC-framed house: thickness, mesh at concrete-masonry joints, curing, and what to check before the walls are finished.",
    covers: "Internal and external plaster, including ceilings and wet rooms",
    description:
      "Plaster makes the masonry look finished. Its real job is a true coat, of the right thickness, that stays on the frame. It also covers every pipe. Once it is on, you are trusting the tests from the previous stage.",
    bestPractice: [
      "Plaster only after the masonry has cured and after chasing, pressure tests, and wet-room waterproofing are done.",
      "Hack smooth concrete on columns, beams, and slab soffits, or apply a bonding agent, so the coat has something to hold. Plaster on a mirror-smooth slab with no bonding coat is a common reason ceilings drum and fall in patches.",
      "Fix alkali-resistant mesh or chicken mesh across every junction of concrete and masonry, lapping about 150 mm onto both. Do the same diagonally at the corners of doors and windows, where cracks like to start.",
      "Keep the thickness in check: about 12 mm inside, and about 15 to 18 mm outside. If a wall needs 30 or 40 mm of plaster to look straight, the wall is the problem. Correct the masonry, or accept an honest line.",
      "A common internal mix is about 1:6 cement to sand, and a richer mix, about 1:4, outside, often with a waterproofing compound in the external coat. If a jar of sand and water settles with a thick mud layer, the silt is too high.",
      "Form drip moulds under chajjas (the concrete sunshades) and window sills, so rain falls clear of the wall instead of running back in.",
      "In bathrooms and the kitchen, carry a waterproof coat up the splash and shower zone before tiling. Paint on a bathroom wall is not a waterproofing system.",
      "Check the plane with a straightedge: corners, window reveals, and the line above the future skirting. That is where uneven work shows for years.",
      "Cure for at least 7 days, longer in hot weather, and do not let a fresh wall bake in the afternoon sun. A neat-cement skin over a whole wall looks smooth on day one and hairline-cracks soon after. Use it only where it was actually specified.",
    ],
    minimumAcceptable: [
      "Mesh at every concrete-to-masonry junction, including beside columns and under beams.",
      "Internal plaster around 12 mm, and a continuous external coat, slightly richer, including parapets and the tops of chajjas.",
      "A bonding coat or proper hacking before ceiling plaster.",
      "Wet areas protected before tiles.",
      "Seven days of curing, and no plastering over a wall that is still being chased.",
      "Lines straight enough that frames, tiles, and wardrobes will not need thick packing later.",
    ],
    checklist: [
      "Chases are closed, and wet-area waterproofing is finished and tested.",
      "Mesh is fixed at frame-to-wall junctions and at opening corners.",
      "Thickness has been checked in a few places, not only judged from across the room.",
      "Ceiling plaster has a key or a bonding agent.",
      "External drips and outward sill slopes are formed.",
      "A straightedge lies flat on the wall at corners and reveals.",
      "Someone is responsible for curing for the next week, including Sunday.",
      "You have looked along the walls in a low, raking light, when waves show, before the next stage starts.",
    ],
    redFlags: [
      "Plaster thickness used to hide a wall that is out of plumb.",
      "No mesh where brick or block meets a column or a beam.",
      "Ceiling plaster over glossy concrete with nothing to bond it.",
      "Plaster that dusts off on your hand after it has cured.",
      "A neat-cement skin over entire rooms.",
      "Plasterers and electricians cutting the same wall on the same day.",
      "A single splash of water, then the scaffolding comes down.",
      "A leak, a salt stain, or a damp patch plastered over so the bill can be raised.",
    ],
  },
  {
    id: 4,
    icon: "flooring",
    title: "Flooring / Tiles",
    summary: "Levels, slopes, and joints you will walk on every day.",
    metaDescription:
      "Tile and flooring guidance for Indian homes: wet-area slopes, adhesives for vitrified tiles, grout, movement joints, and hollow spots.",
    covers: "Floor tiles, dado, skirting, bathrooms, balconies, and terraces",
    description:
      "Flooring locks in the levels of the house: the fall in a bathroom, the height at a door, the step at a balcony. Large vitrified tiles are unforgiving. A hollow patch or a backfall is something you hear, trip on, or mop every morning.",
    bestPractice: [
      "Tile only on a cured, clean substrate. In bathrooms, balconies, and on the terrace, the waterproofing and the pond test come first. Tiles are not the waterproof layer.",
      "Set the floor out from the most visible line in the room, so you are not left with a sliver beside the main door. Agree the pattern and the direction before anyone mixes adhesive. Buy a spare box from the same batch and keep it.",
      "Use a polymer-modified tile adhesive suited to the tile. Vitrified and large-format tiles need that adhesive, not a thick bed of site-mixed sand and cement. Back-butter large tiles so the bed is full. A hollow tile cracks later, often under a chair leg.",
      "Keep joints even with spacers. A hairline paper joint chips and cannot be grouted. Around 2 to 3 mm is a practical indoor minimum unless the tile maker says otherwise.",
      "Leave movement joints at the perimeter, over structural joints, and in long runs, and fill them with a flexible sealant. A hard grout with no relief is where a long floor lifts.",
      "Fall wet floors toward the floor trap. Before grouting, pour a mug of water. It should reach the trap from every corner and not sit in a puddle. Correct the tile now if it does not.",
      "Use epoxy grout, or a proper waterproof grout, in bathrooms and on the kitchen floor and dado. White cement used as grout stains, cracks, and washes out.",
      "Provide a skirting, and seal the joint at the floor. External steps, parking, and bathrooms need a slip-resistant surface. A polished tile is dangerous when it is wet.",
      "Keep balcony and bathroom floors lower than the room inside, and turn the waterproofing up at that junction, so rain has no path in.",
      "Finish visible cut edges cleanly. A row of chipped cuts along a corridor is workmanship, not a defect in the tile.",
    ],
    minimumAcceptable: [
      "Waterproofing pond-tested before bathroom, balcony, or terrace tiles.",
      "A full bed under the tiles, adhesive for vitrified and large tiles, and no large hollow areas when you tap them.",
      "Even joints, fully grouted, with epoxy or waterproof grout in wet rooms.",
      "Water from every part of a bathroom floor reaching the trap, with no ponding.",
      "Skirting on, and levels at doors and balconies that do not trip you or invite rain inside.",
      "Spare tiles kept from the same batch, with the shade code written down.",
    ],
    checklist: [
      "Batch and shade numbers match across the boxes for that room.",
      "The starting line is marked, and you have agreed it.",
      "Wet-area waterproofing is signed off and pond-tested.",
      "Vitrified tiles are going down in a labelled tile adhesive.",
      "Spacers are being used.",
      "You have poured water on the bathroom floor before grouting.",
      "Grout is complete, including at the skirting, with flexible sealant at wet-area corners.",
      "Running a hand across the joints, one tile does not stand proud of the next.",
      "A tap with a coin does not find a hollow patch larger than a small spot.",
      "Spare tiles, the shade code, and the adhesive name are written down somewhere you will find them.",
    ],
    redFlags: [
      "Tiling a sunken bathroom or a terrace that was never pond-tested.",
      "Large vitrified tiles on a thick, loose sand-cement bed, sounding hollow under a knock.",
      "Paper joints, or white cement slurry wiped over the face and called grout.",
      "Water pooling away from the floor trap, or a trap sitting above the tiles around it.",
      "A balcony or bathroom finished higher than the room beside it.",
      "Obvious shade differences waved through because the boxes were already opened.",
      "Cracked tiles placed in corners because they will sit under a wardrobe.",
      "A terrace with no fall, or an outlet blocked by the tile or the coba.",
    ],
  },
  {
    id: 5,
    icon: "openings",
    title: "Doors & Windows",
    summary: "Openings that stay square, and keep the rain on the outside.",
    metaDescription:
      "Doors and windows for independent houses in India: seasoned wood, aluminium and UPVC, sill slopes, glass, and rain.",
    covers: "Wooden, aluminium, and UPVC frames, shutters, glass, and hardware",
    description:
      "Doors and windows are opened, slammed, and rained on, and they are expected to latch in ten years. The usual choices are seasoned wood, aluminium, or UPVC. The frame matters more than the polish. A twisted frame never grows a straight shutter.",
    bestPractice: [
      "Wooden frames should be seasoned, ideally kiln-dried, and around 10 to 14 percent moisture when they are fixed. A moisture meter is a small tool that prevents a large argument. Whatever the species, unseasoned wood will shrink and open gaps after the first dry season.",
      "Treat timber against termite before it is fixed, and store it off damp floors. Do not take delivery of frames lying in wet mud.",
      "Fix frames plumb and square. Holdfasts or stainless fasteners should go into concrete or properly plugged masonry, commonly three each side of a door, and the holdfasts should be grouted. The lintel spans the opening. The frame is not a post.",
      "Leave a small, even gap for movement and seal the outside with a compatible sealant. Packing the whole gap with wet cement against wood holds damp against the timber and rots the foot of the frame.",
      "Slope window sills outward. A chajja needs a drip groove on the underside so water falls clear instead of running back to the head of the window. External doors need a threshold that stops rain walking in.",
      "Aluminium should be powder-coated or anodised, thick enough that a shutter does not flex when you push a corner, and specified with a coating thickness. Around 50 microns is a common ask. UPVC profiles should be multi-chamber, with the galvanised steel reinforcement the system needs, and with welded corners.",
      "Glass in bathrooms, in doors, near the floor, and in large panes should be toughened. Look for the toughening mark. Ordinary glass in a bathroom door is an injury waiting for a wet floor.",
      "Hardware is the part you touch: hinges sized for the shutter, a lock you are willing to live with, tower bolts that meet their keepers, and a stopper so the shutter does not punch the plaster. Decide on mosquito mesh now, while the frame can still take it.",
      "A shutter that binds, or that swings open on its own, is a frame out of plumb. Adjust it before paint makes everyone reluctant to remove a screw.",
      "Talk about fire exit before bedroom grills are welded permanent. At least one opening you can actually use on an upper floor is a serious matter, not a finishing detail.",
    ],
    minimumAcceptable: [
      "Seasoned wood, or an aluminium or UPVC system with reinforcement and gaskets. Not green timber, and not metal you can flex with one hand.",
      "Frames plumb and square, fixed with holdfasts or proper anchors.",
      "Sills sloping out, and a seal against driving rain on the weather side.",
      "Toughened glass where a person can walk into it or fall against it.",
      "Hardware that latches, hinges that carry a full shutter, and a threshold at external doors.",
      "Timber stored and fixed dry, with a termite treatment if it is wood.",
    ],
    checklist: [
      "Frame sizes match the openings, with an even margin, and each frame is plumb both ways.",
      "A sample of wooden frames has been checked for moisture if the lot looks freshly milled or unusually heavy.",
      "Holdfasts are grouted, not bent back into a chase.",
      "Water poured on the sill runs out, not in. The drip at the head is actually there.",
      "Shutters close onto their latch without being lifted on the hinges.",
      "Glass has the toughening mark where you asked for toughened glass.",
      "Gaskets are continuous. A closed window shows no daylight at the meeting styles.",
      "The first heavy rain, or a careful hose test, leaves the inside sill dry.",
      "Locks, stoppers, and mesh are in this bill, not a vague extra.",
      "Upper-floor grills still leave a usable way out, and you have agreed which opening that is.",
    ],
    redFlags: [
      "Timber that smells fresh, feels heavy with sap, or shows wide green cracks, with a promise that it will settle.",
      "Frames stored in sun and rain for weeks.",
      "A twisted frame forced into the opening, shutter still to come.",
      "Cement packed hard against wood all round the frame.",
      "Sills sloping the wrong way, or dead flat, on the monsoon face of the house.",
      "Aluminium you can flex by hand, or UPVC with no steel inside the profile.",
      "Ordinary glass in a bathroom or in a large pane someone can fall against.",
      "Hinges too small for a solid main door, already complaining at installation.",
      "Bedroom grills welded so there is no way out, and nobody has discussed it.",
    ],
  },
  {
    id: 6,
    icon: "woodwork",
    title: "Interior Woodwork",
    summary:
      "Kitchens and storage built for humidity, not just for handover day.",
    metaDescription:
      "Interior woodwork and kitchens for Indian homes: plywood grades, edge banding, hardware, sink units, and monsoon humidity.",
    covers: "Kitchen, wardrobes, lofts, and other fixed furniture",
    description:
      "Kitchens, wardrobes, and lofts live in a humid climate and, in the kitchen, next to water and heat. Most failures are not about the laminate colour. They are about the grade of board, the edges, and the hardware, and they show up in the second monsoon.",
    bestPractice: [
      "Use the right board. Plywood in a kitchen should be boiling-water-resistant (BWR) at a minimum. Under and around the sink, use boiling-water-proof plywood (BWP, marine grade) or a board the maker rates for standing water. Moisture-resistant (MR) and commercial plywood are for dry furniture. Particle board swells when a tap drips. It is not a kitchen carcass.",
      "Let boards sit in the house for a few days before cutting, so they meet the room rather than the godown.",
      "Draw the kitchen and the wardrobes before a saw comes out: heights, which way shutters open, the fridge and dishwasher niches, and the chimney height the appliance maker specifies. A carpenter’s “standard” is not your tap position.",
      "An 18 mm carcass is normal good practice, with a shutter to match and a back that sits in a groove. Edge-band every exposed edge, including the shelf fronts you will touch. A raw plywood edge drinks monsoon air.",
      "Give the sink unit a waterproof base and a tray or lining so a leak comes out where you can see it. Keep the shut-off valves reachable. A braided hose fails on a Tuesday, and you should not have to break the cabinet to reach it.",
      "Hardware carries the shutter. Use hinges and drawer channels rated for the size, screwed into solid board. A tall pantry shutter wants three hinges, not two.",
      "Do not force a long wardrobe into a wall that is out of plumb. Pack or scribe the end panels. That is how shutters stay aligned.",
      "Settle the services before the boxes are fixed: the chimney duct leaving the kitchen rather than dumping into a closed loft, the hob cut-out, the water purifier, and the sockets. A socket trapped behind a finished carcass means a cut shutter.",
      "Seal cut edges in wet zones. Ventilate the room while adhesives and polish cure, and do not sleep in a room the night a fresh coat goes on.",
      "Ventilate lofts, and do not load them like a godown. The slab above was not designed as a surprise mezzanine unless the engineer said so.",
    ],
    minimumAcceptable: [
      "BWR plywood for kitchen carcasses, and BWP or a genuinely waterproof board under the sink. Not MR, and not particle board.",
      "Edge banding on exposed edges.",
      "An 18 mm carcass, shutters that sit even, and hardware that does not sag when a drawer is loaded.",
      "Valves and the area under the sink left accessible.",
      "A chimney path to the outside, and sockets where the appliances actually stand.",
      "No raw board edges in the kitchen or in a loft over a bathroom.",
    ],
    checklist: [
      "You have seen the board grade stamped or printed, not only heard the name.",
      "Heights, widths, and door swings are drawn or marked, and you have agreed them before cutting.",
      "The sink base is the waterproof grade you agreed.",
      "Edge band is on, including shelves.",
      "Shutters have even gaps and close fully. Drawers run out and do not droop.",
      "Hinges feel firm with the shutter open.",
      "The chimney duct, hob, and appliance sockets are in the right place.",
      "You can reach the shut-off valves without unscrewing the unit.",
      "Loft doors open, and the loft does not block a terrace outlet.",
      "Polish and adhesive have had time to cure before clothes go in.",
    ],
    redFlags: [
      "Commercial or MR plywood anywhere near the sink, a dishwasher, or a wall that takes rain.",
      "A “modular” kitchen quote that never names the board under the sink. The word modular is not a grade.",
      "No edge banding, with a promise to touch it up with polish.",
      "Shutters already warped, or hung on two small hinges.",
      "The shut-off valve buried behind a fixed panel.",
      "A chimney emptying into a sealed loft or a false ceiling.",
      "Units so far out of level that the counter is packed up with a thick mortar pad.",
      "Hardware listed only as “local”, with no maker’s name in the quotation.",
    ],
  },
  {
    id: 7,
    icon: "paint",
    title: "Painting",
    summary: "A finish that stays put, because the wall underneath was ready.",
    metaDescription:
      "When and how to paint a new Indian house: dry plaster, alkali-resistant primer, exterior coats, wet rooms, and shade codes.",
    covers: "Preparation, primer, putty, interior and exterior finish coats",
    description:
      "Paint is the most visible stage and a poor one to rush. New plaster is alkaline and still giving up moisture. Paint that goes on too soon blisters, peels, or grows dark patches along the beams, usually just after the painter has left.",
    bestPractice: [
      "Cure the plaster, then let it dry. In dry weather that can be a few weeks. In the monsoon or on the coast it takes longer. The wall should look evenly pale, not patchy-dark. Tape a piece of polythene to it overnight. If the inside of the sheet comes away wet, the wall is not ready.",
      "Repair cracks before putty, and ask why a crack is there if it is still moving. A missed mesh joint or a leak will return. Putty fills. It does not tie a joint.",
      "On new cement plaster use a primer that can take the alkali, then acrylic wall putty inside, in thin coats, sanded between coats. A thick skim applied to fake a straight wall cracks and drums.",
      "Do not use interior putty or interior emulsion outside. External walls, including the tops of chajjas and parapets, need an exterior-grade system. Those tops take the rain first.",
      "Plan on a primer and two finish coats, thinned only as the tin allows. Paint stretched far past the instructions is how one coat is made to look like two.",
      "Bathrooms and kitchens need a washable, moisture-tolerant finish where the wall is painted, and tile or a real waterproof coat where water runs. Distemper does not belong in a bathroom.",
      "Ceilings show every skip. They get the same number of coats.",
      "Mask frames, switches, and floors. Paint on a teak edge or a switchboard is rework.",
      "Keep one batch on a single wall where you can, and write down the shade codes. You will need them for the first scuff.",
      "Stop leaks before you paint them. A sensible sequence is primer and putty, then the dusty part of the woodwork, then finish coats once the sanding dust is gone.",
      "Ventilate while the film cures, and keep the room out of daily use until the smell has gone.",
    ],
    minimumAcceptable: [
      "Plaster cured and visibly dry. No paint over dark damp patches.",
      "An alkali-resistant primer on new plaster, then two finish coats.",
      "Exterior paint on every external surface, tops of chajjas and parapets included.",
      "A washable paint in kitchens and bathrooms where the wall is not tiled.",
      "Putty used thin, to fill, not to rebuild the wall.",
      "Shade names written on the quotation or kept on a tin lid.",
    ],
    checklist: [
      "The overnight polythene test, or a moisture reading, says the walls are ready.",
      "Cracks at columns, beams, and window corners have been opened and meshed or sealed, not only stuffed with putty.",
      "Primer meant for new plaster has actually gone on.",
      "Two finish coats are in the bill and on the wall.",
      "Parapet tops and chajja tops are in the scope.",
      "Wet rooms are not finished in distemper.",
      "Switchboards, floors, and frames are clean at the end of the work.",
      "Shade codes and the number of tins are noted.",
      "Any stain from a leak was traced and stopped before it was painted.",
    ],
    redFlags: [
      "Painters starting while the plaster is still cool and dark with moisture.",
      "One coat, or paint thinned until it runs like milk.",
      "Interior putty or an interior emulsion on the weather face.",
      "A thick skin of putty over a wavy wall.",
      "Damp at the bottom of ground-floor walls painted over. That often means the damp-proof course is missing or bridged.",
      "Mould on a ceiling painted without anyone opening the bathroom above.",
      "No named system for the exterior: no primer, no stated number of coats.",
      "Nobody can tell you the shade code a month later.",
    ],
  },
  {
    id: 8,
    icon: "handover",
    title: "Final Fittings & Handover",
    summary: "Taps, switches, snags, and the papers you should not leave without.",
    metaDescription:
      "Final fittings and handover for an independent house: leaks, the electrical board, earthing, a snag list, and the drawings to collect.",
    covers: "Sanitary fittings, electrical board, snags, and documents",
    description:
      "Final fittings are what you will touch every day. Handover is the moment to be slow. Water, power, and drainage should be tried as one system. Hold the last payment against a written snag list. A house is not finished because the calendar says so.",
    bestPractice: [
      "Fit sanitaryware and chrome fittings that are ISI-marked, from makers who will still have a spare cartridge or a seat in five years. Seal the WC, the basin, the counter, and the kitchen sink with sanitary silicone. White cement cracks and stains.",
      "Test supply and drains again with everything connected. Fill each bathroom, run the shower, and watch the ceiling below and the floor trap. Angle valves should be reachable. Traps should be something you can open later.",
      "The distribution board should have a residual-current device (RCCB or ELCB), the safety switch that cuts power if current leaks to earth, at 30 mA for the circuits people can touch. Bathrooms and the kitchen belong on it. MCBs should match the wire and the load. Geysers and air-conditioners sit on their own circuits. Label every circuit in words a guest can read.",
      "Earthing should be a real electrode that has been tested. A wire twisted onto a water pipe is not an earth. A geyser or a metal board without one is a shock risk.",
      "Hang fans and heavy lights from the hooks and boxes left in the slab, not from a plug in weak plaster. Check that the fan is firm and that its control actually works.",
      "If a geyser sits in a loft, give it a drip tray and a safe place for the discharge. Follow the maker’s electrical rating.",
      "Connect terrace outlets and rainwater pipes so water leaves the building. It should not pond at the foot of the wall or pour into the soil against the foundation. Clean the overhead tank and the sump before anyone drinks from them, and check the overflow.",
      "Walk every room with a list: cracks, lippage, chips, doors that do not latch, paint on the floor, a missing stopper, a rocking switch, a dripping tap, a slope that pools. Write it, photograph it, agree a date, and walk it again.",
      "Collect the papers before the final bill: sanctioned drawings, structural drawings, the soil report, waterproofing and anti-termite records, paint shade codes, warranties, the electrical schedule, spare tiles, and every key.",
      "Pay the last bill against that list. “We will come next week” is how snags become yours.",
    ],
    minimumAcceptable: [
      "Every tap, trap, and WC tried with water, and no active leak left for later.",
      "An RCCB or ELCB in the board, labelled MCBs, and a working earth.",
      "Silicone at sanitary joints, and angle valves you can turn.",
      "Fans and lights secure, geysers on their own circuit, terrace water leaving through an outlet.",
      "A written snag list you have walked, and the drawings, keys, and shade codes in your hand before the last payment.",
    ],
    checklist: [
      "Each bathroom has been filled and drained. The ceiling below stayed dry. The floor empties to the trap.",
      "The kitchen sink, the washing-machine point, and the purifier point do not leak at the valve.",
      "Terrace outlets and rainwater pipes run clear, and water is not collecting against the plinth.",
      "The overhead tank is clean. Overflow and washout are connected.",
      "The RCCB or ELCB trips when you press its test button. Circuits are labelled.",
      "A tester confirms earth and phase at the geyser, the kitchen, and the AC points.",
      "Every door latches, every window locks, stoppers are on, and keys are tagged.",
      "The snag list is written, shared, and checked a second time.",
      "You hold drawings, warranties, shade codes, spare tiles, and the anti-termite and waterproofing notes.",
      "The septic tank, soak pit, or sewer connection is complete and not leaking at the first chamber. If it sits too close to a well or a bore, stop and ask before the ground is closed. Local rules set that distance.",
    ],
    redFlags: [
      "The final payment is due today, and the snag walk is “whenever you are free”.",
      "No RCCB or ELCB, or one that does not trip on the test button.",
      "Earthing described as a connection to the plumbing.",
      "A geyser or an AC on a lighting circuit, or a switchboard that runs warm.",
      "White cement as the only seal around a WC or a countertop.",
      "A floor trap that holds a puddle, found on the day you move in.",
      "Rain from the terrace spilling off an unfinished spout into the foundation soil.",
      "No drawings, no waterproofing record, and no one who knows the paint shade.",
      "Keys that do not match a tagged set.",
      "“Seepage is normal in the first year.” Seepage has a source. Find it before you furnish the room.",
    ],
  },
];

const ICONS = new Set([
  "structure",
  "masonry",
  "plaster",
  "flooring",
  "openings",
  "woodwork",
  "paint",
  "handover",
]);

stages.forEach((stage, index) => {
  if (stage.id !== index + 1) {
    throw new Error("Stage ids must run 1..n in order");
  }
  if (!ICONS.has(stage.icon)) {
    throw new Error(`Stage ${stage.id} has an unknown icon`);
  }
  for (const key of [
    "bestPractice",
    "minimumAcceptable",
    "checklist",
    "redFlags",
  ]) {
    if (!Array.isArray(stage[key]) || stage[key].length < 4) {
      throw new Error(`Stage ${stage.id} is missing ${key}`);
    }
  }
});

/**
 * @param {string | number} id
 * @returns {Stage | null}
 */
export function getStage(id) {
  return stages.find((stage) => String(stage.id) === String(id)) ?? null;
}

/**
 * @param {string | number} id
 * @returns {{ previous: Stage | null, next: Stage | null }}
 */
export function getNeighbors(id) {
  const index = stages.findIndex((stage) => String(stage.id) === String(id));
  if (index === -1) {
    return { previous: null, next: null };
  }
  return {
    previous: stages[index - 1] ?? null,
    next: stages[index + 1] ?? null,
  };
}
