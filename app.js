/* ══════════════════════════════════════════════════
   BENCHWARMERS — app.js
   Full application logic: all data, state, rendering
   Features: Play Styles, Pro Comparison, Famous Players,
   Formations, Tactics, Recovery, Daily Motivation
══════════════════════════════════════════════════ */

'use strict';

/* ══════════════════════════════════════════════
   DATA: DAILY MOTIVATIONS
══════════════════════════════════════════════ */
const MOTIVATIONS = [
  "Even legends started as benchwarmers. The bench is just Phase One.",
  "Ronaldo trained until his feet cried. Your feet haven't even whispered yet.",
  "The only person impressed by your excuses is future you. And he's unemployed.",
  "Messi was told he was too small. The ball didn't care. Neither should you.",
  "You don't need talent to outwork everyone. That's the beautiful part.",
  "Your comfort zone has zero trophies in it.",
  "Pain is temporary. Sitting on the bench forever is much, much worse.",
  "The difference between a starter and a sub? About 200 extra hours of practice.",
  "Your future manager is watching film right now. What would they see if they watched yours?",
  "Some people warm up. You warm up and then keep going. That's the gap.",
  "The ball doesn't know you're tired. Neither do the good players.",
  "It takes 10,000 hours to master anything. You've done about 12. Get moving.",
  "Nobody ever quit a session and thought 'I wish I hadn't done that'.",
  "Champions aren't built in the match. They're built in moments exactly like this one.",
  "The opponent doing extra reps right now is the one you'll face in the final.",
  "Technique doesn't get tired. Build enough of it and it plays for you automatically.",
  "Fun fact: nobody remembers who sat on the bench. Everyone remembers who scored.",
  "Your biggest competition isn't the striker across the pitch. It's yesterday's version of you.",
  "Every drill you skip is a mistake you'll make in the 89th minute.",
  "The pitch doesn't care about your feelings. It just rewards preparation.",
  "Zlatan didn't become Zlatan by going home early. Just saying.",
  "A 1% improvement every day makes you 37x better in a year. Start with today.",
  "The warm-up IS the training. If you're lazy in warm-up, you're lazy everywhere.",
  "You're not tired. You're just at the point where the real training begins.",
  "Coaching tip: the best skill in football is showing up when you don't feel like it.",
  "If Messi did it all over again, he'd still practise more than you. Probably.",
  "The bench builds character. The pitch builds legends. Choose your location.",
  "Pressing high wins games. Pressing your snooze button wins nothing.",
  "Great first touch? You mean the 20,000 practice touches you did? Yeah, that.",
  "The goal doesn't care who shoots. Make sure it's always you.",
];

/* ══════════════════════════════════════════════
   DATA: PLAY STYLES
══════════════════════════════════════════════ */
const PLAY_STYLES = {
  playmaker: {
    name: 'Playmaker', icon: '🧠',
    desc: 'You see the pass nobody else does. Vision, tempo, and the ability to unlock defences with a single touch.',
    traits: ['Vision', 'Technical', 'Composure', 'Passing Range'],
    drillCategories: ['technical', 'tactical'],
    drillKeywords: ['passing', 'circuit', 'mastery', 'simulation', 'tactics'],
    color: '#48a6ff',
  },
  speedster: {
    name: 'Speedster', icon: '💨',
    desc: "Pure pace. You turn defence into offence in seconds. Your acceleration is your weapon — everything trains around it.",
    traits: ['Acceleration', 'Top Speed', 'Stamina', 'Agility'],
    drillCategories: ['fitness'],
    drillKeywords: ['sprint', 'agility', 'ladder', 'plyometric', 'pyramid'],
    color: '#00e676',
  },
  targetman: {
    name: 'Target Man', icon: '🎯',
    desc: 'The immovable object in the final third. You hold up play, win aerial duels and bring others into the game.',
    traits: ['Physicality', 'Hold-up Play', 'Heading', 'Strength'],
    drillCategories: ['technical', 'fitness'],
    drillKeywords: ['finishing', 'plyometric', 'power', 'touch', 'target'],
    color: '#ff7043',
  },
  defensive: {
    name: 'Defensive Wall', icon: '🏰',
    desc: 'The last line. Disciplined, positional, and utterly relentless. You love a clean sheet more than any goal.',
    traits: ['Positioning', 'Tackling', 'Concentration', 'Leadership'],
    drillCategories: ['tactical', 'fitness'],
    drillKeywords: ['defensive', 'pressing', 'shadowing', 'stamina', 'positioning'],
    color: '#b0bec5',
  },
  box2box: {
    name: 'Box-to-Box', icon: '🔄',
    desc: 'Both boxes, full pitch, 90 minutes. You attack, defend, and somehow still have energy for extra time.',
    traits: ['Stamina', 'Work Rate', 'Versatility', 'Intelligence'],
    drillCategories: ['fitness', 'tactical'],
    drillKeywords: ['stamina', 'pyramid', 'pressing', 'simulation', 'intervals'],
    color: '#ce93d8',
  },
  dribbler: {
    name: 'Dribble Artist', icon: '🌀',
    desc: 'One-on-one? Yes please. You beat defenders with skill, balance and low centre of gravity. Crowd approved.',
    traits: ['Dribbling', 'Balance', 'Close Control', 'Creativity'],
    drillCategories: ['technical'],
    drillKeywords: ['cone', 'dribbling', 'mastery', 'touch', '1v1'],
    color: '#ffab00',
  },
};

