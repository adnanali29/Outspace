// All page copy lives here. Keep it short: one idea per line, written the way
// you would say it to a parent.

// Digits only, with country code, e.g. "919876543210". Until this is set, the
// page offers a phone call instead of WhatsApp chat.
export const whatsappNumber = "";

const whatsappHref = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      "Hi Outpace Academy, I'd like to know more about your chess classes.",
    )}`
  : undefined;

const phone = "+91 94296 92587";
const phoneHref = "tel:+919429692587";

// The quickest way to reach a person: WhatsApp when set up, otherwise a call.
export const talkToUs = whatsappHref
  ? { label: "Chat on WhatsApp", short: "Chat", href: whatsappHref, external: true }
  : { label: `Call ${phone}`, short: "Call", href: phoneHref, external: false };

// SAMPLE slots: replace with real availability. weekday: 0 = Sunday.
export const sessionSlots = [
  { label: "Sat, 11:00 AM", weekday: 6, hour: 11, minute: 0 },
  { label: "Sat, 5:00 PM", weekday: 6, hour: 17, minute: 0 },
  { label: "Sun, 11:00 AM", weekday: 0, hour: 11, minute: 0 },
  { label: "Wed, 6:00 PM", weekday: 3, hour: 18, minute: 0 },
];

// SAMPLE length, used only for the "Add to calendar" entry.
export const sessionMinutes = 30;

export const childAges = ["5", "6", "7", "8", "9", "10", "11", "12", "13"];

export const chessLevels = [
  "Complete beginner",
  "Knows the basics",
  "Plays regularly",
  "Tournament player",
];

// Clean, streamlined navigation bar focusing on what parents need most
export const navLinks = [
  { label: "The Programme", href: "#program" },
  { label: "How It Works", href: "#start" },
  { label: "Meet Our Team", href: "#team" },
  { label: "FAQs", href: "#faqs" },
];

export const heroSlideSeconds = 5;

export const heroImages = [
  {
    src: "/hero/online-chess-coaching-warmth.jpg",
    alt: "A smiling child learning chess online with their encouraging Outpace coach",
  },
  {
    src: "/hero/chess-class-focus.webp",
    alt: "A child and coach sharing a natural moment of encouragement during an online chess session",
  },
  {
    src: "/hero/chess-class-move.webp",
    alt: "A child smiling while learning chess online with their Outpace coach",
  },
];

export const hero = {
  eyebrow: "OUTPACE CHESS GROWTH MENTORSHIP PROGRAM",
  title: "HELP YOUR CHILD BUILD FOCUS, CONFIDENCE AND INDEPENDENT THINKING THROUGH CHESS.",
  titleAccent: "",
  lede: "Structured online chess coaching and personalised growth mentoring for children aged 5–13.",
  subLede: "An enjoyable chess journey where your child is understood, encouraged and supported.",
  playLink: "Or play a game of chess with your child",
};

export const trust = [
  { value: "9000+", label: "children enrolled across Outpace" },
  { value: "100K+", label: "online classes conducted" },
  { value: "4–6", label: "children in every group" },
  { value: "8 + 2", label: "chess and mentor sessions a month" },
];

export const heart = {
  kicker: "THE HEART OF OUTPACE",
  title: "EVERY CHILD DESERVES TO BE UNDERSTOOD.",
  videoCaption: "A short glimpse of how our coach and Child Growth Mentor connect with each child online.",
  lines: [
    "Some children need a challenge.",
    "Some need more time.",
    "Others need someone who listens and believes in them.",
  ],
  body: "At Outpace, we take time to understand your child. Through enjoyable chess learning and personalised mentoring, we help them discover their strengths, learn from setbacks and grow in confidence.",
  promise: "We want your child to feel: “I can try. I can learn. I can grow.”",
};

export const learn = {
  kicker: "WHAT YOUR CHILD DEVELOPS",
  title: "STRONGER CHESS SKILLS. GROWING CONFIDENCE. MORE THOUGHTFUL CHOICES.",
  intro:
    "Through chess coaching and personalised mentoring, we help your child develop these habits:",
  items: [
    { title: "Focus", text: "Stay with a challenge and return to it when distracted." },
    { title: "Patience", text: "Pause, take time and think before acting." },
    { title: "Confidence & Communication", text: "Share ideas, ask questions and try unfamiliar challenges." },
    { title: "Independent Thinking", text: "Explore options, consider consequences and make their own choices." },
    { title: "Resilience", text: "Learn from mistakes and find the courage to try again." },
    { title: "Learning Ownership", text: "Take greater responsibility for practice, effort and improvement." },
  ],
};

export const outcomes = {
  kicker: "THE OUTCOMES",
  title: "GROWTH YOU CAN RECOGNISE.",
  items: [
    {
      title: "At the chessboard",
      text: "Understand the game better, plan ahead and make more thoughtful moves.",
      piece: "n" as const,
    },
    {
      title: "Beyond the chessboard",
      text: "Build confidence, take responsibility for learning and find the courage to try again after setbacks.",
      piece: "k" as const,
    },
    {
      title: "For you as a parent",
      text: "Understand your child's progress, strengths and support needs through monthly updates and conversations with the Child Growth Mentor.",
      piece: "q" as const,
    },
  ],
};

export const game = {
  kicker: "TRY IT WITH YOUR CHILD",
  title: "PLAY A GAME OF CHESS, RIGHT HERE.",
  intro: "You play white. Tap a piece, then tap where it should go.",
  levelLabel: "Choose your opponent",
  levels: [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ],
  start: "Your move. Pawns and knights are a good place to start.",
  yourMove: "Your move. Take your time.",
  thinking: "The computer is thinking…",
  check: "Check! Your king is under attack. Protect it.",
  youWon: "Checkmate. You won! That pause before a move is what we teach.",
  computerWon: "Checkmate. The computer won this one. Every game teaches something, so try again.",
  draw: "It’s a draw. Nobody lost, and that takes patience too.",
  youTook: "You took:",
  computerTook: "Computer took:",
  noneTaken: "nothing yet",
  hint: "Show a hint",
  takeBack: "Take back",
  newGame: "New game",
  cta: "Book my free session",
  note: "New to chess? Our coaches start from how the pieces move.",
  noteLink: "Book a free session",
} as const;

export const program = {
  kicker: "THE PROGRAMME",
  title: "WHAT YOUR CHILD RECEIVES",
  people: [
    {
      piece: "n",
      role: "The chess coach",
      text: "Teaches the game in a small online group, at your child’s level.",
    },
    {
      piece: "q",
      role: "The Child Growth Mentor",
      text: "Supports confidence, resilience and steady effort through group and individual mentoring.",
    },
    {
      piece: "k",
      role: "You, the parent",
      text: "A Monthly Growth Snapshot and a parent–mentor call, every month.",
    },
  ],
  numbersTitle: "THE PROGRAMME INCLUDES",
  numbers: [
    { value: "8", label: "live chess coaching sessions each month" },
    { value: "2", label: "group sessions with a Child Growth Mentor each month" },
    { value: "4–6", label: "students per batch, matched to learning level" },
    { value: "1", label: "Class Mentor who observes participation and coordinates support" },
  ],
  listTitle: "ALSO INCLUDED",
  list: [
    "Daily game practice opportunities and chess puzzles",
    "Individual growth mentoring when needed",
    "A Monthly Growth Snapshot and parent–mentor call",
    "Tournament opportunities and guidance, based on readiness and interest",
    "Level-end assessment and progress review, with a parent–coach meeting every four months",
  ],
} as const;

export const insideSession = {
  kicker: "TAKE A LOOK INSIDE",
  title: "SEE HOW YOUR CHILD’S FIRST SESSION FEELS.",
  items: [
    "A friendly conversation to help your child feel comfortable.",
    "Simple chess questions and challenges suited to their current level.",
    "Your child will explore a new chess idea and take away something useful to practise.",
    "A chance to experience our teaching and understand the next steps.",
    "You’re welcome to sit alongside your child and support them during the session.",
  ],
};

export const approach = {
  kicker: "WHY OUTPACE",
  title: "WE UNDERSTAND THE CHILD BEHIND THE CHESSBOARD.",
  rows: [
    {
      need: "To feel noticed and encouraged",
      answer: "Small batches, individual attention and a Class Mentor who observes participation.",
    },
    {
      need: "The right level of challenge",
      answer: "Assessment-based placement and structured learning suited to their current ability.",
    },
    {
      need: "Support when learning feels difficult",
      answer: "A Child Growth Mentor who helps them work on confidence, setbacks and learning habits.",
    },
    {
      need: "Guidance that grows with them",
      answer: "Coach feedback, class observations and parent conversations help us identify the next support step.",
    },
    {
      need: "For you to understand their progress",
      answer: "A Monthly Growth Snapshot and a parent–mentor conversation.",
    },
  ],
  teamNote: "Your child’s coach, Class Mentor and Child Growth Mentor work together to support their learning journey.",
};

export const missionVision = {
  kicker: "OUR PURPOSE",
  title: "OUR MISSION & VISION",
  mission: {
    title: "OUR MISSION",
    subtitle: "Every child learns differently. Our responsibility is to find the way.",
    body: "When a child struggles, we begin by understanding them—their strengths, challenges and what helps them learn. Through chess coaching and personalised mentoring, we help children think independently, learn from mistakes and face challenges with confidence and kindness.",
    close: "We help children discover their potential while staying true to who they are.",
  },
  vision: {
    title: "OUR VISION",
    subtitle: "A better tomorrow begins with children who believe in themselves.",
    body: "We dream of a world where every child is understood, believed in and given the opportunity to thrive. By nurturing confident thinkers, independent learners and compassionate individuals, we want to help today’s children build a better world.",
  },
};

export const founder = {
  role: "OUR FOUNDER",
  name: "Omnath C P",
  tagline: "Inspired by his mother. Driven by a belief in every child.",
  bio: [
    "Omnath grew up watching his mother take the time to understand each child she taught and help them bloom in their own way. Her example inspired him to leave banking and devote himself to working with children.",
    "While volunteering during the pandemic, he saw how chess could reveal how children think and respond to setbacks. Coaching taught him that chess alone wasn’t enough. Children also needed someone to listen without judgement, see their strengths and encourage them to try again.",
    "Drawing on over 20 years of working with children, Omnath founded Outpace Academy to bring chess coaching and personalised mentoring together. It’s his lifelong dream taking shape: a place where every child feels understood, valued and believed in as they grow at their own pace. For him, that’s where a better world begins.",
  ],
};

// Kept for backward compatibility
export const belief = {
  ...missionVision,
  founder,
};

export const careAndSupport = {
  title: "CARE AND SUPPORT",
  subtitle: "SUPPORT FOR YOUR CHILD, IN CLASS AND BEYOND",
  items: [
    {
      title: "A Class Mentor in every class",
      text: "The Class Mentor manages access to live classes, pays attention to how your child participates and coordinates with the coach and parents when extra support is needed.",
    },
    {
      title: "A dedicated Child Growth Mentor",
      text: "Your child joins two group mentoring sessions each month to build confidence, develop learning habits and practise handling setbacks. One-to-one support is available when needed.",
    },
    {
      title: "A clear picture of your child's progress",
      text: "Through a Monthly Growth Snapshot and a call with the Child Growth Mentor, you’ll hear what’s going well, where your child needs support and what you can encourage at home.",
    },
  ],
};

export const start = {
  kicker: "HOW IT WORKS",
  title: "FOUR STEPS TO BEGIN YOUR CHILD’S JOURNEY",
  steps: [
    { title: "Book your free session", text: "Share your details and preferred time." },
    { title: "Let’s understand your child", text: "Our team connects with you to understand your child better, discuss your expectations and confirm the session." },
    { title: "Meet the chess coach", text: "In a friendly Introductory & Assessment Session, your child experiences our teaching approach while the coach understands their current chess level." },
    { title: "Find the right fit", text: "We discuss our recommendations, explain the programme and help you choose a suitable batch for your child." },
  ],
  levelsTitle: "THE OUTPACE CHESS JOURNEY",
  levelsSubtitle: "SIX LEVELS. THE RIGHT STARTING POINT FOR YOUR CHILD.",
  levelsIntro: "Whether your child is new to chess or already plays, we recommend a starting level based on their current skills and readiness.",
  levels: [
    {
      piece: "p",
      name: "Chess Foundation",
      text: "Learn the rules, move the pieces confidently and play a full game.",
      duration: "4 months",
    },
    {
      piece: "n",
      name: "Chess Explorers",
      text: "Spot simple tactics and learn to notice threats before moving.",
      duration: "4 months",
    },
    {
      piece: "b",
      name: "Chess Quest",
      text: "Look further ahead and start making plans during games.",
      duration: "4 months",
    },
    {
      piece: "r",
      name: "Chess Challengers",
      text: "Compare possible moves and build stronger strategies.",
      duration: "4 months",
    },
    {
      piece: "q",
      name: "Chess Champions",
      text: "Refine decisions in complex positions and learn from game analysis.",
      duration: "4 months",
    },
    {
      piece: "k",
      name: "Chess Prodigy",
      text: "Deepen advanced skills and prepare for stronger competition.",
      duration: "Continuous",
    },
  ],
  levelsNote: "Each level runs for four months and ends with an assessment and a parent–coach review. Progression is based on assessment and performance.",
} as const;

export const stories = {
  kicker: "FAMILY STORIES",
  title: "THE QUIET PROGRESS, AND THE PROUD MOMENTS.",
  numbers: [
    { value: "9000+", label: "children enrolled" },
    { value: "7.5K", label: "active students" },
    { value: "100K+", label: "online classes conducted" },
    { value: "1K+", label: "teachers" },
  ],
  numbersNote: "Across all Outpace programmes.",
  winsTitle: "RECENT WINS BY OUR STUDENTS",
  wins: [
    {
      name: "Hanvitha Koneru",
      result: "1st Prize, Team and Individual, Under 9 Girls",
      event: "7th Karnataka State Schools Team Chess Championship",
    },
    {
      name: "Avyukth K Sajin",
      result: "1st Prize, Under 10",
      event: "Chess tournament by Chaturangappada, Kozhikode",
    },
    {
      name: "Adhithi Krishna",
      result: "1st Place, Under 15 Girls",
      event: "BUDCA Rapid Chess Tournament",
    },
  ],
  quotes: [
    {
      quote:
        "My daughter is learning Chess from Outpace Academy for the past many months. Teachers are very knowledgeable, supportive and professional and my daughter is really enjoying it.",
      by: "Anand Sivaram",
      role: "Parent",
    },
    {
      quote:
        "I started learning chess from Outpace Academy. It was a very positive learning experience, and especially the coaches who patiently answered all our queries and made us learn chess with perfect rules and techniques.",
      by: "Athira Vinod Pillai",
      role: "Student",
    },
    {
      quote:
        "We have had a wonderful experience learning at Outpace Academy. The concerned teachers have been efficient, their teaching method effective and fruitful.",
      by: "Adv. (Mrs.) Vasundhara Ravi",
      role: "Parent",
    },
    {
      quote:
        "Outpace Academy focuses on the overall performance of the student in the respective subject as well as character building. Spot tests and regular assessments help to improve their potential.",
      by: "Lakshmi Subash",
      role: "Parent",
    },
  ],
};

const mainSite = "https://outpaceacademy.com";

export const services = {
  kicker: "BEYOND CHESS",
  title: "A GLIMPSE BEYOND CHESS",
  lead: "More ways Outpace supports your child’s learning journey.",
  items: [
    {
      name: "Academic Tuition",
      desc: "Personalised tuition across 14+ subjects & 6 languages.",
      href: "https://outpaceacademy.com/academic-tuition/",
    },
    {
      name: "Other Programmes",
      desc: "Music, classical dance, Vedic maths, Rubik’s cube & personal development.",
      href: "https://outpaceacademy.com/courses-outpace-academy/",
    },
  ],
  cta: "Explore all on outpaceacademy.com →",
  href: mainSite,
};

export const team = {
  kicker: "MEET OUR TEAM",
  title: "THE PEOPLE BEHIND YOUR CHILD'S JOURNEY",
  subtitle: "Dedicated chess coaches and Child Growth Mentors working together to understand, encourage and support your child.",
  members: [
    {
      name: "Syam Peter",
      role: "Chess Coach & Mentor",
      image: "/team/syam-peter.jpg",
    },
    {
      name: "Sreedil Lal",
      role: "Chess Coach & Mentor",
      image: "/team/sreedil-lal.jpg",
    },
    {
      name: "Deepak K S",
      role: "Chess Coach & Mentor",
      image: "/team/deepak-ks.jpg",
    },
    {
      name: "Sibin Paul",
      role: "Chess Coach & Mentor",
      image: "/team/sibin-paul.jpg",
    },
    {
      name: "Sandra Benny",
      role: "Child Growth Mentor",
      image: "/team/sandra-benny.jpg",
    },
  ],
};

export const faqs = {
  kicker: "QUESTIONS PARENTS ASK",
  title: "FREQUENTLY ASKED QUESTIONS",
  hint: "Tap a square to read the answer.",
  items: [
    {
      q: "Is the Introductory & Assessment Session free?",
      a: "Yes. The session is free, and no payment is required to book.",
    },
    {
      q: "What happens in the introductory session?",
      a: "Your child meets a chess coach, tries a short lesson and learns a new chess idea to practise. The coach gets to know your child’s current chess skills and recommends a suitable starting level. You’re welcome to sit alongside your child.",
    },
    {
      q: "How do you help my child stay engaged online?",
      a: "Coaches use small groups, puzzles and guided play to give children plenty of chances to take part. The Class Mentor pays attention to how your child participates and helps coordinate support when needed.",
    },
    {
      q: "What does the Child Growth Mentor do?",
      a: "The Child Growth Mentor helps your child build confidence, develop consistent learning habits and learn from setbacks. Your child joins two group mentoring sessions each month, with one-to-one support when needed. Each month, you receive a Growth Snapshot and have a call with the mentor.",
    },
    {
      q: "Can my child join as a complete beginner?",
      a: "Yes. Chess Foundation starts with the basics, including how the pieces move. If your child already plays, we recommend a starting level based on their skills and readiness.",
    },
    {
      q: "What does my child need for an online class?",
      a: "A laptop or tablet, a stable internet connection and a quiet place to join.",
    },
    {
      q: "What if my child misses a class?",
      a: "Let your Class Mentor know. They’ll share a recording of the full session your child missed and explain what other support is available to help them catch up.",
    },
    {
      q: "How are online classes supervised?",
      a: "The chess coach leads the lesson, while the Class Mentor manages access to the live class and helps coordinate communication between families and the team.",
    },
    {
      q: "Can my child join at any time of the year?",
      a: "Yes. We welcome students throughout the year whenever there’s space in a batch suited to your child’s level.",
    },
  ],
};

export const closing = {
  kicker: "EVERY CHILD CARRIES A POSSIBILITY.",
  title: "LET’S FIND YOUR CHILD’S NEXT MOVE.",
  body: "Book a free Introductory & Assessment Session. No payment needed.",
};

export const footer = {
  tagline: "Touching Hearts, Awakening Wisdom",
  blurb: "Online chess coaching and growth mentoring for children aged 5–13.",
  address: "#1108, Gopal Reddy Complex, 1st Floor, Sarjapura Village, Bangalore 562125",
  email: "info@outpaceacademy.com",
  phone,
  phoneHref,
  website: "www.outpaceacademy.com",
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/outpaceacademy/" },
    { label: "Facebook", href: "https://www.facebook.com/outpaceacademy" },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/outpace-academy/" },
    { label: "Twitter", href: "https://twitter.com/AcademyOutpace" },
  ],
  copyright: "© 2026 Outpace Academy LLP. All rights reserved.",
  legal: [
    { label: "Privacy Policy", href: "https://outpaceacademy.com/privacy-policy/" },
    { label: "Terms & Conditions", href: "https://outpaceacademy.com/terms-conditions/" },
    { label: "Refunds & Cancellation", href: "https://outpaceacademy.com/refunds-cancellation-policy/" },
  ],
};

export const thanks = {
  title: "Thank you. We can’t wait to meet your child.",
  body: "Our team will contact you on WhatsApp to understand your child better, discuss your expectations and confirm the session.",
  next: [
    {
      title: "Let’s understand your child",
      text: "We connect with you to learn about your child and discuss your expectations.",
    },
    {
      title: "Details on WhatsApp",
      text: "We share the joining link and how to prepare.",
    },
    {
      title: "Your child meets a coach",
      text: "A friendly Introductory & Assessment Session. Then we suggest the right group.",
    },
  ],
  ready: "A laptop or tablet with stable internet, a quiet space, and a pen and notebook.",
};
