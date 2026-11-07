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

export const navLinks = [
  { label: "Play chess", href: "#play" },
  { label: "Getting started", href: "#start" },
  { label: "The program", href: "#program" },
  { label: "Stories", href: "#stories" },
  { label: "Our mission", href: "#mission" },
  { label: "More programs", href: "#services" },
  { label: "FAQs", href: "#faqs" },
];

export const heroSlideSeconds = 5;

export const heroImages = [
  {
    src: "/hero/chess-class-focus.webp",
    alt: "A boy in a red T-shirt, chin on his hand, thinking over his next chess move",
  },
  {
    src: "/hero/chess-class-move.webp",
    alt: "A boy in a striped T-shirt moving a white chess piece while his opponent watches",
  },
  {
    src: "/hero/chess-class-overhead.webp",
    alt: "Two boys at a table seen from above, playing chess on a black and white board",
  },
];

export const hero = {
  eyebrow: "Live online chess classes for ages 5–13",
  title: "Every child can learn.",
  titleAccent: "We find the way.",
  lede: "Chess, taught by patient coaches, with a mentor who truly gets to know your child.",
  playLink: "Or play a game of chess with your child",
};

export const trust = [
  { value: "9000+", label: "children enrolled across Outpace" },
  { value: "100K+", label: "classes conducted" },
  { value: "4–6", label: "children in every group" },
  { value: "8 + 2", label: "chess and mentor sessions a month" },
];

export const heart = {
  kicker: "The heart of Outpace",
  title: "Every child is unique. Every child deserves to thrive.",
  intro: "Not every child learns at the same pace. And they don’t have to.",
  lines: [
    "Some children think ten moves ahead.",
    "Some are still learning to make their first move.",
    "Some need a little more time.",
    "Some need encouragement.",
    "Some just need someone who will patiently listen, understand, and believe in them.",
  ],
  promise: "At Outpace, we want to be that someone.",
};

export const learn = {
  kicker: "Beyond the board",
  title: "We don’t teach chess just to win games.",
  intro:
    "We use chess to help children discover their strengths, overcome their fears, and realize what they are capable of.",
  items: [
    { title: "Focus", text: "Staying with one problem a little longer." },
    { title: "Patience", text: "Pausing before the next move." },
    { title: "Confidence", text: "Trying hard things and learning from mistakes." },
    { title: "Decision-making", text: "Weighing the options before choosing." },
    { title: "Communication", text: "Explaining ideas and asking for help." },
    { title: "Handling pressure", text: "Working through nerves and setbacks." },
  ],
  outcomes: [
    { label: "At the board", text: "Stronger understanding and practical play." },
    { label: "Beyond the board", text: "Confidence, thoughtful choices and steady effort." },
    { label: "For you", text: "A monthly growth snapshot and mentor conversation." },
  ],
};

export const game = {
  kicker: "Try it with your child",
  title: "Play a game of chess, right here.",
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
  kicker: "The program",
  title: "Two people in your child’s corner. And you, always in the loop.",
  people: [
    {
      piece: "n",
      role: "The chess coach",
      text: "Teaches the game in a small group, at your child’s level.",
    },
    {
      piece: "q",
      role: "The Growth Mentor",
      text: "Supports confidence, resilience and steady effort.",
    },
    {
      piece: "k",
      role: "You, the parent",
      text: "A growth update and a mentor call, every month.",
    },
  ],
  numbersTitle: "The program in numbers",
  numbers: [
    { value: "8", label: "chess classes a month" },
    { value: "2", label: "mentor sessions a month" },
    { value: "1", label: "parent call a month" },
    { value: "4–6", label: "children per group" },
    { value: "4", label: "months per level" },
    { value: "6", label: "levels to grow through" },
  ],
  listTitle: "Also included",
  list: [
    "Daily game practice and puzzles",
    "Tournament guidance, when ready",
    "Exam and certificate for each course",
    "Lifetime Outpace Chess Club membership",
  ],
} as const;

