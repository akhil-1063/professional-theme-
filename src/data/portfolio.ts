export interface Project {
  id: string;
  title: string;
  category: string;
  summary: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  githubFrontendUrl?: string;
  githubBackendUrl?: string;
  liveUrl?: string;
  status?: string;
  statusBadge?: string;
  secondaryLabel?: string;
  tagline?: string;
  image: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  companyOrInstitution: string;
  period: string;
  details: string[];
}

export interface PhotoItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface ProfileInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  instagram: string;
  bio: string;
}

export const profileInfo: ProfileInfo = {
  name: "Pon Akilesh P.",
  title: "Full Stack Developer",
  email: "akilesh03.work@gmail.com",
  phone: "7806952626",
  linkedin: "https://www.linkedin.com/in/ponakilesh",
  github: "https://github.com/akhil-1063",
  instagram: "https://discord.gg/Zvd2PXPe",
  bio: "That kid up there? ... If you told him he'd end up obsessed with  designing  and  coding  stuffs  one  day  he would've laughed in your face. Bro spent most of his life chasing volleyballs, hopping from one national tournament to another.\n\nStinky shoes, sore knees ... Volleyball was his main Quest.\n\nBut he always had a thing for art and connecting random dots. Somehow that rabbit hole led him straight into designing and coding things that he never would have thought of .\n\nFast forward to today: He's doing his Master's in Computer Applications at PSG Tech, constantly learning new tech and  running his entire OS on caffeine and hyperfixations.\n\nAlso, bro got kinda jacked along the way. A Self Proclaimed  jacked nerd trying his best to avoid unemployment.\n\nHit me up if you've got a cool idea, wanna build something fun,  or  feel  like  having  a  beef  whether  RONALDO (THE REAL GOAT) or Messi is the GOAT of this kickball game \n\n And For Goodness' Sake It's A-K-I-L not Akhil."
};


export interface SocialLinks {
  spotify: string;
  instagram: string;
  linkedin: string;
  github: string;
  linktree: string;
}

export const socialLinks: SocialLinks = {
  spotify: "https://open.spotify.com/user/31kd6x4hw3uupevogj2oibpj5gg4?si=4c635d3a8dd94563",
  instagram: "https://www.instagram.com/bacon.avocado0/",
  linkedin: "https://www.linkedin.com/in/ponakilesh",
  github: "https://github.com/akhil-1063",
  linktree: "https://linktr.ee/Akillllllllll",
};

export const instagramAltProfile = {
  isActive: true, // flip to true when account is back
  username: "akilesh.xo",
  displayName: "akilesh.xo",
  profileUrl: "https://www.instagram.com/_akilesh.xo/",
  altUsername: "bacon.avocado0",
  altProfileUrl: "https://www.instagram.com/bacon.avocado0?igsh=OHFleWFpMDVhMnZm",
  physiquePhoto: "/assets/instagram/IMG_3122.jpg.jpeg",
  avatarPhoto: "/assets/instagram/IMG_3122.jpg.jpeg",
  headline:
    "follow my alt to see myself posing like this to peak audios",
};

