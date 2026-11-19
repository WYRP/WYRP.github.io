/*
  ============================================================
  YOUR PROJECTS — this is the only file you need to edit to
  add, remove, or reorder projects. Projects show in this order.
  ============================================================

  Each project:
    id          short unique name, no spaces (used in the URL, e.g. #project-auv-clark)
    title       project name
    year        e.g. "2025"
    summary     one sentence shown on the card
    description longer text shown when the project is opened (separate paragraphs with \n\n)
    tags        list of skills/categories, used for the filter buttons
    thumbnail   (optional) image shown on the card. If left out, the first image
                or YouTube video below is used automatically. Use  thumbnail: false  to keep
                the plain colored card (good when the only images are charts).
    thumbnailPosition (optional) which part of the image the card shows when it is
                cropped, as "left% top%". "0% 50%" = left side, "100% 50%" = right side.
    hidden      (optional) true = keep the project here but don't show it on the site.
                Delete the line (or set it to false) to show it again.
    links       (optional) buttons like GitHub, paper, live demo
    media       list of images/videos shown when the project is opened. Types:
                  { type: "image",   src: "assets/projects/<id>/photo1.jpg", caption: "..." }
                  { type: "video",   src: "assets/projects/<id>/demo.mp4",   caption: "..." }   (keep under ~50MB)
                  { type: "youtube", id:  "dQw4w9WgXcQ",                     caption: "..." }   (the part after watch?v=)
                    YouTube clips can also take  start: 112, end: 151  (seconds) to play only that part,
                    and  poster: "path/to/still.jpg"  to show your own still until play is pressed.
                  { type: "vimeo",   id:  "76979871",                        caption: "..." }
                  { type: "text",    heading: "What I changed", body: "Paragraph.\n\n- bullet one\n- bullet two" }
                Videos can also take  poster: "path/to/still.jpg"  and  loop: true  (plays silently on repeat, like a GIF).
                If a project has any "text" items, the description is shown first and the media/text
                items follow in order, so you can tell a before/after story.

  Put your files in:  assets/projects/<project-id>/
  Projects with an empty media list show a colored card until you add photos/videos.
*/