/* ══════════════════════════════════════════════
   DATA: DRILLS
══════════════════════════════════════════════ */
const DRILLS = [
  {
    id: 1, name: 'Cone Dribbling', category: 'technical',
    difficulty: 'beginner', duration: '12 min', equipment: '6 cones, ball', icon: '🔵',
    positions: ['winger', 'midfielder', 'striker'],
    styleKeys: ['dribbler', 'speedster'],
    description: 'Weave through cones at pace to sharpen close control and direction changes.',
    steps: ['Place 6 cones in a line, 1m apart.', 'Dribble through using inside and outside of both feet.', 'Return using only your weaker foot.', 'Rest 20s between sets. 3 sets of 4 reps.', 'Final set: go full pace and time yourself.'],
    coachNote: "You're not a slalom skier. Use your body as a shield.",
    xp: 20,
  },
  {
    id: 2, name: 'Passing Wall Combos', category: 'technical',
    difficulty: 'beginner', duration: '15 min', equipment: 'Wall, ball', icon: '🔵',
    positions: ['midfielder', 'defender', 'goalkeeper'],
    styleKeys: ['playmaker'],
    description: 'Sharp one-touch passing against a wall builds accuracy, reaction time and first touch.',
    steps: ['Stand 3m from a solid wall.', 'Drive ball against wall with instep — control the return.', 'Switch feet every 10 passes.', 'Progress to one-touch for 90 seconds.', 'Step back to 5m for harder returns in final 2 min.'],
    coachNote: "If you're bored, you're not going fast enough.",
    xp: 20,
  },
  {
    id: 3, name: 'Ball Mastery Circuit', category: 'technical',
    difficulty: 'intermediate', duration: '20 min', equipment: 'Ball', icon: '🟠',
    positions: ['winger', 'midfielder', 'striker', 'defender'],
    styleKeys: ['dribbler', 'playmaker'],
    description: 'Touch-and-move sequences building tight control, weak-foot confidence and comfort under pressure.',
    steps: ['Toe taps on top of ball — 30 seconds non-stop.', 'Inside/outside rolls: right then left.', 'V-pull moves — 10 reps each foot.', 'Figure-8 dribble around two cones 50cm apart.', 'Combine all four into a 2-minute freestyle set.'],
    coachNote: 'Messy feet lose matches. Clean feet win them.',
    xp: 35,
  },
  {
    id: 4, name: 'First Touch Kills', category: 'technical',
    difficulty: 'intermediate', duration: '15 min', equipment: 'Ball, partner or wall', icon: '🟠',
    positions: ['striker', 'winger', 'midfielder'],
    styleKeys: ['targetman', 'playmaker', 'dribbler'],
    description: 'Receive lofted and driven balls from different angles and kill them stone dead in one touch.',
    steps: ['Partner serves from 8–12m — vary height and pace.', 'Control with chest, let drop, kill with instep.', 'Control with thigh — direct into stride immediately.', 'Receive driven ball — inside-foot control into space.', '10 reps per technique, 3 sets.'],
    coachNote: 'A good touch buys a second. A great touch wins the game.',
    xp: 35,
  },
  {
    id: 5, name: 'Sprint Intervals', category: 'fitness',
    difficulty: 'intermediate', duration: '22 min', equipment: 'Cones', icon: '🟢',
    positions: ['winger', 'striker', 'defender', 'midfielder'],
    styleKeys: ['speedster', 'box2box'],
    description: 'Explosive 30m sprint bursts to build match-speed pace and anaerobic endurance.',
    steps: ['Mark 30m corridor with cones.', 'Sprint at 95% effort from cone to cone.', 'Walk back — ~20 seconds recovery.', '8 sprints per set. 2-minute rest between sets.', '3 total sets. Log fastest and slowest times.'],
    coachNote: "Jog it and you're wasting both our time.",
    xp: 30,
  },
  {
    id: 6, name: 'Agility Ladder Runs', category: 'fitness',
    difficulty: 'beginner', duration: '15 min', equipment: 'Agility ladder', icon: '🟢',
    positions: ['goalkeeper', 'defender', 'midfielder', 'winger', 'striker'],
    styleKeys: ['speedster', 'dribbler'],
    description: 'Footwork patterns through an agility ladder improving coordination and change of direction.',
    steps: ['Two feet in each rung, forward march — build to a run.', 'Single-foot high-knee run: one foot per rung.', 'Lateral shuffle: face sideways, two feet in each rung.', 'Ickey shuffle: in-in-out pattern — 3 full lengths.', 'Rest 30s between patterns.'],
    coachNote: 'Slow feet = slow career. Speed it up.',
    xp: 20,
  },
  {
    id: 7, name: 'Plyometric Power Set', category: 'fitness',
    difficulty: 'advanced', duration: '20 min', equipment: 'Box (optional)', icon: '🔴',
    positions: ['striker', 'defender', 'goalkeeper'],
    styleKeys: ['targetman', 'defensive', 'speedster'],
    description: 'Explosive jump and bound training to increase vertical power and aerial dominance.',
    steps: ['Box jumps from standing — land soft, reset, × 10.', 'Lateral bounds: leap sideways, stick each landing × 8.', 'Depth drops: step off 30cm ledge, absorb, jump up.', 'Scissor jumps: alternate legs × 12 reps.', 'Rest 90s between sets. 4 total sets.'],
    coachNote: "If your calves aren't screaming, you're doing it wrong.",
    xp: 45,
  },
  {
    id: 8, name: 'Stamina Pyramid Run', category: 'fitness',
    difficulty: 'intermediate', duration: '30 min', equipment: 'None', icon: '🟢',
    positions: ['midfielder', 'defender'],
    styleKeys: ['box2box', 'defensive'],
    description: "Progressive aerobic-to-anaerobic run building the engine to last a full 90 minutes.",
    steps: ['5-min warm-up jog at conversational pace.', 'Run at 65% effort for 10 mins — build to 75%.', 'Pyramid intervals: 1 min @85% / 1 min @55% × 6.', '5-min cool-down walk. Do not skip.', 'Log total distance if using GPS watch.'],
    coachNote: "Midfielders don't get subbed for pace — they get subbed for fitness.",
    xp: 40,
  },
  {
    id: 9, name: 'Finishing Practice', category: 'technical',
    difficulty: 'intermediate', duration: '25 min', equipment: 'Ball, goal, 5 cones', icon: '🟡',
    positions: ['striker', 'winger', 'midfielder'],
    styleKeys: ['targetman', 'speedster'],
    description: 'Goal-scoring scenarios from 5 angles simulating match situations.',
    steps: ['Set 5 cones at different angles 12–18m from goal.', 'Cone 1: instep drive — low and hard.', 'Cone 2: inside-foot curl around imaginary wall.', 'Cone 3: receive lobbed ball — first-time volley.', 'Cones 4–5: one-two then finish first-time. 3 rounds.'],
    coachNote: 'Miss the target and you go again. Simple.',
    xp: 40,
  },
  {
    id: 10, name: 'Defensive Shadowing', category: 'tactical',
    difficulty: 'intermediate', duration: '20 min', equipment: 'Cones, bibs, ball', icon: '🟡',
    positions: ['defender', 'midfielder'],
    styleKeys: ['defensive', 'box2box'],
    description: "Mirror the attacker's movements to cut off angles and force them into low-danger areas.",
    steps: ['Attacker dribbles freely in a 6×6m box.', 'Defender stays goal-side at all times — mirroring every step.', 'Do NOT dive in. Force them backwards.', 'After 40s of shadowing, attacker tries to break free.', 'Switch roles every 2 minutes. 4 rounds each.'],
    coachNote: "Patience is a defender's superpower. Wait for the mistake.",
    xp: 35,
  },
  {
    id: 11, name: 'Pressing Triggers', category: 'tactical',
    difficulty: 'advanced', duration: '25 min', equipment: 'Cones, bibs, ball', icon: '🔴',
    positions: ['midfielder', 'striker', 'defender'],
    styleKeys: ['box2box', 'defensive', 'playmaker'],
    description: 'Identify and react to pressing triggers to win possession high up the pitch.',
    steps: ['Define three triggers: bad touch, back pass, GK in hands.', 'Call trigger name OUT LOUD as it happens.', 'On trigger: immediately sprint to close the ball.', 'First man presses; second cuts the passing lane.', '4v4 in 30×20m with press rules. 3×8 min rounds.'],
    coachNote: "Press without a trigger and you open a 30m hole behind you.",
    xp: 45,
  },
  {
    id: 12, name: 'Reflex Shot-Stopping', category: 'technical',
    difficulty: 'intermediate', duration: '20 min', equipment: 'Ball, goal, server', icon: '🧤',
    positions: ['goalkeeper'],
    styleKeys: ['defensive'],
    description: 'Rapid-fire shot stopping from close range to sharpen reaction saves.',
    steps: ['GK starts in set position — balanced, on toes.', 'Server fires from 8–12m: alternate low, mid and high.', 'GK must react — no anticipating direction before shot.', 'After every 3 shots, GK resets to centre from post.', '10 shots per set × 4 sets. Log saves made.'],
    coachNote: 'The set position is everything. Lazy stance = easy goal.',
    xp: 35,
  },
  {
    id: 13, name: 'GK Distribution', category: 'technical',
    difficulty: 'beginner', duration: '15 min', equipment: 'Ball, cones, partner', icon: '🧤',
    positions: ['goalkeeper'],
    styleKeys: ['playmaker'],
    description: 'Build accurate short and long distribution to launch attacks quickly.',
    steps: ['Roll to server 10m away — underarm, fast to feet.', 'Overarm throw to target 20m away. Aim chest height.', 'Kick from hands: aim at cone 30m away.', 'Goal kick practice: driven curl to both corners.', '5 reps of each technique. Rest 1 min between types.'],
    coachNote: "The keeper who can't pass is already one goal behind.",
    xp: 25,
  },
  {
    id: 14, name: 'Passing Circuit', category: 'technical',
    difficulty: 'intermediate', duration: '20 min', equipment: '4 cones, 2 partners, ball', icon: '🔵',
    positions: ['midfielder', 'defender', 'goalkeeper'],
    styleKeys: ['playmaker', 'box2box'],
    description: 'Triangle passing sequences building switch of play and one-touch sharpness.',
    steps: ['Set 15m equilateral triangle — one player per cone.', 'Rotate ball with two-touch passing. No holding.', "On whistle: switch to one-touch only.", 'Add defender in centre after 5 mins — keep possession.', 'Rotate positions every 5 mins. 3×5 min blocks.'],
    coachNote: 'Movement after the pass separates mediocre from magnificent.',
    xp: 35,
  },
  {
    id: 15, name: 'Match Simulation', category: 'tactical',
    difficulty: 'advanced', duration: '45 min', equipment: 'Goals, bibs, ball', icon: '🟡',
    positions: ['goalkeeper', 'defender', 'midfielder', 'winger', 'striker'],
    styleKeys: ['playmaker', 'box2box', 'dribbler', 'speedster', 'targetman', 'defensive'],
    description: 'Small-sided match with position-specific rules to replicate real match intensity.',
    steps: ['5v5 on 40×25m pitch with full-size or portable goals.', 'Strikers: max 2 touches in final third.', 'Midfielders: must play 1 pass before shooting.', 'Defenders: must play out from back — no long balls.', '3×12 min periods, 3-min rests. First to 3 goals wins each.'],
    coachNote: "This is the whole point. Everything else is just preparation.",
    xp: 60,
  },
];

/* ══════════════════════════════════════════════
   DATA: RANKS
══════════════════════════════════════════════ */
const RANKS = [
  { id: 'r0', name: 'Eternal Benchwarmer', icon: '🪑', minXP: 0 },
  { id: 'r1', name: 'Training Dummy',      icon: '🎽', minXP: 100 },
  { id: 'r2', name: 'Water Carrier',       icon: '🧃', minXP: 250 },
  { id: 'r3', name: 'Squad Player',        icon: '📋', minXP: 500 },
  { id: 'r4', name: 'Impact Substitute',   icon: '🔄', minXP: 800 },
  { id: 'r5', name: 'Regular Starter',     icon: '⭐', minXP: 1300 },
  { id: 'r6', name: 'The Main Event',      icon: '🏆', minXP: 2200 },
];

/* ══════════════════════════════════════════════
   DATA: POSITIONS
══════════════════════════════════════════════ */
const POSITIONS = [
  { id: 'goalkeeper', name: 'Goalkeeper', icon: '🧤' },
  { id: 'defender',   name: 'Defender',   icon: '🛡️' },
  { id: 'midfielder', name: 'Midfielder', icon: '⚙️' },
  { id: 'winger',     name: 'Winger',     icon: '⚡' },
  { id: 'striker',    name: 'Striker',    icon: '🔥' },
];

