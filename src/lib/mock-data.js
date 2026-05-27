export const clubs = [
  { id: 1, name: "MIT Hackers", members: 142, events: 12, matches: 34 },
  { id: 2, name: "Stanford Build", members: 89, events: 8, matches: 21 },
  { id: 3, name: "Cal Hacks", members: 210, events: 15, matches: 56 },
];

export const teammates = [
  {
    id: 1,
    name: "Alex Chen",
    college: "MIT",
    avatar: "AC",
    skills: ["React", "TypeScript", "Node.js"],
    match: 96,
    experience: "Advanced",
    role: "Full-stack",
  },
  {
    id: 2,
    name: "Jordan Lee",
    college: "Stanford",
    avatar: "JL",
    skills: ["Python", "TensorFlow", "Rust"],
    match: 92,
    experience: "Advanced",
    role: "ML Engineer",
  },
  {
    id: 3,
    name: "Sam Rivera",
    college: "Berkeley",
    avatar: "SR",
    skills: ["Figma", "UI/UX", "Framer"],
    match: 88,
    experience: "Intermediate",
    role: "Designer",
  },
  {
    id: 4,
    name: "Priya Patel",
    college: "CMU",
    avatar: "PP",
    skills: ["Go", "Kubernetes", "AWS"],
    match: 85,
    experience: "Advanced",
    role: "Backend",
  },
  {
    id: 5,
    name: "Marcus Johnson",
    college: "Georgia Tech",
    avatar: "MJ",
    skills: ["React Native", "Swift", "Firebase"],
    match: 82,
    experience: "Intermediate",
    role: "Mobile",
  },
  {
    id: 6,
    name: "Taylor Kim",
    college: "UIUC",
    avatar: "TK",
    skills: ["C++", "OpenGL", "Unity"],
    match: 78,
    experience: "Beginner",
    role: "Game Dev",
  },
];

export const filterTags = [
  "React",
  "Python",
  "Design",
  "Backend",
  "Mobile",
  "Beginner",
  "Intermediate",
  "Advanced",
];

export const initialMessages = [
  { id: 1, user: "Jordan", text: "Ready to lose? 😎", time: "10:00" },
  { id: 2, user: "You", text: "Bring it on. I've been practicing.", time: "10:01" },
  { id: 3, user: "Jordan", text: "May the best algorithm win.", time: "10:01" },
];

export const yourCode = `function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return [];
}`;

export const opponentCode = `def two_sum(nums, target):
    seen = {}

    for i, num in enumerate(nums):
        complement = target - num

        if complement in seen:
            return [seen[complement], i]

        seen[num] = i

    return []`;

export const mentors = [
  {
    id: 1,
    name: "Dr. Sarah Williams",
    company: "Google",
    role: "Senior Staff Engineer",
    expertise: ["System Design", "Go", "Distributed Systems"],
    availability: "Available",
    bio: "10+ years building large-scale infrastructure at Google. Ex-MIT.",
    avatar: "SW",
  },
  {
    id: 2,
    name: "James Okonkwo",
    company: "Stripe",
    role: "Engineering Manager",
    expertise: ["Payments", "Ruby", "Leadership"],
    availability: "Busy",
    bio: "Led payments teams at Stripe and Square. Stanford CS '12.",
    avatar: "JO",
  },
  {
    id: 3,
    name: "Emily Zhang",
    company: "OpenAI",
    role: "Research Engineer",
    expertise: ["ML", "PyTorch", "NLP"],
    availability: "Available",
    bio: "Published researcher in NLP. Previously at DeepMind.",
    avatar: "EZ",
  },
  {
    id: 4,
    name: "Michael Torres",
    company: "Netflix",
    role: "Principal Designer",
    expertise: ["Design Systems", "Figma", "UX Research"],
    availability: "Limited",
    bio: "Built Netflix's design system. Previously at Airbnb and Apple.",
    avatar: "MT",
  },
  {
    id: 5,
    name: "Aisha Patel",
    company: "Meta",
    role: "Staff Frontend Engineer",
    expertise: ["React", "Performance", "Accessibility"],
    availability: "Available",
    bio: "Frontend performance expert. Open source contributor to React.",
    avatar: "AP",
  },
  {
    id: 6,
    name: "David Kim",
    company: "YC",
    role: "Visiting Partner",
    expertise: ["Startups", "Product", "Growth"],
    availability: "Busy",
    bio: "3x YC founder. Sold last company for $200M. Ex-Stanford.",
    avatar: "DK",
  },
];

export const certificates = [
  {
    id: 1,
    title: "First Blood",
    description: "Won your first code duel",
    icon: "Swords",
    earned: true,
    date: "Oct 12, 2025",
  },
  {
    id: 2,
    title: "Team Player",
    description: "Matched with 5 teammates",
    icon: "Users",
    earned: true,
    date: "Nov 3, 2025",
  },
  {
    id: 3,
    title: "Ship It",
    description: "Completed a full project sprint",
    icon: "Rocket",
    earned: true,
    date: "Dec 1, 2025",
  },
  {
    id: 4,
    title: "Mentee",
    description: "Had 3 mentorship sessions",
    icon: "GraduationCap",
    earned: false,
    progress: 2,
    total: 3,
  },
  {
    id: 5,
    title: "Speed Demon",
    description: "Solved a duel in under 5 minutes",
    icon: "Zap",
    earned: false,
    progress: 0,
    total: 1,
  },
  {
    id: 6,
    title: "Community Builder",
    description: "Invited 10 members to your club",
    icon: "Trophy",
    earned: false,
    progress: 4,
    total: 10,
  },
];

export const duelHistory = [
  {
    id: 1,
    opponent: "Jordan Lee",
    problem: "Two Sum",
    result: "Win",
    score: "1310 - 1290",
    date: "Today",
    time: "4:32",
  },
  {
    id: 2,
    opponent: "Alex Chen",
    problem: "Valid Parentheses",
    result: "Loss",
    score: "980 - 1120",
    date: "Yesterday",
    time: "6:15",
  },
  {
    id: 3,
    opponent: "Priya Patel",
    problem: "Merge K Lists",
    result: "Win",
    score: "1450 - 1380",
    date: "Dec 15",
    time: "8:45",
  },
  {
    id: 4,
    opponent: "Marcus Johnson",
    problem: "Binary Search",
    result: "Win",
    score: "1200 - 1150",
    date: "Dec 12",
    time: "3:20",
  },
];