export const approach = {
  kicker: "Why Outpace",
  title: "What your child needs, and how we answer it",
  rows: [
    {
      label: "Connection",
      need: "A coach who knows the child",
      answer: "Small groups and personal attention",
    },
    {
      label: "Level",
      need: "The right learning challenge",
      answer: "Placement after assessment",
    },
    {
      label: "Progress",
      need: "Clear feedback and next steps",
      answer: "Monthly snapshot and mentor call",
    },
    {
      label: "Beyond chess",
      need: "Support for learning habits",
      answer: "A Dedicated Growth Mentor",
    },
  ],
};

export const safety = {
  title: "A safe, supervised space",
  items: [
    {
      title: "Class Mentor in every batch",
      text: "Observes each child and stays connected with parents.",
    },
    {
      title: "Managed class access",
      text: "Class access and timely support are coordinated for you.",
    },
    {
      title: "One-to-one when needed",
      text: "The Growth Mentor steps in when a child needs more.",
    },
  ],
};

export const stories = {
  kicker: "Family stories",
  title: "The quiet progress, and the proud moments.",
  numbers: [
    { value: "9000+", label: "children enrolled" },
    { value: "7.5K", label: "active students" },
    { value: "100K+", label: "classes conducted" },
    { value: "1K+", label: "teachers" },
  ],
  numbersNote: "Across all Outpace programs.",
  winsTitle: "Recent wins by our students",
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
  // Quoted word for word. Please don't edit these. The first is shown largest.
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

export const belief = {
  kicker: "What we believe",
  quote: "When a child struggles to learn, the problem is not always with the child.",
  quoteAccent: "Sometimes, we simply haven’t found the right way to teach them.",
  line: "Some are loud, some are quiet. Some learn fast, others take their time. And every child deserves to be understood.",
  mission: {
    title: "Our mission",
    lead: "We don’t want to change who a child is. We want to help them discover who they can become.",
    text: "Dedicated mentors work alongside experienced chess coaches, so difficulties are understood and solved at their roots.",
    listTitle: "We nurture",
    list: ["Confident thinkers", "Independent learners", "Resilient minds", "Kind individuals"],
  },
  vision: {
    title: "Our vision",
    lead: "A world where every child is understood, believed in, and given the chance to become the best version of themselves.",
    text: "Because a better future begins with children who are given the opportunity to thrive.",
    listTitle: "Children who shape a world that is",
    list: ["Smarter", "Stronger", "Better"],
  },
  founder: {
    value: "36",
    label: "years",
    title: "Where it began",
    text: "Inspired by his mother, a dedicated teacher for 36 years, founder Omnath CP has infused Outpace with a culture of nurturing and growth.",
  },
};

export const start = {
  kicker: "Getting started",
  title: "Four steps to your child’s first class.",
  steps: [
    { title: "Book your session", text: "Pick a slot that suits school timings." },
    { title: "A quick call from us", text: "We confirm the time and joining details." },
    { title: "The free session", text: "A short lesson, and a look at your child’s level." },
    { title: "Join the right batch", text: "We match your child to a suitable group." },
  ],
  levelsTitle: "Six levels. A place for every child.",
  levelsIntro: "For ages 5–13, placed by ability and readiness, not by age alone.",
  levels: [
    {
      piece: "p",
      name: "Chess Foundation",
      text: "The board, the rules and simple strategies.",
      duration: "4 months",
    },
    {
      piece: "n",
      name: "Chess Explorers",
      text: "Openings, tactics and common patterns.",
      duration: "4 months",
    },
    {
      piece: "b",
      name: "Chess Quest",
      text: "Endgames and better decisions.",
      duration: "4 months",
    },
    {
      piece: "r",
      name: "Chess Challengers",
      text: "Advanced tactics and a stronger style.",
      duration: "4 months",
    },
    {
      piece: "q",
      name: "Chess Champions",
      text: "Complex strategy against strong opponents.",
      duration: "4 months",
    },
    {
      piece: "k",
      name: "Chess Prodigy",
      text: "Customised coaching for competitive play.",
      duration: "Continuous",
    },
  ],
  levelsNote: "A parent-coach review follows every 4 months.",
} as const;

const mainSite = "https://outpaceacademy.com";

// Details from outpaceacademy.com, shortened. Chess stays the page's focus, so
// these links go to the main site rather than the booking form.
export const services = {
  kicker: "Beyond chess",
  title: "More ways Outpace helps your child grow",
  tuition: {
    name: "Academic Tuition",
    lead: "Personalised instruction that improves grades and understanding.",
    facts: [
      { value: "14+", label: "subjects" },
      { value: "6", label: "languages" },
      { value: "4", label: "PhD advisors" },
    ],
    groups: [
      {
        title: "Languages",
        items: ["English", "French", "Hindi", "Sanskrit", "Kannada", "Malayalam"],
      },
      {
        title: "Science and maths",
        items: ["Physics", "Chemistry", "Biology", "Mathematics"],
      },
      {
        title: "Other subjects",
        items: ["Accountancy", "Economics", "History", "Civics"],
      },
    ],
    note: "Advisory board from IISc, IIT and NIT: Dr Sreeshma D, Dr Vidya Sumathy, Dr Sanjay C P and Dr Revathy B S.",
    cta: "Explore Academic Tuition",
    href: `${mainSite}/academic-tuition/`,
  },
  programs: {
    name: "Other Programs",
    lead: "Classes that help children explore their interests and develop new skills.",
    facts: [
      { value: "11", label: "programs" },
      { value: "3", label: "classical dance forms" },
    ],
    groups: [
      {
        title: "Music",
        items: ["Carnatic Music", "Carnatic Flute", "Guitar", "Violin", "Keyboard"],
      },
      {
        title: "Dance and art",
        items: ["Classical Dance", "Drawing"],
      },
      {
        title: "Mind and body",
        items: ["Vedic Maths", "Rubik’s Cube", "Yoga", "Personal Development"],
      },
    ],
    note: "Classical dance includes Bharatanatyam, Mohiniyattam and Kuchipudi.",
    cta: "Explore Other Programs",
    href: `${mainSite}/courses-outpace-academy/`,
  },
};

export const faqs = {
  kicker: "FAQs",
  title: "Questions parents ask",
  hint: "Tap a square to read the answer.",
  items: [
    {
      q: "Is the first session really free?",
      a: "Yes. The Introductory & Assessment Session is free, and no payment is needed.",
    },
    {
      q: "My child has never played chess. Is that okay?",
      a: "Yes. Beginner batches start from how the pieces move.",
    },
    {
      q: "What happens in the first session?",
      a: "A coach explores your child’s level through a few questions, positions and a short lesson. Then we suggest a suitable group.",
    },
    {
      q: "Will my child stay focused online?",
      a: "Small groups, puzzles and guided play keep children involved. We also watch for when a child needs a little encouragement.",
    },
    {
      q: "What does the Growth Mentor do?",
      a: "Supports confidence, resilience and consistency through two group sessions a month. One-to-one support is arranged when needed.",
    },
    {
      q: "Is it safe for children online?",
      a: "Yes. A Class Mentor manages class access and stays connected with parents.",
    },
    {
      q: "What are the fees?",
      a: "We explain fees and payment options once we understand your child’s needs.",
    },
    {
      q: "What do we need for class?",
      a: "A laptop or tablet, stable internet and a quiet space.",
    },
    {
      q: "What if my child misses a class?",
      a: "Inform your Relationship Executive, who will explain the available support and applicable policy.",
    },
    {
      q: "Can my child join at any time?",
      a: "Yes. Admissions are open all through the year.",
    },
  ],
};

export const closing = {
  kicker: "Every child carries a possibility.",
  title: "Let’s find your child’s next move.",
  body: "Book a free session and meet a coach. No payment needed.",
};

export const footer = {
  tagline: "Touching Hearts, Awakening Wisdom",
  blurb: "Chess coaching and growth mentoring for children aged 5–13.",
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
  body: "Our team will contact you on WhatsApp to confirm the session time and joining details.",
  next: [
    {
      title: "A quick call from us",
      text: "We confirm the time and listen to what your child needs.",
    },
    {
      title: "Details on WhatsApp",
      text: "We share the joining link and how to prepare.",
    },
    {
      title: "Your child meets a coach",
      text: "A short, interactive lesson. Then we suggest the right group.",
    },
  ],
  ready: "A laptop or tablet with stable internet, a quiet space, and a pen and notebook.",
};