export const projects: Project[] = [
  {
    id: "sfx-hostels",
    title: "SFX Hostels",
    category: "Full Stack App",
    summary: "Full-stack hostel management platform with role-based access, billing, and maintenance workflows.",
    description: "Built a full-stack hostel management platform with role-based access control for Admins, Staff, and Residents, supporting room allocation, billing, and maintenance management. Implemented secure JWT authentication, bcrypt password hashing, Razorpay online payments, and Nodemailer email automation. Developed a responsive admin dashboard for occupancy tracking, invoice generation, and reporting, then deployed the application across Vercel and Render with Playwright end-to-end tests.",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Razorpay"],
    githubUrl: "https://github.com/akhil-1063/Hostel-Management-System",
    githubFrontendUrl: "https://github.com/akhil-1063/Hostel-Management-System",
    githubBackendUrl: "https://github.com/akhil-1063/Hostel-Management-System",
    liveUrl: "https://hostel-management-system-alpha-eight.vercel.app/",
    image: "/assets/projects.png",
  },
  {
    id: "eventra",
    title: "Eventra",
    category: "Full Stack App",
    summary: "Event management platform with role-based portals for Students, Coordinators, and Administrators.",
    description: "Developed a full-stack event management platform with role-based portals for Students, Coordinators, and Administrators to manage registrations, teams, attendance, and events. Built scalable REST APIs using Express.js and MongoDB Atlas, implemented JWT authentication and role-based authorization, and designed a responsive UI with Tailwind CSS. Deployed the frontend on Vercel and backend on Render with Git-based version control workflows.",
    techStack: ["React", "Node.js", "Express.js", "MongoDB", "JWT", "Tailwind CSS"],
    githubUrl: "https://github.com/akhil-1063/EVENTRA-",
    githubFrontendUrl: "https://github.com/akhil-1063/EVENTRA-",
    githubBackendUrl: "https://github.com/akhil-1063/EVENTRA-",
    liveUrl: "https://eventra-ochre.vercel.app/",
    image: "/assets/projects.png",
  },
  {
    id: "dual-theme-portfolio",
    title: "Dual-Theme Interactive Portfolio",
    category: "Personal Portfolio",
    summary: "Interactive desktop-style portfolio featuring dual themed modes: macOS canvas and retro Windows 95 pixel art.",
    description: "Built a personal portfolio designed as an interactive desktop environment with two themed modes: a glassmorphic macOS canvas and a retro Windows 95 pixel art layout. Features draggable windows managed by a global React context, custom bottom dock/taskbar, a gooey cursor reveal mask, and server-side Spotify API integration for real-time track display.",
    techStack: ["Next.js", "React", "Node.js", "Spotify Web API", "Tailwind CSS v4", "Framer Motion", "GSAP", "Three.js", "TypeScript"],
    githubUrl: "https://github.com/akhil-1063/portfolio",
    liveUrl: "https://akillllll.vercel.app/",
    image: "/assets/projects.png",
  },
  {
    id: "portfolio-site",
    title: "Professional Portfolio",
    category: "Personal Portfolio",
    summary: "A clean, responsive professional developer portfolio showcasing projects, stack, and experience.",
    description: "Designed and developed a minimalist, professional developer portfolio website using React, Vite, and Tailwind CSS. Features dynamic light/dark theme toggling, custom tactile buttons, Google Sheets contact form API integration, and smooth page transitions.",
    techStack: ["React", "Vite", "Tailwind CSS", "Framer Motion", "TypeScript", "Google Apps Script"],
    githubUrl: "https://github.com/akhil-1063/professional-theme-",
    image: "/assets/projects.png",
  },
  {
    id: "liftlog",
    title: "LiftLog",
    category: "Mobile Application",
    summary: "A fitness and nutrition tracking app that helps users log workouts, track calories and macros, monitor body-weight progress, and stay consistent with their fitness goals.",
    description: "LiftLog is a mobile-first fitness companion currently under development. The app combines workout tracking and calorie management into a single platform, allowing users to monitor their training performance, daily nutrition, body-weight changes, and long-term progress. The goal is to eliminate the need for multiple fitness apps by bringing workouts, nutrition, and progress analytics together in one seamless experience.",
    techStack: ["React Native", "Expo", "TypeScript", "Firebase", "Firestore", "Zustand", "NativeWind"],
    // No githubUrl or liveUrl while in progress
    status: "wip",
    statusBadge: "🚧 Work In Progress",
    secondaryLabel: "Building in Public",
    tagline: "Track your lifts. Count your calories. Build consistency...",
    image: "/assets/projects.png",
  },
];

export const skillsData: SkillCategory[] = [
  {
    title: "Languages",
    skills: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL", "HTML5", "CSS3"],
  },
  {
    title: "Frontend",
    skills: ["React.js", "Next.js", "Tailwind CSS", "TanStack Query", "Zustand"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "RESTful APIs", "JWT Authentication"],
  },
  {
    title: "Databases",
    skills: ["MongoDB", "PostgreSQL", "MySQL"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "MCP", "Postman", "Playwright", "Figma", "Vercel", "Render", "Netlify"],
  },
];

