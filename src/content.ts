// All page copy lives here. Anything in [square brackets] is still to be
// supplied: search this file for "[" to find what is left to fill in.

// Digits only, with country code, e.g. "919876543210". WhatsApp buttons stay
// inactive until this is set.
export const whatsappNumber = "";

export const whatsappHref = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      "Hi Outpace Academy, I'd like to know more about the Chess Growth Mentorship Program.",
    )}`
  : undefined;

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
  { label: "About", href: "#about" },
  { label: "Program", href: "#program" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Mission", href: "#mission" },
  { label: "Coaches", href: "#coaches" },
  { label: "Levels", href: "#levels" },
  { label: "FAQs", href: "#faqs" },
  { label: "More Programs", href: "#more-programs" },
];

export const heroSlideSeconds = 2;

export const heroImages = [
  {
    src: "/hero/chess-class-focus.webp",
    alt: "A boy in a red T-shirt thinking over his next move during a chess game in class",
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
  eyebrow: "Outpace Chess Growth Mentorship Program",
  title: "Build focus, confidence and independent thinking",
  titleAccent: "through chess",
  lede: "Structured chess coaching and personalised growth mentoring for children aged 5–13.",
  body: "Expert coaches develop chess skills. A Dedicated Growth Mentor supports confidence, resilience and learning ownership.",
  points: [
    "Free Introductory & Assessment Session; no payment needed",
    "Batches matched to your child’s age and level",
    "Monthly growth snapshot and parent-mentor call",
  ],
  quote:
    "My daughter is learning Chess from Outpace Academy for the past many months. Teachers are very knowledgeable, supportive and professional and my daughter is really enjoying it.",
  quoteBy: "Anand Sivaram, Parent",
};

export const stats = [
  { value: "9000+", label: "kids enrolled across Outpace programs" },
  { value: "[X.X] / 5", label: "parent rating" },
  { value: "[XX]", label: "tournament wins by students" },
  { value: "[Rated]", label: "expert chess coaches" },
];

export const heart = {
  kicker: "The Heart of Outpace",
  title: "Every Child Is Unique. Every Child Deserves to Thrive.",
  intro:
    "Not every child thinks the same way. Not every child learns at the same pace. And they don’t have to.",
  moves: [
    "Some children think ten moves ahead.",
    "Some are still learning to make their first move.",
    "Some need a little more time.",
    "Some need encouragement.",
    "Some just need someone who will patiently listen, understand, and believe in them.",
  ],
  promise: "At Outpace, we want to be that someone.",
  outro: [
    "We don’t teach chess just to win games. We use chess to help children understand themselves, discover their strengths, overcome their fears, and realize what they are capable of.",
    "Because every child carries a possibility. And when we nurture that possibility, we are not just changing one child’s future. We are shaping the future of our world.",
  ],
};

export const skills = {
  kicker: "What your child builds",
  title: "Chess skills. Thinking habits. Personal growth.",
  intro:
    "Chess coaching builds the game. Dedicated growth mentoring supports confidence, resilience, consistency and ownership of effort.",
  items: [
    {
      title: "Focus",
      text: "Chess challenges give children practice in staying attentive and returning to the task.",
    },
    {
      title: "Patience and discipline",
      text: "Children practise pausing before a move. Mentoring supports patience and consistent learning habits.",
    },
    {
      title: "Confidence",
      text: "Supportive feedback helps children share ideas, attempt challenges and learn from mistakes.",
    },
    {
      title: "Decision-making",
      text: "Children compare options and consider consequences before choosing.",
    },
    {
      title: "Communication",
      text: "Children practise explaining their ideas and asking for help when needed.",
    },
    {
      title: "Handling pressure",
      text: "Games and mentoring offer practice in handling nerves, mistakes and setbacks.",
    },
  ],
};

export const includes = {
  kicker: "The Program",
  title: "What your child gets",
  items: [
    "8 live chess coaching sessions each month",
    "Small groups of 4-6 students, placed by level",
    "Daily game practice and puzzles between classes",
    "Monthly growth snapshot and parent-mentor call",
    "Tournament guidance based on readiness and interest",
    "2 group growth mentoring sessions each month",
    "Course completion exam and certificate upon passing",
    "Lifetime membership in the Outpace Academy Chess Club",
  ],
  media: "[Clip or photo: live class on screen]",
  highlights: [
    { value: "8 + 2", label: "coach and mentor sessions monthly" },
    { value: "4-6", label: "students in each group" },
  ],
};

export const preview = {
  kicker: "See it before you book",
  title: "Watch what happens in the 1-on-1 session",
  media: "[Screen recording: a real 1-on-1 session on Google Meet]",
  duration: "[2 min]",
  items: [
    "The coach explores your child’s current chess level with suitable questions and positions",
    "Your child experiences a short, interactive chess lesson with the coach",
    "We discuss suitable learning goals and recommend a batch based on level and fit",
  ],
};

export const steps = {
  kicker: "How It Works",
  title: "Four steps to your first class",
  items: [
    {
      title: "Book your session",
      text: "Fill the form and pick a slot that suits school and tuition timings.",
    },
    {
      title: "Quick call from us",
      text: "Our Relationship Team contacts you to confirm the session time and joining details.",
    },
    {
      title: "Introductory & Assessment Session",
      text: "The coach explores your child’s level and introduces our learning approach.",
    },
    {
      title: "Join the right batch",
      text: "We discuss next steps and match your child to a suitable group.",
    },
  ],
};

export const outcomes = {
  kicker: "The Outcomes",
  title: "What your child works towards",
  items: [
    {
      label: "At the board",
      text: "Stronger understanding, practical play and level-appropriate chess skills.",
    },
    {
      label: "Beyond the board",
      text: "Confidence, thoughtful choices, learning from setbacks and consistent effort.",
    },
    {
      label: "For you as a parent",
      text: "A monthly growth snapshot and a conversation with the Growth Mentor.",
    },
  ],
};

export const approach = {
  kicker: "Why Outpace",
  title: "What makes the Outpace approach different",
  columns: ["Your child’s needs", "Outpace’s approach"],
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
  note: "Chess coaching and growth mentoring are distinct, coordinated roles.",
};

export const mission = {
  kicker: "Our Mission",
  lede: "We believe that when a child struggles to learn, the problem is not always with the child. Sometimes, we simply haven’t found the right way to teach them.",
  body: [
    "Every child is different. Some are loud, some are quiet. Some learn fast, others take their time. Some are emotional, some are logical. And every child deserves to be understood.",
    "At Outpace, chess is more than a game. It is a way to understand how children think, discover their strengths, identify their challenges, and help them grow.",
    "Through our unique chess mentorship program, dedicated mentors work alongside experienced chess coaches to understand each child’s individual needs and help them overcome difficulties at their roots.",
    "Our goal is not simply to create great chess players, but to nurture confident thinkers, independent learners, resilient minds, and kind individuals.",
    "We want every child to learn from mistakes, face challenges with courage, think independently, and believe in themselves — both on and off the chessboard.",
  ],
  closing:
    "Because we don’t want to change who a child is. We want to help them discover who they can become.",
};

export const vision = {
  kicker: "Our Vision",
  lede: "We dream of a world where every child is understood, believed in, and given the chance to become the best version of themselves.",
  body: [
    "We believe that every child has unique strengths, and that the children of today hold the key to a better tomorrow. Through chess, we hope to nurture confident thinkers, independent learners, and compassionate individuals who can shape a smarter, stronger, and better world.",
    "Because a better future begins with children who are given the opportunity to thrive.",
  ],
};

export const founder = {
  kicker: "Our Founder",
  name: "Omnath CP",
  text: "The visionary behind Outpace Academy brings a wealth of industry experience and a profound passion for children’s development. Inspired by his mother, a dedicated teacher for 36 years, he has infused Outpace with a culture of nurturing and growth.",
};

const coach = {
  media: "[Coach photo or 20-second intro video]",
  name: "[Coach name]",
  title: "[Title and rating]",
  bio: "[One line on teaching style and achievements]",
};

export const coaches = {
  kicker: "Our Coaches",
  title: "Meet your child’s coaches",
  items: [coach, coach, coach],
};

export const testimonials = {
  kicker: "Family Stories",
  title: "Parents and students, in their words",
  items: [
    {
      media: "[Parent video]",
      quote:
        "We have had a wonderful experience learning at Outpace Academy. The concerned teachers have been efficient, their teaching method effective and fruitful.",
      by: "Adv. (Mrs.) Vasundhara Ravi, Parent",
    },
    {
      media: "[Parent video]",
      quote:
        "Outpace Academy focuses on the overall performance of the student in the respective subject as well as character building. Spot tests and regular assessments help to improve their potential.",
      by: "Lakshmi Subash, Parent",
    },
    {
      media: "[Student result: rating or trophy]",
      quote:
        "I started learning chess from Outpace Academy. It was a very positive learning experience, and especially the coaches who patiently answered all our queries and made us learn chess with perfect rules and techniques.",
      by: "Athira Vinod Pillai, Student",
    },
  ],
};

export const safety = {
  kicker: "Safety and Care",
  title: "A safe, supervised space for children",
  items: [
    {
      title: "Class Coordination",
      text: "A Class Mentor observes each child’s participation, understands their needs and stays connected with parents.",
    },
    {
      title: "Class Support",
      text: "The Class Mentor manages class access and coordinates with the coach, parents and children to provide timely support.",
    },
    {
      title: "Dedicated Growth Mentor",
      text: "Two special mentoring sessions each month, with one-to-one support when needed and ongoing parent communication from the Growth Mentorship Team.",
    },
  ],
};

export const levels = {
  kicker: "Learning Levels",
  title: "The right level and fit for your child",
  items: [
    {
      label: "Ages 5 to 7",
      title: "A supported start",
      text: "Placement by ability and readiness.",
    },
    {
      label: "Ages 8 to 10",
      title: "Build and apply",
      text: "Suitable challenges at each level.",
    },
    {
      label: "Ages 11 to 13",
      title: "Think and progress",
      text: "Learning matched to current ability.",
    },
    {
      label: "Tournament players",
      title: "Prepare and reflect",
      text: "Guidance based on readiness and competitive interest.",
    },
  ],
  notes: [
    "Each level: 4 months; 8 coach sessions + 2 group mentor sessions monthly. Parent-coach review every 4 months.",
    "Fees and payment options are explained after understanding your child’s needs.",
  ],
};

export const faqs = {
  kicker: "FAQs",
  title: "Questions parents ask",
  items: [
    {
      q: "Is the introductory session free?",
      a: "Yes. The Introductory & Assessment Session is free; no payment is needed.",
    },
    {
      q: "What happens in the introductory session?",
      a: "A chess coach explores your child’s current level through suitable questions, positions and a short lesson. We discuss your child’s needs and suggest a suitable batch and learning pathway.",
    },
    {
      q: "Will my child stay focused in an online class?",
      a: "Small groups, questions, puzzles and guided play encourage participation. Class observations help us identify when a child needs encouragement or additional support.",
    },
    {
      q: "What does the Dedicated Growth Mentor do?",
      a: "The mentor supports confidence, resilience, consistency and learning ownership through two monthly group sessions, a parent call and a growth snapshot. Individual support is arranged when needed.",
    },
    {
      q: "My child is a complete beginner. Is that okay?",
      a: "Yes. Beginner batches start from how the pieces move.",
    },
    {
      q: "What do we need for the class?",
      a: "A laptop or tablet, stable internet and a quiet space help your child participate comfortably.",
    },
    {
      q: "What if my child misses a class?",
      a: "Inform your Relationship Executive, who will explain the available support and applicable policy.",
    },
    {
      q: "Is it safe for children online?",
      a: "A Relationship Executive coordinates class access and communication between families and the team.",
    },
    {
      q: "Can my child join at any time of the year?",
      a: "Yes. Students can join Outpace Academy at any time during the academic year, as we offer rolling admissions.",
    },
  ],
};

const mainSite = "https://outpaceacademy.com";

export const moreServices = {
  kicker: "Beyond Chess",
  title: "More ways Outpace helps your child grow",
  intro:
    "Chess is one part of Outpace Academy. Alongside it, we offer two more services for children.",
  items: [
    {
      name: "Academic Tuition",
      text: "Additional academic support and guidance, with personalised instruction that helps students improve their grades and their understanding of each subject.",
      note: "Guided by an advisory board with experts from IISc, IIT and NIT.",
      tags: [
        "English",
        "French",
        "Hindi",
        "Sanskrit",
        "Kannada",
        "Malayalam",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "Accountancy",
        "Economics",
        "History",
        "Civics",
      ],
      cta: "Explore Academic Tuition",
      href: `${mainSite}/academic-tuition/`,
    },
    {
      name: "Other Programs",
      text: "Student-centred programs in music, dance, art and personal growth that help children explore their interests and develop new skills.",
      note: "Classical dance includes Bharatanatyam, Mohiniyattam and Kuchipudi.",
      tags: [
        "Carnatic Music",
        "Carnatic Flute",
        "Classical Dance",
        "Guitar",
        "Violin",
        "Keyboard",
        "Drawing",
        "Yoga",
        "Vedic Maths",
        "Rubik’s Cube",
        "Personal Development",
      ],
      cta: "Explore Other Programs",
      href: `${mainSite}/courses-outpace-academy/`,
    },
  ],
};

export const closing = {
  kicker: "Every Child Can Learn. We Find the Way.",
  title: "Discover the right chess and growth journey for your child",
  body: "Book a free Introductory & Assessment Session. Mentorship batches have 4-6 students.",
};

export const footer = {
  tagline: "Every Child Can Learn. We Find the Way.",
  blurb:
    "Structured chess coaching and personalised growth mentoring for children aged 5–13.",
  programTitle: "The program",
  program: [
    "8 live chess coaching sessions monthly",
    "2 group growth mentoring sessions monthly",
    "Small groups of 4-6 students",
    "Monthly growth snapshot and parent-mentor call",
  ],
  address: "#1108, Gopal Reddy Complex, 1st Floor, Sarjapura Village, Bangalore 562125",
  email: "info@outpaceacademy.com",
  phone: "+91 94296 92587",
  phoneHref: "tel:+919429692587",
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
  title: "Thank you - your session request is received",
  body: "Our Relationship Team will contact you on WhatsApp to confirm a suitable session time and joining details.",
  coach: {
    photo: "[Coach photo]",
    name: "[Coach name]",
    title: "[Title and rating]",
    style: "[One line on teaching style]",
    video: "[20-second coach intro video]",
  },
  next: [
    {
      title: "A quick call from us",
      text: "We confirm availability and discuss your child’s needs.",
    },
    {
      title: "Session details on WhatsApp",
      text: "We share the confirmed time, joining link and preparation details.",
    },
    {
      title: "Your child meets the coach",
      text: "The coach explores their level and introduces our approach.",
    },
    {
      title: "Learning pathway and batch recommendation",
      text: "We discuss suitable next steps after the session.",
    },
  ],
  ready: "A laptop or tablet with stable internet, a quiet space, and a pen and notebook.",
};