/* ══════════════════════════════════════════════
   DATA: POSITION SKILLS
══════════════════════════════════════════════ */
const POS_SKILLS = {
  goalkeeper: ['Reflexes', 'Distribution', 'Positioning', 'Shot-Stopping', 'Command of Area'],
  defender:   ['Tackling', 'Heading', 'Marking', 'Positioning', 'Passing Under Pressure'],
  midfielder: ['Passing', 'Stamina', 'Ball Control', 'Vision', 'Decision Speed'],
  winger:     ['Pace', 'Dribbling', 'Crossing', '1v1 Duels', 'Finishing'],
  striker:    ['Finishing', 'Movement', 'Heading', 'Hold-up Play', 'Pace Off the Mark'],
};

/* ══════════════════════════════════════════════
   DATA: PRO PLAYERS — ATTRIBUTE COMPARISON
══════════════════════════════════════════════ */
const PRO_PLAYERS = [
  {
    id: 'messi',
    name: 'Lionel Messi', icon: '🐐',
    team: 'Inter Miami CF · Argentina', country: '🇦🇷',
    headline: "8× Ballon d'Or. Greatest of all time. Arguably.",
    attrs: { speed: 87, dribbling: 98, passing: 93, shooting: 90, stamina: 85 },
    trainRef: [
      { ico: '🌀', text: 'Thousands of dribbling repetitions daily — tight space control at the core of everything.' },
      { ico: '👣', text: 'Extreme weak-foot training from age 8. His right foot is practically just for standing.' },
      { ico: '🧠', text: 'Positioning and movement drills run without the ball — reading the game before the pass arrives.' },
      { ico: '⚡', text: '3m sprint explosiveness training — acceleration, not top speed, is his true weapon.' },
    ],
  },
  {
    id: 'ronaldo',
    name: 'Cristiano Ronaldo', icon: '🦁',
    team: 'Al Nassr · Portugal', country: '🇵🇹',
    headline: '5× Ballon d\'Or. The most decorated player in football history.',
    attrs: { speed: 90, dribbling: 89, passing: 82, shooting: 95, stamina: 96 },
    trainRef: [
      { ico: '🏋️', text: 'Legendary gym regime — strength and power training twice daily, 365 days a year.' },
      { ico: '🏃', text: 'Sprint drills every session. Recorded 33.6 km/h in peak condition — elite sprint mechanics.' },
      { ico: '⚽', text: '3,000+ free kick repetitions per month. Precision through volume, not talent.' },
      { ico: '💤', text: 'Sleep is training. CR7 takes five 90-minute naps daily. Recovery IS the workout.' },
    ],
  },
  {
    id: 'mbappe',
    name: 'Kylian Mbappé', icon: '💨',
    team: 'Real Madrid · France', country: '🇫🇷',
    headline: 'The fastest player on earth. Possibly from another planet.',
    attrs: { speed: 99, dribbling: 92, passing: 82, shooting: 88, stamina: 88 },
    trainRef: [
      { ico: '🚀', text: 'Sprint mechanics and acceleration drills are the foundation — not a single session passes without them.' },
      { ico: '🎯', text: '1v1 isolation training: beat the defender, cut inside, finish. Repeat 500 times.' },
      { ico: '🧘', text: 'Mental composure training. Big-game temperament is built in quiet rooms, not on pitches.' },
      { ico: '👣', text: 'Footwork patterns — rapid direction changes at speed without breaking stride. Daily.' },
    ],
  },
  {
    id: 'bellingham',
    name: 'Jude Bellingham', icon: '⭐',
    team: 'Real Madrid · England', country: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    headline: 'Box-to-box engine, champion mentality, and he\'s still young. Annoying.',
    attrs: { speed: 82, dribbling: 85, passing: 87, shooting: 83, stamina: 94 },
    trainRef: [
      { ico: '🔄', text: 'Full-pitch stamina circuits — the ability to press at 80 mins like it\'s the 5th.' },
      { ico: '🧠', text: 'Tactical film study three times per week. Understanding space before you arrive in it.' },
      { ico: '💪', text: 'Heading and aerial duel work — technical headers from varied angles and heights daily.' },
      { ico: '🎯', text: 'Late runs into the box — timing drills practised like clockwork, not instinct.' },
    ],
  },
];

/* ══════════════════════════════════════════════
   DATA: FORMATIONS
══════════════════════════════════════════════ */
const FORMATIONS = [
  {
    id: '433', name: '4-3-3',
    tagline: 'The attacking gold standard.',
    desc: 'Dominant in possession, with three forwards to stretch defences wide and create overloads.',
    roles: ['GK', 'RB', 'CB', 'CB', 'LB', 'CM', 'DM', 'CM', 'RW', 'ST', 'LW'],
    pros: ['Width + pace on flanks', 'Midfield triangle controls tempo', 'High press ideal'],
    cons: ['Vulnerable on the counter', 'Fullbacks must cover vast ground'],
    // Positions: {top%, left%} — 0% = top of pitch (GK)
    dots: [
      { role:'GK', t:89, l:50, gk:true },
      { role:'RB', t:72, l:82 }, { role:'CB', t:72, l:61 }, { role:'CB', t:72, l:39 }, { role:'LB', t:72, l:18 },
      { role:'CM', t:52, l:72 }, { role:'DM', t:52, l:50 }, { role:'CM', t:52, l:28 },
      { role:'RW', t:22, l:80 }, { role:'ST', t:18, l:50 }, { role:'LW', t:22, l:20 },
    ],
  },
  {
    id: '442', name: '4-4-2',
    tagline: 'The classic. Never truly goes out of fashion.',
    desc: 'Balanced, hard to beat, compact in shape. Two strikers creating constant goal threat.',
    roles: ['GK', 'RB', 'CB', 'CB', 'LB', 'RM', 'CM', 'CM', 'LM', 'ST', 'ST'],
    pros: ['Solid defensive shape', 'Partnership in attack', 'Easy to understand'],
    cons: ['Can be overrun in midfield vs 3', 'Wingers must track back'],
    dots: [
      { role:'GK', t:89, l:50, gk:true },
      { role:'RB', t:72, l:82 }, { role:'CB', t:72, l:62 }, { role:'CB', t:72, l:38 }, { role:'LB', t:72, l:18 },
      { role:'RM', t:48, l:82 }, { role:'CM', t:50, l:62 }, { role:'CM', t:50, l:38 }, { role:'LM', t:48, l:18 },
      { role:'ST', t:18, l:60 }, { role:'ST', t:18, l:40 },
    ],
  },
  {
    id: '352', name: '3-5-2',
    tagline: 'Five in midfield. Good luck getting through that.',
    desc: 'Three centre-backs for security, wing-backs to provide width and attack depth.',
    roles: ['GK', 'CB', 'CB', 'CB', 'WB', 'CM', 'CM', 'CM', 'WB', 'ST', 'ST'],
    pros: ['Midfield overload', 'Wing-backs create wide threat', 'Defensive solidity'],
    cons: ['Requires excellent wing-backs', 'Vulnerable to pace out wide'],
    dots: [
      { role:'GK', t:89, l:50, gk:true },
      { role:'CB', t:70, l:68 }, { role:'CB', t:70, l:50 }, { role:'CB', t:70, l:32 },
      { role:'WB', t:48, l:88 }, { role:'CM', t:48, l:66 }, { role:'CM', t:48, l:50 }, { role:'CM', t:48, l:34 }, { role:'WB', t:48, l:12 },
      { role:'ST', t:16, l:60 }, { role:'ST', t:16, l:40 },
    ],
  },
  {
    id: '4231', name: '4-2-3-1',
    tagline: 'The modern default. Versatile and control-oriented.',
    desc: 'Two defensive mids protect the back four, three attackers support the striker in a compact unit.',
    roles: ['GK', 'RB', 'CB', 'CB', 'LB', 'CDM', 'CDM', 'RAM', 'CAM', 'LAM', 'ST'],
    pros: ['Defensive security', 'CAM freedom to create', 'Easy to transition'],
    cons: ['Striker can be isolated', 'Requires technically versatile players'],
    dots: [
      { role:'GK', t:89, l:50, gk:true },
      { role:'RB', t:72, l:82 }, { role:'CB', t:72, l:61 }, { role:'CB', t:72, l:39 }, { role:'LB', t:72, l:18 },
      { role:'CDM', t:56, l:60 }, { role:'CDM', t:56, l:40 },
      { role:'RAM', t:38, l:78 }, { role:'CAM', t:36, l:50 }, { role:'LAM', t:38, l:22 },
      { role:'ST', t:16, l:50 },
    ],
  },
];