export const experienceData: ExperienceItem[] = [
  {
    id: "mca",
    role: "Master of Computer Applications",
    companyOrInstitution: "PSG College of Technology",
    period: "Aug 2025 – Present",
    details: [
      "Advancing full-stack development skills through coursework in distributed systems, software architecture, and cloud-native application design.",
      "Leading practical projects focused on scalable web platforms, API development, and modern DevOps deployment practices.",
    ],
  },
  {
    id: "pgdh",
    role: "Post Graduate Diploma in Human Resource Management",
    companyOrInstitution: "PSG College of Arts and Science",
    period: "Aug 2024 – May 2025",
    details: [
      "Focused on organizational behavior, talent management, and HR analytics.",
      "Completed coursework bridging people operations with technology-driven business processes.",
    ],
  },
  {
    id: "bsc",
    role: "Bachelor of Science in Computer Science",
    companyOrInstitution: "PSG College of Arts and Science",
    period: "Aug 2021 – May 2024",
    details: [
      "Built a strong foundation in programming, data structures, and software engineering.",
      "Completed projects in web development, database systems, and algorithm design.",
    ],
  },
  {
    id: "freelance",
    role: "Freelance Full Stack  Developer",
    companyOrInstitution: "Self-Employed",
    period: " April 2026 - Present",
    details: [
      "Built responsive and production ready  web applications and  interactive portfolio sites .",
      "Delivered features using React, Node.js, Express, and MongoDB with Git-based workflows.",
      "Focused on maintainable code, performance, and cross-device user experience.",
    ],
  },
];

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
}

export const certifications: CertificationItem[] = [
  {
    id: "hcl-guvi",
    title: "Full Stack Development",
    issuer: "HCL GUVI",
    date: "May 2026",
  },
  {
    id: "nptel-dbms",
    title: "Database Management Systems (DBMS)",
    issuer: "NPTEL",
    date: "Sep 2023",
  },
];

export const photographyData: PhotoItem[] = [
  {
    id: "photo1",
    title: "Prism & Light Reflections",
    category: "Minimalist",
    imageUrl: "/assets/photography.png",
  },
  {
    id: "photo2",
    title: "Geometric Architecture Lines",
    category: "Architecture",
    imageUrl: "/assets/photography.png",
  },
  {
    id: "photo3",
    title: "Golden Hour Street Silhouette",
    category: "Street",
    imageUrl: "/assets/photography.png",
  },
  {
    id: "photo4",
    title: "Monochrome Nature Detail",
    category: "Nature",
    imageUrl: "/assets/photography.png",
  },
];

export interface PlaylistItem {
  id: string;
  name: string;
  description: string;
  trackCount: number;
  coverImage: string;
  url: string;
}

export const spotifyPlaylists: PlaylistItem[] = [
  {
    id: "playlist1",
    name: "Coding Focus",
    description: "Lo-fi beats for deep work sessions",
    trackCount: 45,
    coverImage: "/assets/mackbook-theme/icons/spotify.png",
    url: "https://open.spotify.com/playlist/1",
  },
  {
    id: "playlist2",
    name: "Gym Motivation",
    description: "High energy tracks for workouts",
    trackCount: 32,
    coverImage: "/assets/mackbook-theme/icons/spotify.png",
    url: "https://open.spotify.com/playlist/2",
  },
  {
    id: "playlist3",
    name: "Late Night Vibes",
    description: "Chill tracks for evening relaxation",
    trackCount: 28,
    coverImage: "/assets/mackbook-theme/icons/spotify.png",
    url: "https://open.spotify.com/playlist/3",
  },
  {
    id: "playlist4",
    name: "Road Trip Anthems",
    description: "Best songs for long drives",
    trackCount: 50,
    coverImage: "/assets/mackbook-theme/icons/spotify.png",
    url: "https://open.spotify.com/playlist/4",
  },
  {
    id: "playlist5",
    name: "Indie Discoveries",
    description: "Fresh indie music picks",
    trackCount: 38,
    coverImage: "/assets/mackbook-theme/icons/spotify.png",
    url: "https://open.spotify.com/playlist/5",
  },
  {
    id: "playlist6",
    name: "Throwback Hits",
    description: "Nostalgic tracks from the past",
    trackCount: 42,
    coverImage: "/assets/mackbook-theme/icons/spotify.png",
    url: "https://open.spotify.com/playlist/6",
  },
];