window.PROJECTS = [
  {
    id: "compliant-revolute-joint",
    title: "Compliant Revolute Joint for a Soil Surface Sampler",
    year: "2025 – present",
    summary: "MSc thesis: a 1-DOF flexure joint to replace the rigid joints on a soil surface sampler.",
    description:
      "My MSc thesis at the University of Alberta, supervised by Prof. Michael Lipsett. A compliant joint bends instead of sliding or rolling: one flexible piece replaces the pins, bearings and gears of a rigid joint, so there is less to wear out and nothing to lubricate. " +
      "I'm finding out which 1-DOF compliant revolute joint can replace the rigid joints on a robotic soil surface sampler. This work is in progress.",
    tags: ["Mechanical Design", "FEA", "Research"],
    thumbnail: "assets/projects/compliant-revolute-joint/split-tube-card.jpg",
    media: [
      { type: "text", heading: "The application",
        body:
          "The project builds on an earlier University of Alberta robotic soil surface sampler: a gear-driven aluminum scoop, 122.5 mm wide and 130 mm tall. I keep its gear drive and replace the rigid supporting joints with compliant hinges, then study how that change affects the gear-driven motion.\n\n" +
          "From the sampler, the joint has to:\n\n" +
          "- rotate about the scoop axis, with one degree of freedom\n" +
          "- give at least 90° of travel: ±45° from one joint, or ±22.5° each from two identical joints in series\n" +
          "- carry side loads of at least 7 N horizontally and 4.5 N vertically\n" +
          "- fit within the 122.5 mm sampler width, around the 105 mm scoop radius\n" +
          "- last through repeated sampling cycles without fatigue failure" },

      { type: "text", heading: "Comparing the candidates",
        body:
          "I reviewed the main families of 1-DOF compliant revolute joints: notch flexures, cross-axis flexural pivots, cartwheel and butterfly flexures, split-tube flexures, and helical (HEL and SPIR) joints. I also reviewed the methods used to analyze them: beam theory, Castigliano's theorem, the compliance matrix method, pseudo-rigid-body and beam-constraint models, and finite element analysis.\n\n" +
          "Published results use different materials, sizes and test methods, so I put the joints on a common footing wherever the sources allowed. I compared them on rotation range, axis drift (parasitic motion), on-axis stiffness, off-axis to on-axis stiffness ratio, and fatigue life. Rotation range screens out most candidates first." },
      { type: "image", src: "assets/projects/compliant-revolute-joint/rotation-range-screen.png",
        caption: "First screen: how far each joint can rotate before it yields, for the same aluminum alloy and dimensions in every case. Blue joints can meet the 90° requirement, alone (past ±45°) or as a pair (past ±22.5°). Chart I made from the analytical data in Farhadi Machekposhti et al. (2015)." },
      { type: "image", src: "assets/projects/compliant-revolute-joint/split-tube-cad.jpg",
        caption: "My SolidWorks model of a split-tube flexure (ST-I), one of the shortlisted joints. The slit along the tube lets it twist about its own axis, and the two arms carry the load in and out. I've set it up for a first ANSYS simulation and a 3D-printed test piece." },

      { type: "text", heading: "What's next",
        body:
          "- Preliminary ANSYS simulations of the shortlisted joints in four 3D-printing materials: PLA, PETG, carbon-fiber nylon and ABS\n" +
          "- Printing prototype joints and fitting them to the sampler\n" +
          "- Experimental validation with B&K accelerometers, a LabJack T7-Pro and MATLAB data acquisition" }
    ]
  },
  {
    id: "drone-door-opener",
    title: "Drone-Mounted Door-Opening Mechanism",
    year: "2025 – 2026",
    summary: "Redesigned a drone payload that rotates, extends on a leadscrew, and grips, then built and wired the prototype.",
    description:
      "A payload for a drone that opens doors so first responders don't have to: it grips the handle, twists it, and pushes or pulls the door open. " +
      "As a graduate research assistant, I took over an earlier student design and turned it into a working prototype.",
    tags: ["Mechanical Design", "Embedded", "3D Printing"],
    thumbnail: "assets/projects/drone-door-opener/prototype.jpg",
    thumbnailPosition: "15% 50%",
    media: [
      { type: "text", heading: "Where it started: the 2024 capstone design",
        body:
          "The project began as a University of Alberta mechanical engineering capstone (2024). That team designed a three-degree-of-freedom arm: a worm-gear finger gripper, a lead screw driving a sliding inner boom inside an outer boom, and a gear train that twists the boom. It used three NEO 550 motors, machined aluminum booms, and O-ring and rotary seals at every joint, with the electronics in a sealed enclosure.\n\n" +
          "Their report estimated 3.6 kg (over the 3 kg target) and about $3,250 in parts. The team delivered it as a CAD and drawing package." },
      { type: "video", src: "assets/projects/drone-door-opener/old-cad-turntable.mp4", poster: "assets/projects/drone-door-opener/old-cad-turntable-poster.jpg", loop: true,
        caption: "The capstone team's original SolidWorks assembly (Final Concept), exported from their CAD files." },
      { type: "image", src: "assets/projects/drone-door-opener/capstone-render-labelled.jpg",
        caption: "Capstone team's labelled render of their final design. Image from their Phase III design report." },
      { type: "image", src: "assets/projects/drone-door-opener/capstone-gripper-render.jpg",
        caption: "Capstone team's worm-gear gripper concept. Image from their Phase III design report." },

      { type: "text", heading: "What I changed",
        body:
          "- Redesigned the mechanism so it could actually be built and tested in the lab: it rotates, extends and retracts on a leadscrew actuator, and grips.\n" +
          "- Replaced machined aluminum parts with polymer 3D-printed parts, so parts could be printed, tested and revised quickly, and brought the mechanism to a working prototype.\n" +
          "- Moved the linear drive onto an aluminum-extrusion rail frame with an exposed leadscrew, which makes it easy to service and adjust.\n" +
          "- Designed a bolt-on clamp that mounts the payload to the extrusion with six M5 bolts and 3D-printed captive-nut carriers, checked for interference in CAD before printing.\n" +
          "- Integrated the payload's electrical system: DC-DC buck converters to regulate supply voltages, and a current sensor on the gripper motor so grip strength can be sensed from current draw.\n" +
          "- Wrote PWM motor control for all three motor channels on a Teensy, driven by joystick input." },
      { type: "image", src: "assets/projects/drone-door-opener/before-after-cad.jpg",
        caption: "Same viewing angle, before and after. Left: the capstone team's sealed, machined design. Right: my redesign on its bench test board." },
      { type: "video", src: "assets/projects/drone-door-opener/redesign-cad-turntable.mp4", poster: "assets/projects/drone-door-opener/redesign-cad-turntable-poster.jpg", loop: true,
        caption: "My redesigned assembly in SolidWorks: extrusion rail frame, leadscrew linear stage, boom rotation gearbox, and the gripper." },
      { type: "image", src: "assets/projects/drone-door-opener/redesign-rail-mount-closeup.jpg",
        caption: "Close-up of the rail frame: the leadscrew stage between the extrusions, the clamp mount with its M5 bolts, and the rotation gear and motor." },

      { type: "text", heading: "How it ended up",
        body: "The redesign was printed, assembled, and wired into a working bench prototype." },
      { type: "image", src: "assets/projects/drone-door-opener/prototype.jpg", caption: "My working prototype on the bench: gripper, extending arm on the leadscrew actuator, and the control electronics." },
      { type: "video", src: "assets/projects/drone-door-opener/leadscrew-stage-test.mp4", poster: "assets/projects/drone-door-opener/leadscrew-stage-test-poster.jpg", loop: true,
        caption: "Bench test of the linear stage: driving it with the joystick in my hand, the carriage travels along the leadscrew between the extrusion rails." },
      { type: "video", src: "assets/projects/drone-door-opener/gripper-head-test.mp4", poster: "assets/projects/drone-door-opener/gripper-head-test-poster.jpg", loop: true,
        caption: "Bench test of the gripper opening and closing under joystick control." }
    ]
  },
  {
    id: "auv-clark",
    title: "Clark — Autonomous Underwater Vehicle",
    year: "2021 – 2023",
    summary: "Mechanical lead for McGill Robotics' AUV: revived a half-finished vehicle and led its frame rebuild for RoboSub 2023.",
    description:
      "Clark is an autonomous underwater vehicle that McGill Robotics started before COVID and left half-finished. When the team was rebuilt, everyone who had designed it was gone. I didn't design the original vehicle. As mechanical lead, my job was to understand it, find its weak points, and get it working again.",
    tags: ["Mechanical Design", "Robotics", "CNC Machining", "3D Printing"],
    thumbnail: "assets/projects/auv-clark/robosub-2023-launch.jpg",
    media: [
      { type: "text", heading: "Picking up an inherited design",
        body:
          "- Tracked down the old CAD files and redrew the parts that were missing\n" +
          "- Worked out what each sensor was for and where it fit best in the hull\n" +
          "- Reviewed the previous design for flaws before building on it" },
      { type: "text", heading: "The vehicle in between",
        body:
          "The team spent almost a year designing an intermediate vehicle to bridge Clark and its successor, Douglas. I worked on its new hull, including a Delrin sealing component for the acrylic hull with the O-ring groove sized to manufacturer standards. That vehicle was never fully manufactured." },
      { type: "text", heading: "What I did on both vehicles",
        body:
          "- Waterproofing: O-ring selection, shaft clearances, and a custom O-ring and groove for the front camera housing\n" +
          "- Mechanical drawings in Autodesk Inventor for the end cap and other machined parts, revised with CNC machinists' feedback to reduce tolerance-related leaks\n" +
          "- A custom 3D-printed kill switch for the propulsion system, held in place by friction and a magnetic connection" },

      { type: "text", heading: "Clark at RoboSub 2023",
        body:
          "To get Clark to competition, I led a rebuild of its frame. We replaced the original, intricate frame with a simpler aluminium-extrusion frame and moved the thrusters. It may look plainer, but it made the vehicle much easier to balance.\n\n" +
          "- Selected the O-rings for an externally housed sensor and made custom O-rings for it\n" +
          "- In San Diego, right before the competition, went around the city with our team captain to source the materials we needed to modify and repair Clark so it could compete" },
      { type: "image", src: "assets/projects/auv-clark/robosub-2023-launch.jpg",
        caption: "Clark being lowered into the water at RoboSub 2023, in its rebuilt aluminium-extrusion frame. The black kill switch on top is the one I designed: it stays in place by friction and a magnetic connection." },
      { type: "youtube", id: "NJKSJqaSrSY", start: 112, end: 151, poster: "assets/projects/auv-clark/robosub-2023-me.jpg",
        caption: "My part of McGill Robotics' RoboSub 2023 competition video: as mechanical lead, I present the team's mechanical work for the year: a new frame, a ballast system for fine-tuning the centre of gravity, and enclosures for new sensors." },

      { type: "text", heading: "Before the rebuild",
        body: "Clark in its earlier frame, and the hull and parts I worked with in the lab." },
      { type: "image", src: "assets/projects/auv-clark/clark-side.jpg",
        caption: "Clark in its earlier frame: the main hull inside the open frame, with thrusters, sensor housings and handles mounted around it." },
      { type: "image", src: "assets/projects/auv-clark/clark-front.jpg",
        caption: "Front view of the earlier frame: the hull's end cap, the ring frame around it, the thrusters below, and the camera housing on the right." },
      { type: "image", src: "assets/projects/auv-clark/frame-side-plates.jpg",
        caption: "Side plates from the earlier frame, now hanging in the McGill Robotics lab." },
      { type: "image", src: "assets/projects/auv-clark/clark-bench.jpg",
        caption: "Clark in its earlier frame on the lab workbench." },
      { type: "image", src: "assets/projects/auv-clark/hull-end-cap-connectors.jpg",
        caption: "The hull end cap with its waterproof connectors and latches. The electronics tray slides out of the hull behind it." },
      { type: "image", src: "assets/projects/auv-clark/hull-electronics-tray.jpg",
        caption: "Hull opened up on the bench, with the electronics tray pulled out for wiring and testing." },
      { type: "image", src: "assets/projects/auv-clark/inventor-sealed-housing.jpg",
        caption: "Hull for a self-propelled torpedo for RoboSub's Torpedo Task, modelled in Autodesk Inventor, with an O-ring groove around the opening and a bolt pattern for the lid. Instead of a torpedo that depends on the main vehicle, we wanted one that could steer itself. We designed the hull within the competition's weight and size limits, but then found the electrical team couldn't fit their components into a hull that small, so we dropped the idea. The lesson I took from it: settle the electronics space with the electrical team before fixing the outer size." },
      { type: "image", src: "assets/projects/auv-clark/team-pool-test.jpg",
        caption: "With the team and Clark at a pool test." }
    ]
  },
  {
    id: "stm32-rc-car",
    hidden: true,
    title: "STM32 RC Car",
    year: "2025",
    summary: "Real-time motor control firmware on STM32 with PWM and FreeRTOS for joystick-driven motion.",
    description:
      "I wrote real-time motor control firmware for an STM32-based RC car using PWM and FreeRTOS, giving responsive joystick-driven motion.\n\n" +
      "The low-level firmware drives DC motors through L9110 drivers, with PWM ranges tuned for stable speed and clean direction changes. A FreeRTOS multitasking setup runs sensor polling, motor logic, and real-time decision making together.",
    tags: ["Embedded", "C"],
    media: []
  },
  {
    id: "splash-llm-capstone",
    hidden: true,
    title: "Capstone: LLM Integration for the Splash Scripting Language",
    year: "2024 – 2025",
    summary: "Added LLM-powered \"smart entities\" to Splash, a spatial scripting language in TypeScript.",
    description:
      "For my McGill capstone, I built \"smart entity\" functionality into Splash, a spatial scripting language written in TypeScript, so scripts can embed LLMs (through LangChain and LangGraph) to interpret sensor and spatial data.\n\n" +
      "I worked on the language implementation itself, including its grammar, AST, semantics, and function declarations, and extended Splash's testing framework to simulate physical environments so scripts can be tested before deployment.",
    tags: ["Software", "TypeScript"],
    media: []
  }
];