/* ══════════════════════════════════════════════
   DATA: TACTICS
══════════════════════════════════════════════ */
const TACTICS = [
  {
    icon: '⬆️', name: 'High Pressing', color: '#ff4b4b', tag: 'Offensive',
    desc: 'Win the ball back in the opponent\'s half by pressing intensely immediately after losing possession. Designed to disorient opponents and create short transition chances.',
    keys: ['Trigger recognition', 'Immediate reaction', 'Compact shape', 'Pressing traps'],
    when: 'Use when: opponent is poor under pressure, or you want to dominate possession territory.',
  },
  {
    icon: '⚡', name: 'Counter Attack', color: '#ffab00', tag: 'Transitional',
    desc: 'Absorb pressure in a compact defensive block, then explode forward at pace the moment possession is won. Speed of transition is everything.',
    keys: ['Deep defensive line', 'Fast forwards', 'Direct passing', 'Exploit space in behind'],
    when: 'Use when: facing a technically superior opponent who commits players forward.',
  },
  {
    icon: '🔄', name: 'Possession Play', color: '#48a6ff', tag: 'Dominant',
    desc: 'Control the match tempo through ball retention, positional play and patient build-up. Make the opponent chase the ball until gaps appear.',
    keys: ['Triangle combinations', 'Width and depth', 'Patient recycling', 'Press resistance'],
    when: 'Use when: your squad is technically gifted and you want to neutralise opponent threat.',
  },
  {
    icon: '🏰', name: 'Defensive Block', color: '#b0bec5', tag: 'Defensive',
    desc: 'Two disciplined defensive lines that are hard to break down. Deny space, force opponents wide, and defend set pieces with aggression.',
    keys: ['Low defensive line', 'Compact midfield', 'Shape discipline', 'Frustrate the attack'],
    when: 'Use when: protecting a lead, facing a stronger opponent, or managing a key result.',
  },
  {
    icon: '🌊', name: 'Gegenpress', color: '#00e676', tag: 'Aggressive',
    desc: 'Immediately win the ball back within 5 seconds of losing it before the opponent organises. High energy, high reward, no hiding place.',
    keys: ['Immediate reaction', 'Ball-near pressing', 'Whole-team commitment', 'No passengers'],
    when: 'Use when: fitness is a major advantage and the opponent has slower decision-makers.',
  },
  {
    icon: '↔️', name: 'Tiki-Taka', color: '#ce93d8', tag: 'Technical',
    desc: 'Short, fast, interlinking passes to build through tight spaces. Positional superiority over physical dominance. The ultimate test of technique.',
    keys: ['One-touch combinations', 'Constant movement', 'Positional rotations', 'Small triangles'],
    when: 'Use when: you have technically superior players who understand space and timing.',
  },
];

/* ══════════════════════════════════════════════
   DATA: RECOVERY & INJURY PREVENTION
══════════════════════════════════════════════ */
const RECOVERY_CARDS = [
  {
    icon: '🔥', title: 'Warm-Up Protocol', tag: { cls: 'tg', label: 'Pre-Training' },
    items: [
      { ico: '🚶', txt: '<strong>5-min activation jog</strong> — build from walking to 60% pace.' },
      { ico: '🦵', txt: '<strong>Dynamic leg swings</strong> — forward/back and lateral, 15 each leg.' },
      { ico: '🔄', txt: '<strong>Hip circles & lunges</strong> — 10 walking lunges each leg with rotation.' },
      { ico: '⚽', txt: '<strong>Ball activation</strong> — 3 minutes of easy touches, passes, no intensity.' },
      { ico: '💨', txt: '<strong>Accelerations</strong> — 4 × 20m build-up runs finishing at 80%.' },
    ],
  },
  {
    icon: '🧘', title: 'Stretching Routines', tag: { cls: 'tb', label: 'Flexibility' },
    items: [
      { ico: '⏱️', txt: '<strong>Hold each stretch 25–30 seconds</strong> — shorter holds don\'t adapt the muscle.' },
      { ico: '🦵', txt: '<strong>Quad & hip flexor stretch</strong> — essential for kicking mechanics and running posture.' },
      { ico: '🦵', txt: '<strong>Hamstring stretch</strong> — footballers\' most common injury site. Never skip.' },
      { ico: '🦶', txt: '<strong>Calf & Achilles stretch</strong> — load the calf progressively, especially on hard pitches.' },
      { ico: '🔄', txt: '<strong>Spinal rotation</strong> — reduce lower back tightness caused by unilateral kicking.' },
    ],
  },
  {
    icon: '🩹', title: 'Recovery Techniques', tag: { cls: 'ta', label: 'Post-Training' },
    items: [
      { ico: '🧊', txt: '<strong>Cold water immersion</strong> — 10–12°C for 10 minutes post hard session. Science-backed.' },
      { ico: '🥗', txt: '<strong>Post-session nutrition</strong> — 20–30g protein + fast carbs within 30 minutes.' },
      { ico: '💧', txt: '<strong>Rehydration</strong> — drink 1.5× the weight you lost during training in water.' },
      { ico: '🛌', txt: '<strong>Sleep 8–9 hours</strong> — 80% of muscle repair happens during deep sleep.' },
      { ico: '🔵', txt: '<strong>Foam rolling</strong> — 60 seconds on quads, IT band, calves post-session.' },
    ],
  },
  {
    icon: '🛡️', title: 'Injury Prevention', tag: { cls: 'tr', label: 'Prehab' },
    items: [
      { ico: '⚖️', txt: '<strong>Single-leg balance work</strong> — ankle stability reduces ACL and ankle sprain risk significantly.' },
      { ico: '💪', txt: '<strong>Nordic hamstring curls</strong> — clinical evidence shows 50%+ reduction in hamstring tears.' },
      { ico: '🔄', txt: '<strong>Hip abductor strengthening</strong> — protects the knee tracking under load.' },
      { ico: '🦵', txt: '<strong>Calf raises (eccentric)</strong> — lower yourself slowly over 3 seconds. Tendon armour.' },
      { ico: '📐', txt: '<strong>Landing mechanics</strong> — always land through bent knees. Stiff landings cause real damage.' },
    ],
  },
  {
    icon: '😴', title: 'Rest & Periodisation', tag: { cls: 'td', label: 'Management' },
    items: [
      { ico: '📅', txt: '<strong>Mandatory rest days</strong> — minimum 1–2 per week. Rest is not weakness, it\'s programming.' },
      { ico: '📈', txt: '<strong>Progressive overload</strong> — never increase training volume more than 10% per week.' },
      { ico: '🧠', txt: '<strong>Mental recovery</strong> — stress management matters. Cortisol blocks muscle repair.' },
      { ico: '💊', txt: '<strong>Micronutrients</strong> — vitamin D, magnesium and omega-3s are the most commonly deficient in athletes.' },
      { ico: '📊', txt: '<strong>Training diary</strong> — track fatigue (1–10) daily. Anticipate overload before it becomes injury.' },
    ],
  },
  {
    icon: '⚡', title: 'In-Season Management', tag: { cls: 'tg', label: 'Season Load' },
    items: [
      { ico: '📉', txt: '<strong>Reduce volume, maintain intensity</strong> — pre-match days should feel sharp, not depleting.' },
      { ico: '🏥', txt: '<strong>Address niggles early</strong> — a 3-day minor injury beats a 3-week major one.' },
      { ico: '🧊', txt: '<strong>Post-match ice protocol</strong> — knees, ankles and hamstrings within 20 minutes of final whistle.' },
      { ico: '🔁', txt: '<strong>Active recovery between matches</strong> — light swim, cycling or walking. Not another sprint session.' },
      { ico: '🩻', txt: '<strong>Regular screening</strong> — seasonal physio checks catch asymmetries before they become injuries.' },
    ],
  },
];

/* ══════════════════════════════════════════════
   DATA: WEEK SCHEDULE
══════════════════════════════════════════════ */
const WEEK_SCHED = [
  { short:'Mon', full:'Monday',    type:'technical',  label:'Technical' },
  { short:'Tue', full:'Tuesday',   type:'fitness',    label:'Fitness' },
  { short:'Wed', full:'Wednesday', type:'tactical',   label:'Tactical' },
  { short:'Thu', full:'Thursday',  type:'rest',       label:'Rest Day' },
  { short:'Fri', full:'Friday',    type:'technical',  label:'Technical' },
  { short:'Sat', full:'Saturday',  type:'match',      label:'Match Prep' },
  { short:'Sun', full:'Sunday',    type:'recovery',   label:'Recovery' },
];

/* ══════════════════════════════════════════════
   DATA: ACHIEVEMENTS
══════════════════════════════════════════════ */
const ACHIEVEMENTS = [
  { id:'first_drill',    icon:'🎯', name:'First Blood',        desc:'Complete your first drill' },
  { id:'five_drills',    icon:'🔥', name:'On Fire',            desc:'Complete 5 drills' },
  { id:'week_streak',    icon:'📅', name:'Week Warrior',       desc:'Train 7 days in a row' },
  { id:'first_session',  icon:'🏋️', name:'Off the Bench',     desc:'Complete a full session' },
  { id:'five_sessions',  icon:'🏃', name:'Regular Attendee',   desc:'Complete 5 sessions' },
  { id:'xp_100',         icon:'💯', name:'Century Club',        desc:'Earn 100 XP' },
  { id:'xp_500',         icon:'⚡', name:'Power Player',        desc:'Earn 500 XP' },
  { id:'rank_up',        icon:'📈', name:'Moving Up',           desc:'Reach Squad Player' },
  { id:'all_cats',       icon:'🎓', name:'Well Rounded',        desc:'Do all drill categories' },
  { id:'style_master',   icon:'🌟', name:'Style Icon',          desc:'Complete 3 style-matched drills' },
  { id:'top_rank',       icon:'🏆', name:'From Bench to Beast', desc:'Reach The Main Event' },
];

/* ══════════════════════════════════════════════
   STATE
══════════════════════════════════════════════ */
const ST = {
  name: 'Player', position: 'midfielder', playStyle: 'playmaker',
  xp: 0, sessionsCompleted: 0, drillsCompleted: 0,
  streak: 0, weeklyStreak: new Array(7).fill(false),
  skills: {}, achievements: {},
  completedIds: new Set(),
  catsDone: new Set(),
  styleMatchDone: 0,
  actData: Array.from({length:14}, () => Math.floor(Math.random()*9)+1),
  weekPlan: [], selectedDay: 0,
  filterCat: 'all', filterDiff: 'all', filterSearch: '', posOnly: false,
  todayDrills: [],
  yourAttrs: { speed: 45, dribbling: 42, passing: 48, shooting: 38, stamina: 50 },
};

/* ══════════════════════════════════════════════
   UTILS
══════════════════════════════════════════════ */
const $  = id => document.getElementById(id);
const $$ = sel => document.querySelectorAll(sel);

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length-1; i>0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getRank() {
  let r = RANKS[0];
  RANKS.forEach(rk => { if (ST.xp >= rk.minXP) r = rk; });
  return r;
}
function getNextRank() {
  return RANKS.find(r => r.minXP > ST.xp) || RANKS[RANKS.length-1];
}

let _toastTmo;
function toast(msg, ico='⚡') {
  $('toast-ico').textContent = ico;
  $('toast-msg').textContent = msg;
  const t = $('toast');
  t.classList.add('show');
  clearTimeout(_toastTmo);
  _toastTmo = setTimeout(() => t.classList.remove('show'), 3200);
}

function getPosObj(id) { return POSITIONS.find(p => p.id===id) || POSITIONS[2]; }
function getPsObj(id)  { return PLAY_STYLES[id] || PLAY_STYLES.playmaker; }

/* ══════════════════════════════════════════════
   XP & ACHIEVEMENTS
══════════════════════════════════════════════ */
function addXP(n) {
  const prev = getRank();
  ST.xp += n;
  const next = getRank();
  updateXPDisplay();
  if (next.id !== prev.id) {
    setTimeout(() => toast(`🎉 Rank up! ${next.name}`, '🏆'), 400);
    checkAch('rank_up');
    if (next.id === 'r6') checkAch('top_rank');
  }
  if (ST.xp >= 100) checkAch('xp_100');
  if (ST.xp >= 500) checkAch('xp_500');
}

function checkAch(id) {
  if (ST.achievements[id]) return;
  ST.achievements[id] = true;
  const a = ACHIEVEMENTS.find(x => x.id===id);
  if (a) setTimeout(() => { toast(`${a.icon} Badge: ${a.name}!`, a.icon); renderAch(); }, 600);
}

function updateXPDisplay() {
  $('xp-val').textContent = ST.xp;
  $('rank-orb').textContent = getRank().icon;
}

/* ══════════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════════ */
function nav(secId) {
  $$('.sec').forEach(s => s.classList.remove('active'));
  $$('.tn,.mtn').forEach(b => b.classList.remove('active'));
  const sec = $('sec-'+secId);
  if (sec) sec.classList.add('active');
  $$(`[data-sec="${secId}"]`).forEach(b => b.classList.add('active'));
  $('mob-drawer').classList.remove('open');
  if (secId==='progress') { renderProgress(); requestAnimationFrame(drawChart); }
  if (secId==='intel')    { renderProIntel(); }
}

/* ══════════════════════════════════════════════
   ONBOARDING
══════════════════════════════════════════════ */
function initOnboarding() {
  let selPos=null, selStyle=null;

  $$('#ob-pos-row .ob-pos').forEach(b => b.addEventListener('click', () => {
    $$('#ob-pos-row .ob-pos').forEach(x => x.classList.remove('sel'));
    b.classList.add('sel'); selPos=b.dataset.pos; validate();
  }));
  $$('#ob-style-grid .ob-style').forEach(b => b.addEventListener('click', () => {
    $$('#ob-style-grid .ob-style').forEach(x => x.classList.remove('sel'));
    b.classList.add('sel'); selStyle=b.dataset.style; validate();
  }));

  $('ob-name').addEventListener('input', validate);
  $('ob-name').addEventListener('keydown', e => { if(e.key==='Enter' && !$('ob-btn').disabled) start(); });
  $('ob-btn').addEventListener('click', start);

  function validate() {
    const ok = $('ob-name').value.trim().length >= 1 && selPos && selStyle;
    $('ob-btn').disabled = !ok;
  }

  function start() {
    ST.name = $('ob-name').value.trim() || 'Player';
    ST.position = selPos;
    ST.playStyle = selStyle;
    const skills = POS_SKILLS[ST.position] || POS_SKILLS.midfielder;
    skills.forEach(s => { ST.skills[s] = Math.floor(Math.random()*28)+42; });
    const ob = $('ob-screen');
    ob.style.transition = 'opacity .4s, transform .4s';
    ob.style.opacity = '0'; ob.style.transform = 'scale(.97)';
    setTimeout(() => {
      ob.style.display = 'none';
      $('app').classList.remove('hidden');
      initApp();
    }, 400);
  }
}

/* ══════════════════════════════════════════════
   APP INIT
══════════════════════════════════════════════ */
function initApp() {
  genWeekPlan(); genTodayDrills();
  renderMotivation();
  renderHero(); renderPlayStyleCard();
  renderPosGrid(); renderStreakRow();
  renderTodaySession(); renderDrillGrid();
  renderWeekStrip(); renderDayPlan(0);
  renderWeekOverview();
  renderFormations(); renderTactics();
  renderRecovery();
  updateXPDisplay();
  bindNav(); bindDrillFilters(); bindPlanActions(); bindModals(); bindHamburger();
  $('motiv-refresh').addEventListener('click', renderMotivation);
  $('h-start-btn').addEventListener('click', () => nav('plan'));
  $('change-style-btn').addEventListener('click', openStyleModal);
}

/* ══════════════════════════════════════════════
   MOTIVATION
══════════════════════════════════════════════ */
function renderMotivation() {
  const idx = Math.floor(Math.random()*MOTIVATIONS.length);
  $('motiv-txt').style.opacity='0';
  setTimeout(() => {
    $('motiv-txt').textContent = '"' + MOTIVATIONS[idx] + '"';
    $('motiv-txt').style.transition='opacity .4s';
    $('motiv-txt').style.opacity='1';
  }, 200);
}

/* ══════════════════════════════════════════════
   HERO
══════════════════════════════════════════════ */
function renderHero() {
  const pos = getPosObj(ST.position);
  const ps  = getPsObj(ST.playStyle);
  const rk  = getRank();
  $('h-name').textContent = ST.name;
  $('h-pos-tag').textContent  = `${pos.icon} ${pos.name}`;
  $('h-style-tag').textContent= `${ps.icon} ${ps.name}`;
  $('h-rank-pill').textContent = `${rk.icon} ${rk.name.toUpperCase()}`;
  $('h-streak-pill').textContent = `🔥 ${ST.streak} day streak`;
  $('hs-sess').textContent   = ST.sessionsCompleted;
  $('hs-drills').textContent = ST.drillsCompleted;
  $('hs-xp').textContent     = ST.xp;
}

/* ══════════════════════════════════════════════
   PLAY STYLE CARD
══════════════════════════════════════════════ */
function renderPlayStyleCard() {
  const ps = getPsObj(ST.playStyle);
  $('playstyle-card').innerHTML = `
    <div class="ps-card">
      <div class="ps-icon">${ps.icon}</div>
      <div class="ps-info">
        <h3>${ps.name}</h3>
        <p>${ps.desc}</p>
        <div class="ps-traits">${ps.traits.map(t=>`<span class="ps-trait">${t}</span>`).join('')}</div>
      </div>
    </div>`;
  // Also update hero tag
  $('h-style-tag').textContent = `${ps.icon} ${ps.name}`;
}

/* ══════════════════════════════════════════════
   PLAY STYLE MODAL
══════════════════════════════════════════════ */
function openStyleModal() {
  const grid = $('style-pick-grid');
  grid.innerHTML = Object.entries(PLAY_STYLES).map(([key, ps]) => `
    <button class="sp-btn ${ST.playStyle===key?'sel':''}" data-style="${key}">
      <span style="font-size:28px">${ps.icon}</span>
      <span>${ps.name}</span>
    </button>`).join('');

  grid.querySelectorAll('.sp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      grid.querySelectorAll('.sp-btn').forEach(x=>x.classList.remove('sel'));
      btn.classList.add('sel');
      ST.playStyle = btn.dataset.style;
      genTodayDrills();
      renderPlayStyleCard();
      renderTodaySession();
      renderDrillGrid();
      closeStyleModal();
      toast(`Play style: ${getPsObj(ST.playStyle).name}`, getPsObj(ST.playStyle).icon);
    });
  });

  $('style-modal-bg').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeStyleModal() {
  $('style-modal-bg').classList.remove('open');
  document.body.style.overflow = '';
}

/* ══════════════════════════════════════════════
   POSITION GRID
══════════════════════════════════════════════ */
function renderPosGrid() {
  $('pos-grid').innerHTML = POSITIONS.map(p=>`
    <div class="pos-card ${ST.position===p.id?'active':''}" data-pos="${p.id}">
      <span class="pc-em">${p.icon}</span>
      <span class="pc-nm">${p.name}</span>
    </div>`).join('');
  $('pos-grid').querySelectorAll('.pos-card').forEach(c => {
    c.addEventListener('click', () => {
      ST.position = c.dataset.pos;
      const skills = POS_SKILLS[ST.position]||POS_SKILLS.midfielder;
      ST.skills={};
      skills.forEach(s=>{ST.skills[s]=Math.floor(Math.random()*28)+42;});
      genWeekPlan(); genTodayDrills();
      renderHero(); renderPosGrid(); renderTodaySession(); renderDrillGrid();
      renderWeekStrip(); renderDayPlan(ST.selectedDay); renderWeekOverview();
      $('pos-badge-plan').textContent = getPosObj(ST.position).name;
      toast(`Position: ${getPosObj(ST.position).name}`, getPosObj(ST.position).icon);
    });
  });
}

/* ══════════════════════════════════════════════
   STREAK
══════════════════════════════════════════════ */
function renderStreakRow() {
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const todayIdx = (() => { const d=new Date().getDay(); return d===0?6:d-1; })();
  const done = ST.weeklyStreak.filter(Boolean).length;
  $('streak-lbl').textContent = `${done}/7`;
  $('streak-row').innerHTML = days.map((d,i) => `
    <div class="sd ${ST.weeklyStreak[i]?'done':''} ${i===todayIdx?'today':''}">
      <div class="sd-c">${ST.weeklyStreak[i]?'✓':i===todayIdx?'·':''}</div>
      <div class="sd-l">${d}</div>
    </div>`).join('');
}

/* ══════════════════════════════════════════════
   TODAY'S SESSION
══════════════════════════════════════════════ */
function genTodayDrills() {
  const ps = getPsObj(ST.playStyle);
  // Prioritise style-matched drills
  const styleMatch = DRILLS.filter(d => d.styleKeys.includes(ST.playStyle));
  const posMatch   = DRILLS.filter(d => d.positions.includes(ST.position) && !d.styleKeys.includes(ST.playStyle));
  const rest       = DRILLS.filter(d => !styleMatch.includes(d) && !posMatch.includes(d));
  const pool = [...shuffle(styleMatch), ...shuffle(posMatch), ...shuffle(rest)];
  ST.todayDrills = pool.slice(0, 4);
}

function renderTodaySession() {
  const drills = ST.todayDrills;
  let html = '<div class="sess-list">' + drills.map((d,i) => `
    <div class="sess-step ${ST.completedIds.has(d.id)?'done':''}" data-id="${d.id}" id="ssp-${d.id}">
      <div class="ss-n">${i+1}</div>
      <div class="ss-info">
        <div class="ss-name">${d.icon} ${d.name}${d.styleKeys.includes(ST.playStyle)?` <span class="style-badge">${getPsObj(ST.playStyle).name}</span>`:''}</div>
        <div class="ss-meta">${d.duration} · ${d.equipment.split(',')[0]}</div>
      </div>
      <div class="ss-xp">+${d.xp}</div>
      <div class="ss-ck">✓</div>
    </div>`).join('') +
    '<button class="sess-complete-btn" id="sess-full-btn">✓ COMPLETE FULL SESSION</button></div>';
  $('today-sess').innerHTML = html;

  drills.forEach(d => {
    const el = document.getElementById('ssp-'+d.id);
    if (el) el.addEventListener('click', () => completeDrill(d.id));
  });
  $('sess-full-btn').addEventListener('click', completeSession);
}

function completeDrill(id) {
  if (ST.completedIds.has(id)) return;
  const d = DRILLS.find(x=>x.id===id); if(!d) return;
  ST.completedIds.add(id);
  ST.drillsCompleted++;
  ST.catsDone.add(d.category);
  if (d.styleKeys.includes(ST.playStyle)) {
    ST.styleMatchDone++;
    if (ST.styleMatchDone >= 3) checkAch('style_master');
  }
  const el = document.getElementById('ssp-'+id);
  if (el) el.classList.add('done');
  addXP(d.xp);
  toast(`+${d.xp} XP — ${d.name} done!`, '⚽');
  if (ST.drillsCompleted===1) checkAch('first_drill');
  if (ST.drillsCompleted>=5) checkAch('five_drills');
  if (ST.catsDone.size>=3) checkAch('all_cats');
  renderHero();
}

function completeSession() {
  ST.sessionsCompleted++;
  ST.streak++;
  const todayIdx = (() => { const d=new Date().getDay(); return d===0?6:d-1; })();
  ST.weeklyStreak[todayIdx] = true;
  ST.todayDrills.forEach(d => { if(!ST.completedIds.has(d.id)) { ST.completedIds.add(d.id); ST.drillsCompleted++; } });
  addXP(80);
  toast('🏆 Session complete! +80 XP', '🏆');
  if (ST.sessionsCompleted===1) checkAch('first_session');
  if (ST.sessionsCompleted>=5) checkAch('five_sessions');
  if (ST.streak>=7) checkAch('week_streak');
  renderHero(); renderTodaySession(); renderStreakRow();
}

/* ══════════════════════════════════════════════
   DRILL LIBRARY
══════════════════════════════════════════════ */
function getFilteredDrills() {
  return DRILLS.filter(d => {
    if (ST.filterCat!=='all' && d.category!==ST.filterCat) return false;
    if (ST.filterDiff!=='all' && d.difficulty!==ST.filterDiff) return false;
    if (ST.posOnly && !d.positions.includes(ST.position)) return false;
    if (ST.filterSearch) {
      const q = ST.filterSearch.toLowerCase();
      if (!d.name.toLowerCase().includes(q) && !d.description.toLowerCase().includes(q)) return false;
    }
    return true;
  });
}

function renderDrillGrid() {
  const drills = getFilteredDrills();
  const grid = $('drill-grid');
  $('d-count').textContent = `Showing ${drills.length} drill${drills.length!==1?'s':''}`;
  const diffCls = {beginner:'tg', intermediate:'ta', advanced:'tr'};
  const catCls  = {technical:'tb', fitness:'tg', tactical:'ta'};
  if (!drills.length) {
    grid.innerHTML=`<div style="grid-column:1/-1;padding:40px;text-align:center;color:var(--tx3);font-family:var(--fd);font-size:13px;letter-spacing:1px">No drills match your filters.</div>`;
    return;
  }
  const isStyleMatch = d => d.styleKeys.includes(ST.playStyle);
  grid.innerHTML = drills.map(d => `
    <div class="dc ${isStyleMatch(d)?'style-match':''}" data-cat="${d.category}" data-id="${d.id}">
      <div class="dc-top">
        <span class="dc-ico">${d.icon}</span>
        <div class="dc-tags">
          <span class="tag ${catCls[d.category]||'td'}">${d.category}</span>
          <span class="tag ${diffCls[d.difficulty]||'td'}">${d.difficulty}</span>
          ${isStyleMatch(d)?`<span class="style-badge">${getPsObj(ST.playStyle).icon} ${getPsObj(ST.playStyle).name}</span>`:''}
        </div>
      </div>
      <div class="dc-nm">${d.name}</div>
      <div class="dc-desc">${d.description.substring(0,80)}…</div>
      <div class="dc-foot">
        <span class="dc-meta">⏱ ${d.duration} · 🎽 ${d.equipment.split(',')[0]}</span>
        <span class="dc-xp">+${d.xp} XP</span>
      </div>
    </div>`).join('');
  grid.querySelectorAll('.dc').forEach(c => c.addEventListener('click', () => openDrillModal(parseInt(c.dataset.id))));
}

function bindDrillFilters() {
  $$('#cat-fs .fp').forEach(p => p.addEventListener('click', () => {
    $$('#cat-fs .fp').forEach(x=>x.classList.remove('on')); p.classList.add('on');
    ST.filterCat=p.dataset.cat; renderDrillGrid();
  }));
  $$('#diff-fs .fp').forEach(p => p.addEventListener('click', () => {
    $$('#diff-fs .fp').forEach(x=>x.classList.remove('on')); p.classList.add('on');
    ST.filterDiff=p.dataset.diff; renderDrillGrid();
  }));
  $('d-search').addEventListener('input', e => { ST.filterSearch=e.target.value; renderDrillGrid(); });
  $('pos-toggle').addEventListener('click', function() {
    ST.posOnly=!ST.posOnly; this.classList.toggle('on',ST.posOnly); renderDrillGrid();
  });
}

/* ══════════════════════════════════════════════
   DRILL MODAL
══════════════════════════════════════════════ */
function openDrillModal(id) {
  const d = DRILLS.find(x=>x.id===id); if(!d) return;
  const diffCls = {beginner:'tg', intermediate:'ta', advanced:'tr'};
  const catCls  = {technical:'tb', fitness:'tg', tactical:'ta'};
  $('modal-inner').innerHTML = `
    <div class="m-ico">${d.icon}</div>
    <div class="m-nm">${d.name}</div>
    <div class="m-tags">
      <span class="tag ${catCls[d.category]}">${d.category}</span>
      <span class="tag ${diffCls[d.difficulty]}">${d.difficulty}</span>
      <span class="tag ta">+${d.xp} XP</span>
      ${d.styleKeys.includes(ST.playStyle)?`<span class="style-badge">${getPsObj(ST.playStyle).icon} ${getPsObj(ST.playStyle).name} match</span>`:''}
    </div>
    <div class="m-meta"><span>⏱ ${d.duration}</span><span>🎽 ${d.equipment}</span></div>
    <p class="m-desc">${d.description}</p>
    <div class="m-steps-lbl">STEP-BY-STEP INSTRUCTIONS</div>
    <ol class="m-steps">${d.steps.map((s,i)=>`<li><span class="m-sn">${i+1}</span><span>${s}</span></li>`).join('')}</ol>
    <div class="m-coach">${d.coachNote}</div>
    <button class="m-do-btn" id="m-do-btn">${ST.completedIds.has(id)?'✓ Already completed':`MARK AS DONE (+${d.xp} XP)`}</button>`;
  const btn = $('m-do-btn');
  if (ST.completedIds.has(id)) { btn.style.opacity='.5'; btn.disabled=true; }
  else btn.addEventListener('click', () => {
    completeDrill(id); btn.textContent='✓ Done!'; btn.style.opacity='.5'; btn.disabled=true;
    closeDrillModal();
  });
  $('modal-bg').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeDrillModal() { $('modal-bg').classList.remove('open'); document.body.style.overflow=''; }

/* ══════════════════════════════════════════════
   TRAINING PLAN
══════════════════════════════════════════════ */
function genWeekPlan() {
  ST.weekPlan = WEEK_SCHED.map(day => {
    if (day.type==='rest'||day.type==='recovery') return {...day, drills:[]};
    let pool;
    if (day.type==='match') {
      pool = DRILLS.filter(d=>d.category==='tactical');
    } else {
      pool = DRILLS.filter(d=>d.category===day.type && d.positions.includes(ST.position));
      if (!pool.length) pool = DRILLS.filter(d=>d.category===day.type);
    }
    if (!pool.length) pool=[...DRILLS];
    // prioritise style drills
    const styleFirst = pool.filter(d=>d.styleKeys.includes(ST.playStyle));
    const rest = pool.filter(d=>!d.styleKeys.includes(ST.playStyle));
    return {...day, drills: [...shuffle(styleFirst), ...shuffle(rest)].slice(0,3)};
  });
}

function renderWeekStrip() {
  const today = new Date();
  const dow = today.getDay();
  const mondayOff = dow===0?-6:1-dow;
  const monday = new Date(today); monday.setDate(today.getDate()+mondayOff);
  const todayIdx = dow===0?6:dow-1;
  $('week-strip').innerHTML = WEEK_SCHED.map((day,i) => {
    const dt = new Date(monday); dt.setDate(monday.getDate()+i);
    const hp = ST.weekPlan[i]?.drills?.length>0;
    return `<div class="wdb ${i===todayIdx?'today':''} ${i===ST.selectedDay?'sel':''} ${hp?'hp':''}" data-di="${i}">
      <span class="wdb-d">${day.short}</span>
      <span class="wdb-n">${dt.getDate()}</span>
      <span class="wdb-dot"></span>
    </div>`;
  }).join('');
  $$('.wdb').forEach(b => b.addEventListener('click', () => {
    ST.selectedDay=parseInt(b.dataset.di); renderWeekStrip(); renderDayPlan(ST.selectedDay);
  }));
}

function renderDayPlan(idx) {
  const plan = ST.weekPlan[idx]; if(!plan) return;
  const isRest = plan.type==='rest'||plan.type==='recovery';
  let html = `<div class="dp-hd"><h4>${plan.full} — ${plan.label}</h4><span class="tag td">${plan.label}</span></div>`;
  if (isRest) {
    html += `<div class="rest-msg">${plan.type==='rest'?'🛌 Rest day. Hydrate. Sleep 8 hours.':'🧘 Active recovery only. Light stretch and walk.'}</div>`;
  } else {
    html += `<div class="dp-body">${plan.drills.map(d=>`
      <div class="pd-row" data-id="${d.id}">
        <span class="pd-dot"></span>
        <span class="pd-nm">${d.icon} ${d.name}${d.styleKeys.includes(ST.playStyle)?` <span class="style-badge">${getPsObj(ST.playStyle).icon}</span>`:''}</span>
        <span class="pd-t">${d.duration}</span>
      </div>`).join('')}</div>`;
  }
  $('day-plan').innerHTML = html;
  $('day-plan').querySelectorAll('.pd-row').forEach(r => r.addEventListener('click', () => openDrillModal(parseInt(r.dataset.id))));
}

function renderWeekOverview() {
  $('wov').innerHTML = ST.weekPlan.map(d=>`
    <div class="wov-c">
      <div class="wov-d">${d.short}</div>
      <div class="wov-t">${d.label}</div>
      <div class="wov-n">${d.drills?.length?d.drills.length+' drills':'No training'}</div>
    </div>`).join('');
}

function bindPlanActions() {
  $('regen-plan').addEventListener('click', () => {
    genWeekPlan(); renderWeekStrip(); renderDayPlan(ST.selectedDay); renderWeekOverview();
    toast('New plan generated!','📅');
  });
  $('regen-today').addEventListener('click', () => { genTodayDrills(); renderTodaySession(); toast("Today's session refreshed!",'↺'); });
  $('pos-badge-plan').textContent = getPosObj(ST.position).name;
}

/* ══════════════════════════════════════════════
   FORMATIONS
══════════════════════════════════════════════ */
function renderFormations() {
  $('formation-grid').innerHTML = FORMATIONS.map(f => `
    <div class="form-card">
      <div class="form-pitch">
        <div class="pitch-center-line"></div>
        <div class="form-name">${f.name}</div>
        ${f.dots.map(dot=>`
          <div class="fp-dot ${dot.gk?'gk':''}" style="top:${dot.t}%;left:${dot.l}%" title="${dot.role}">
            ${dot.role.length<=2?dot.role:''}
          </div>`).join('')}
      </div>
      <div class="form-info">
        <h4>${f.name}</h4>
        <p>${f.tagline} ${f.desc}</p>
        <div class="form-roles">${f.roles.slice(0,6).map(r=>`<span class="role-chip">${r}</span>`).join('')}${f.roles.length>6?`<span class="role-chip">+${f.roles.length-6}</span>`:''}</div>
        <div style="margin-top:10px;font-size:11px;color:var(--tx2)">
          ✅ ${f.pros.join(' · ')}
        </div>
      </div>
    </div>`).join('');
}

/* ══════════════════════════════════════════════
   TACTICS
══════════════════════════════════════════════ */
function renderTactics() {
  const tagCls = {Offensive:'tr', Transitional:'ta', Dominant:'tb', Defensive:'td', Aggressive:'tg', Technical:'tb'};
  $('tactic-grid').innerHTML = TACTICS.map(t => `
    <div class="tactic-card" style="--tc:${t.color}">
      <div class="tc-ico">${t.icon}</div>
      <div class="tc-nm">${t.name}</div>
      <div class="tc-tag"><span class="tag ${tagCls[t.tag]||'td'}">${t.tag}</span></div>
      <div class="tc-desc">${t.desc}</div>
      <div style="font-size:12px;color:var(--tx2);font-style:italic;margin-bottom:10px">${t.when}</div>
      <div class="tc-keys">${t.keys.map(k=>`<span class="tc-key">${k}</span>`).join('')}</div>
    </div>`).join('');
  // Accent lines
  $$('.tactic-card').forEach((c,i) => { c.style.setProperty('--tc', TACTICS[i].color); c.querySelector('.tc-nm').style.color = TACTICS[i].color; });
}

/* ══════════════════════════════════════════════
   PRO INTEL
══════════════════════════════════════════════ */
function renderProIntel() {
  renderComparison();
  renderProCards();
}

function renderComparison() {
  const attrLabels = { speed:'Speed', dribbling:'Dribbling', passing:'Passing', shooting:'Shooting', stamina:'Stamina' };
  $('compare-wrap').innerHTML = PRO_PLAYERS.map(pro => `
    <div class="compare-card">
      <div class="cc-head">
        <div class="cc-icon">${pro.icon}</div>
        <div class="cc-info">
          <h3>${pro.country} ${pro.name}</h3>
          <p>${pro.team}</p>
          <p style="font-style:italic;font-size:11px;color:var(--tx2);margin-top:2px">${pro.headline}</p>
        </div>
      </div>
      <div class="cc-body">
        ${Object.entries(attrLabels).map(([key, label]) => `
          <div class="cmp-attr">
            <div class="cmp-attr-head">
              <span>${label}</span>
            </div>
            <div class="cmp-bars">
              <div class="cmp-bar-row cmp-bar-you">
                <span class="cmp-bar-lbl">You</span>
                <div class="cmp-bar-track"><div class="cmp-bar-fill" data-w="${ST.yourAttrs[key]}" style="width:0%"></div></div>
                <span class="cmp-bar-val">${ST.yourAttrs[key]}</span>
              </div>
              <div class="cmp-bar-row cmp-bar-pro">
                <span class="cmp-bar-lbl">${pro.name.split(' ')[0]}</span>
                <div class="cmp-bar-track"><div class="cmp-bar-fill" data-w="${pro.attrs[key]}" style="width:0%"></div></div>
                <span class="cmp-bar-val">${pro.attrs[key]}</span>
              </div>
            </div>
          </div>`).join('')}
      </div>
    </div>`).join('');

  // Animate bars
  requestAnimationFrame(() => {
    setTimeout(() => {
      $$('.cmp-bar-fill').forEach(b => { b.style.transition='width 1.1s cubic-bezier(.22,1,.36,1)'; b.style.width=b.dataset.w+'%'; });
    }, 100);
  });
}

function renderProCards() {
  $('pro-grid').innerHTML = PRO_PLAYERS.map(pro => `
    <div class="pro-card">
      <div class="pro-head">
        <div class="pro-em">${pro.icon}</div>
        <div>
          <div class="pro-nm">${pro.country} ${pro.name}</div>
          <div class="pro-team">${pro.team}</div>
        </div>
      </div>
      <div class="pro-body">
        ${pro.trainRef.map(ref=>`
          <div class="pro-trait">
            <span class="pro-trait-ico">${ref.ico}</span>
            <span class="pro-trait-txt">${ref.text}</span>
          </div>`).join('')}
      </div>
    </div>`).join('');
}

/* ══════════════════════════════════════════════
   RECOVERY
══════════════════════════════════════════════ */
function renderRecovery() {
  $('recovery-grid').innerHTML = RECOVERY_CARDS.map(c => `
    <div class="rec-card">
      <div class="rec-head">
        <span class="rec-ico">${c.icon}</span>
        <div>
          <h3>${c.title}</h3>
          <div class="rec-tag"><span class="tag ${c.tag.cls}">${c.tag.label}</span></div>
        </div>
      </div>
      <div class="rec-body">
        ${c.items.map(it=>`
          <div class="rec-item">
            <span class="rec-item-ico">${it.ico}</span>
            <span class="rec-item-txt">${it.txt}</span>
          </div>`).join('')}
      </div>
    </div>`).join('');
}

/* ══════════════════════════════════════════════
   PROGRESS
══════════════════════════════════════════════ */
function renderProgress() {
  renderBigStats(); renderXPBlock(); renderRankLadder();
  renderSkillBars(); renderAch();
}

function renderBigStats() {
  $('big-stats').innerHTML = `
    <div class="bst"><div class="bst-v">${ST.sessionsCompleted}</div><div class="bst-l">Sessions</div></div>
    <div class="bst"><div class="bst-v">${ST.drillsCompleted}</div><div class="bst-l">Drills Done</div></div>
    <div class="bst"><div class="bst-v">${ST.streak}</div><div class="bst-l">Day Streak</div></div>`;
}

function renderXPBlock() {
  const rk = getRank(); const nx = getNextRank();
  const span = nx.minXP - rk.minXP;
  const filled = span>0 ? Math.min(100, Math.round(((ST.xp-rk.minXP)/span)*100)) : 100;
  $('xp-blk').innerHTML = `
    <div class="blk-hd"><h3 class="blk-t">XP &amp; RANK</h3></div>
    <div class="xp-blk-inner">
      <div class="xp-top">
        <div class="xp-ico">${rk.icon}</div>
        <div class="xp-info">
          <h3>${rk.name}</h3>
          <p>${ST.xp} XP · ${Math.max(0,nx.minXP-ST.xp)} XP TO ${nx.name.toUpperCase()}</p>
        </div>
      </div>
      <div>
        <div class="xp-bar-lbl"><span>${rk.name}</span><span>${rk.minXP} / ${nx.minXP} XP</span></div>
        <div class="xp-track"><div class="xp-fill" style="width:${filled}%"></div></div>
      </div>
    </div>`;
}

function renderRankLadder() {
  const cur = getRank();
  $('rank-ladder').innerHTML = RANKS.map(r => `
    <div class="ri ${r.id===cur.id?'cur':''} ${ST.xp>r.minXP&&r.id!==cur.id?'done':''}">
      <span class="ri-ico">${r.icon}</span>
      <span class="ri-nm">${r.name}</span>
      <span class="ri-xp">${r.minXP} XP</span>
      ${r.id===cur.id?`<span class="tag tg" style="font-size:8px;padding:2px 6px">NOW</span>`:''}
    </div>`).join('');
}

function renderSkillBars() {
  $('skill-bars').innerHTML = Object.entries(ST.skills).map(([nm, v])=>`
    <div class="skb">
      <div class="skb-hd">
        <span class="skb-nm">${nm}</span>
        <span class="skb-v">${v}</span>
      </div>
      <div class="skb-track"><div class="skb-fill" style="width:0%" data-t="${v}"></div></div>
    </div>`).join('');
  requestAnimationFrame(()=>setTimeout(()=>{ $$('.skb-fill').forEach(b=>{b.style.width=b.dataset.t+'%';}); }, 80));
}

function renderAch() {
  $('ach-grid').innerHTML = ACHIEVEMENTS.map(a => `
    <div class="ach ${ST.achievements[a.id]?'unlocked':'locked'}" title="${a.desc}">
      <span class="ach-ck">✓</span>
      <span class="ach-ic">${a.icon}</span>
      <span class="ach-nm">${a.name}</span>
    </div>`).join('');
}

/* ══════════════════════════════════════════════
   ACTIVITY CHART
══════════════════════════════════════════════ */
function drawChart() {
  const canvas = $('act-canvas'); if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.parentElement.offsetWidth - 20;
  if (W<=0) return;
  canvas.width=W; canvas.height=130;
  const H=130, padL=28, padR=10, padT=10, padB=22;
  const iW=W-padL-padR, iH=H-padT-padB;
  const data=ST.actData, maxV=Math.max(...data)+2;
  ctx.clearRect(0,0,W,H);
  // Grid lines
  for(let i=0;i<=3;i++){
    const y=padT+(iH/3)*i;
    ctx.beginPath(); ctx.moveTo(padL,y); ctx.lineTo(W-padR,y);
    ctx.strokeStyle='rgba(255,255,255,.05)'; ctx.lineWidth=1; ctx.stroke();
  }
  const pts=data.map((v,i)=>({x:padL+(i/(data.length-1))*iW, y:padT+iH*(1-v/maxV)}));
  // Fill
  ctx.beginPath(); ctx.moveTo(pts[0].x,H-padB);
  pts.forEach(p=>ctx.lineTo(p.x,p.y));
  ctx.lineTo(pts[pts.length-1].x,H-padB); ctx.closePath();
  const g=ctx.createLinearGradient(0,padT,0,H-padB);
  g.addColorStop(0,'rgba(0,230,118,.22)'); g.addColorStop(1,'rgba(0,230,118,0)');
  ctx.fillStyle=g; ctx.fill();
  // Line
  ctx.beginPath();
  pts.forEach((p,i)=>i===0?ctx.moveTo(p.x,p.y):ctx.lineTo(p.x,p.y));
  ctx.strokeStyle='#00e676'; ctx.lineWidth=2;
  ctx.lineJoin='round'; ctx.lineCap='round'; ctx.stroke();
  // Dots
  pts.forEach(p=>{ ctx.beginPath(); ctx.arc(p.x,p.y,3,0,Math.PI*2); ctx.fillStyle='#00e676'; ctx.fill(); });
  // Labels
  ctx.fillStyle='rgba(242,242,238,.24)';
  ctx.font=`9px Barlow Condensed,sans-serif`; ctx.textAlign='center';
  ['1','','3','','5','','7','','9','','11','','13','14'].forEach((l,i)=>{ if(l) ctx.fillText(l,pts[i].x,H-4); });
}

/* ══════════════════════════════════════════════
   NAV & EVENT BINDINGS
══════════════════════════════════════════════ */
function bindNav() {
  $$('.tn').forEach(b => b.addEventListener('click', ()=>nav(b.dataset.sec)));
  $$('.mtn').forEach(b => b.addEventListener('click', ()=>nav(b.dataset.sec)));
}

function bindHamburger() {
  $('hbg-btn').addEventListener('click', ()=>{
    $('mob-drawer').classList.toggle('open');
  });
}

function bindModals() {
  $('modal-x').addEventListener('click', closeDrillModal);
  $('modal-bg').addEventListener('click', e=>{ if(e.target===$('modal-bg')) closeDrillModal(); });
  $('style-modal-x').addEventListener('click', closeStyleModal);
  $('style-modal-bg').addEventListener('click', e=>{ if(e.target===$('style-modal-bg')) closeStyleModal(); });
}

/* ══════════════════════════════════════════════
   TOPBAR SCROLL SHADOW
══════════════════════════════════════════════ */
window.addEventListener('scroll', ()=>{
  const tb=$('topbar');
  if(tb) tb.style.boxShadow = window.scrollY>8?'0 2px 20px rgba(0,0,0,.5)':'none';
});

/* ══════════════════════════════════════════════
   BOOT
══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', initOnboarding);
