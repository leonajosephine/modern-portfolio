export type ProjectLinkKind =
  | "live"
  | "repo"
  | "figma"
  | "video"
  | "case"
  | "app";

export type ProjectLink = {
  label: string;
  href: string;
  kind?: ProjectLinkKind;
};

export type MediaSpan = "single" | "full";

type MediaLayout = {
  span?: MediaSpan;
};

export type Media =
  | ({ type: "image"; src: string; alt?: string } & MediaLayout)
  | ({ type: "gif"; src: string; alt?: string } & MediaLayout)
  | ({ type: "video"; src: string; poster?: string } & MediaLayout)
  | ({ type: "youtube"; id: string; title?: string } & MediaLayout);

export type Block =
  | { type: "text"; title?: string; body: string }
  | { type: "bullets"; title?: string; items: string[] }
  | { type: "stack"; title?: string; items: string[] }
  | {
      type: "metrics";
      title?: string;
      items: { label: string; value: string }[];
    }
  | { type: "gallery"; title?: string; items: Media[] };

export type ProjectCategory = "coding" | "design" | "3d";

export type Project = {
  slug: string;
  title: string;
  short: string;
  cover: string;
  hero: Media;
  category: ProjectCategory;
  gradient?: "sunset" | "aurora" | "forest" | "ice";
  tags?: string[];
  meta?: {
    role?: string;
    year?: string;
    duration?: string;
    team?: string;
  };
  links?: ProjectLink[];
  blocks: Block[];
  size?: "normal" | "wide" | "tall" | "big";
};

export const projects: Project[] = [
  {
    slug: "aurem",
    title: "Aurem",
    short:
      "As someone who's never seen without a ton of jewelry, creating my own luxury brand playground felt like the perfect opportunity to combine branding, storytelling and frontend development.",
  
    cover: "/images/aurem/responsive.png",
  
    hero: {
      type: "image",
      src: "/images/aurem/hero.png",
      alt: "Aurem jewelry website",
    },
  
    category: "design",
  
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Branding",
      "Art Direction",
      "AI Imagery",
    ],
  
    meta: {
      role: "UI Designer & Frontend Developer",
      year: "2026",
      duration: "1 week",
      team: "Solo",
    },
  
    links: [],
  
    blocks: [
      {
        type: "text",
        title: "Why Aurem?",
        body:
          "I've always loved jewelry—not just as an accessory, but as something that tells a story and becomes part of someone's identity. I wanted to challenge myself to build an entire luxury brand from nothing more than a blank canvas. Instead of starting with a homepage, I started with a vision: creating a world that felt special, timeless and cohesive in every detail.",
      },
  
      {
        type: "text",
        title: "Building a Brand, Not Just a Website",
        body:
          "I started from typography, color palettes and product presentation to campaign concepts and visual storytelling, every creative decision was made with the overall identity in mind. The final website became a natural extension of that brand—designed to feel premium and consistent across every touchpoint.",
      },
  
      {
        type: "metrics",
        title: "My Contribution",
        items: [
          {
            label: "Brand Strategy & Art Direction",
            value:
              "Developed the complete visual identity, creative direction, typography, color palette and campaign concept.",
          },
          {
            label: "UX/UI Design",
            value:
              "Designed responsive ecommerce experiences focused on storytelling, product discovery and a premium shopping journey.",
          },
          {
            label: "Frontend Development",
            value:
              "Built the website with reusable components using Next.js, TypeScript and Tailwind CSS with a focus on performance and accessibility.",
          },
        ],
      },
  
      {
        type: "bullets",
        title: "Project Highlights",
        items: [
          "Developed an entire luxury jewelry brand from scratch.",
          "Created the visual identity before designing the website.",
          "Directed and generated AI campaign imagery based on custom moodboards and art direction.",
          "Designed responsive collection and product detail experiences.",
          "Built reusable frontend components with Next.js and Tailwind CSS.",
          "Focused on storytelling to create a premium ecommerce experience rather than a traditional online shop.",
        ],
      },
  
      {
        type: "stack",
        title: "Tech & Tools",
        items: [
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Figma",
          "AI Image Generation",
        ],
      },
      {
        type: "gallery",
        title: "Selected Work",
        items: [
          {
            type: "image",
            src: "/images/aurem/hero.png",
            alt: "Aurem hero",
            span: "full",
          },
          {
            type: "image",
            src: "/images/aurem/responsive2.png",
            alt: "Responsive mockups",
          },
          {
            type: "image",
            src: "/images/aurem/collection.png",
            alt: "Collection page",
          },
          {
            type: "image",
            src: "/images/aurem/collection2.png",
            alt: "Collection overview",
          },
          {
            type: "image",
            src: "/images/aurem/pdp1.png",
            alt: "Product detail page",
            span: "full",
          },
          {
            type: "image",
            src: "/images/aurem/pdp2.png",
            alt: "Product detail page detail",
          },
          {
            type: "image",
            src: "/images/aurem/explore.png",
            alt: "Explore section",
          },
          {
            type: "image",
            src: "/images/aurem/featured.png",
            alt: "Featured products",
          },
          {
            type: "image",
            src: "/images/aurem/campaign.png",
            alt: "Campaign artwork",
            span: "full",
          },
          {
            type: "image",
            src: "/images/aurem/editorialSplit.png",
            alt: "Editorial split layout",
          },
        ],
      },
    ],
  
    size: "big",
  },
  {
    slug: "eightsquared",
    title: "Eightsquared",
    short:
      "A modern responsive website for an AI company with a clean, minimal and technical visual direction.",
    cover: "/images/e2/e2_hero.png",
    hero: {
      type: "image",
      src: "/images/e2/e2_hero.png",
      alt: "Eightsquared hero",
    },
    category: "design",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Responsive Design",
      "Dark Mode",
      "UI Design",
    ],
    meta: {
      role: "UI Designer & Frontend Developer",
      year: "2026",
      duration: "2 weeks",
      team: "Client Project",
    },
    links: [
      {
        label: "Live Demo",
        href: "https://eightsquared.vercel.app",
        kind: "live",
      },
      // Add the correct repository link once it is ready.
      // {
      //   label: "GitHub Repository",
      //   href: "https://...",
      //   kind: "repo",
      // },
    ],
    blocks: [
      {
        type: "text",
        title: "Making AI Feel Clear, Not Cold",
        body:
          "The project explores how an AI company can feel innovative and technically credible without relying on an overly cold or generic visual language.",
      },
      {
        type: "text",
        title: "Goal",
        body:
          "Create a responsive company website that presents services, work and brand positioning through a clean, minimal and distinctly technical aesthetic.",
      },
      {
        type: "bullets",
        title: "Highlights",
        items: [
          "Responsive layouts for desktop, tablet and mobile",
          "Coordinated light and dark themes",
          "Reusable component system",
          "Clear visual hierarchy for technical content",
          "Brand identity and digital design direction",
        ],
      },
      {
        type: "stack",
        title: "Tech & Tools",
        items: ["Next.js", "TypeScript", "Tailwind CSS", "Figma"],
      },
      {
        type: "gallery",
        title: "Selected Work",
        items: [
          {
            type: "image",
            src: "/images/e2/e2_components.png",
            alt: "Component overview",
          },
          {
            type: "image",
            src: "/images/e2/e2_lightanddark.png",
            alt: "Light and dark mode",
          },
          {
            type: "image",
            src: "/images/e2/e2_desktop_dark.png",
            alt: "Desktop dark mode",
            span: "full",
          },
          {
            type: "image",
            src: "/images/e2/e2_responsive.png",
            alt: "Responsive layouts",
          },
          {
            type: "image",
            src: "/images/e2/e2_brandIdentity.png",
            alt: "Brand identity",
          },
          {
            type: "image",
            src: "/images/e2/e2_showcase.png",
            alt: "Website showcase",
            span: "full",
          },
        ],
      },
    ],
    size: "normal",
  },
  {
    slug: "reading-list-app",
    title: "Reading App",
    short:
      "Inspired by my love for fantasy books - I designed the reading app I would love to have myself: Part digital bookshelf, part reading journal—the app and themes to choose from.",
    cover: "/images/readingList/hero.png",
    hero: {
      type: "image",
      src: "/images/readingList/read_dark.png",
      alt: "Reading app in dark mode",
    },
    category: "coding",
    tags: [
      "React Native",
      "Expo",
      "TypeScript",
      "Supabase",
      "Google Books API",
      "Mobile UX",
    ],
    meta: {
      role: "Product Designer & App Developer",
      year: "2026",
      team: "Solo",
    },
    links: [
      // Add live, app store or repository links once they are ready.
      // {
      //   label: "GitHub Repository",
      //   href: "https://...",
      //   kind: "repo",
      // },
    ],
    blocks: [
      {
        type: "text",
        title: "A Reading App That Feels Like Yours",
        body:
          "Since I love books, I wanted to create a reading app that felt less like a database and more like a personal reading space — somewhere to collect stories, track progress and organize the books that matter to you.",
      },
      {
        type: "text",
        title: "Overview",
        body:
          "The app allows users to manage a personal library, track reading progress, create custom lists and discover books in one mobile experience.",
      },
      {
        type: "bullets",
        title: "Main Features",
        items: [
          "Save and organize books in a personal library",
          "Track reading status and progress",
          "Create personalized reading lists",
          "Switch between six visual themes",
          "Discover books through the Google Books API",
          "Connect with friends and share reading inspiration",
        ],
      },
      {
        type: "stack",
        title: "Tech & Tools",
        items: [
          "React Native",
          "Expo",
          "TypeScript",
          "Supabase",
          "Google Books API",
          "iOS",
          "Android",
        ],
      },
      {
        type: "gallery",
        title: "Selected Screens",
        items: [
          {
            type: "image",
            src: "/images/readingList/read_themes.png",
            alt: "Theme overview",
            span: "full",
          },
          {
            type: "image",
            src: "/images/readingList/read_home.png",
            alt: "Home screen",
          },
          {
            type: "image",
            src: "/images/readingList/read_features.png",
            alt: "Feature overview",
          },
          {
            type: "image",
            src: "/images/readingList/read_themes2.png",
            alt: "Theme variations",
          },
          {
            type: "image",
            src: "/images/readingList/read_dark2.png",
            alt: "Dark theme",
          },
        ],
      },
    ],
    size: "big",
  },
  {
    slug: "lunara",
    title: "Lunara",
    short:
      "An editorial skincare concept focused on premium product presentation and calm visual storytelling.",
    cover: "/images/lunara/lunara_title.png",
    hero: {
      type: "image",
      src: "/images/lunara/lunara_hero.png",
      alt: "Lunara skincare hero",
    },
    category: "design",
    tags: [
      "Brand Design",
      "UI Design",
      "React",
      "TypeScript",
      "Responsive Design",
      "Editorial",
    ],
    meta: {
      role: "UI Designer & Frontend Developer",
      year: "2025",
      duration: "1 week",
      team: "Solo",
    },
    links: [
      // Add the real links once they are ready.
      // {
      //   label: "Figma",
      //   href: "https://...",
      //   kind: "figma",
      // },
      // {
      //   label: "GitHub Repository",
      //   href: "https://...",
      //   kind: "repo",
      // },
    ],
    blocks: [
      {
        type: "text",
        title: "Skincare, Told Like an Editorial",
        body:
          "Lunara explores how a skincare brand can feel informative, calm and premium without becoming overly clinical or decorative.",
      },
      {
        type: "text",
        title: "Concept",
        body:
          "A minimal editorial layout centered on typography, spacing and strong product storytelling.",
      },
      {
        type: "metrics",
        title: "Design Focus",
        items: [
          {
            label: "Visual Tone",
            value: "Premium, calm and editorial",
          },
          {
            label: "Structure",
            value: "Reusable component-based sections",
          },
        ],
      },
      {
        type: "stack",
        title: "Tech & Tools",
        items: ["React", "TypeScript", "Tailwind CSS", "Figma"],
      },
      {
        type: "gallery",
        title: "Selected Work",
        items: [
          {
            type: "image",
            src: "/images/lunara/lunara_mobile1.png",
            alt: "Lunara mobile experience",
          },
          {
            type: "image",
            src: "/images/lunara/lunara_packages.png",
            alt: "Lunara product packaging",
          },
          {
            type: "image",
            src: "/images/lunara/lunara_single.png",
            alt: "Lunara single product view",
          },
          {
            type: "image",
            src: "/images/lunara-overview.png",
            alt: "Lunara website overview",
            span: "full",
          },
          {
            type: "image",
            src: "/images/lunara-divider.png",
            alt: "Lunara editorial divider",
          },
          {
            type: "image",
            src: "/images/lunara-teaser.png",
            alt: "Lunara campaign teaser",
          },
          {
            type: "image",
            src: "/images/lunara/lunara_magazine.png",
            alt: "Lunara magazine-inspired layout",
            span: "full",
          },
          {
            type: "image",
            src: "/images/lunara/lunara_brandIdentity.png",
            alt: "Lunara brand identity",
          },
        ],
      },
    ],
    size: "tall",
  },
  {
    slug: "merle-and-lasse",
    title: "Merle & Lasse",
    short:
      "When one of your best friends asks you to do their wedding website - of course the answer is yes! This was the perfect opportunity to create something special for the two of them.",
    cover: "/images/m&l/invitations.jpg",
    hero: {
      type: "video",
      src: "/images/m&l/letterOpening.mov", //vid 
      poster: "/images/m&l/letter1.png",
    },
    category: "design",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "next-intl",
      "Responsive Design",
      "UI Design",
    ],
    meta: {
      role: "UI Designer & Frontend Developer",
      year: "2026",
      team: "Solo",
    },
    links: [
      // Add the live website or repository when it is ready to be public.
      // {
      //   label: "Live Website",
      //   href: "https://...",
      //   kind: "live",
      // },
    ],
    blocks: [
      {
        type: "text",
        title: "More Personal Than a Printed Invitation",
        body:
          "The goal was to create more than a practical information page. The website should feel like an extension of the wedding itself — warm, elegant and personal, while still helping guests find every important detail quickly.",
      },
      {
        type: "text",
        title: "A digital invitation",
        body:
          "The multilingual website combines the couple's story, schedule, gallery, location details, accommodation information, FAQs and an RSVP flow in one responsive experience.",
      },
      {
        type: "bullets",
        title: "Highlights",
        items: [
          "Custom visual language based on the wedding stationery",
          "Responsive guest experience for mobile and desktop",
          "Multilingual content in German, English and Danish",
          "Structured schedule, travel and accommodation information",
          "Digital RSVP experience",
          "Custom illustrations, ornaments and typography",
        ],
      },
      {
        type: "stack",
        title: "Tech & Tools",
        items: [
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "next-intl",
          "Figma",
        ],
      },
      {
        type: "gallery",
        title: "Selected Work",
        items: [
          {
            type: "image",
            src: "/images/m&l/letter2.png",
            alt: "Wedding website homepage",
            span: "full",
          },
          {
            type: "image",
            src: "/images/m&l/letterDetail.png",
            alt: "Wedding invitation and visual identity",
          },
          {
            type: "image",
            src: "/images/m&l/stage.png",
            alt: "Wedding invitation and visual identity",
          },
          {
            type: "image",
            src: "/images/m&l/timetable.png",
            alt: "Wedding invitation and visual identity",
          },
          {
            type: "image",
            src: "/images/m&l/rsvp.png",
            alt: "Wedding invitation and visual identity",
          },
          {
            type: "image",
            src: "/images/m&l/countdown.png",
            alt: "Wedding invitation and visual identity",
          },
          {
            type: "image",
            src: "/images/m&l/dresscode.png",
            alt: "Wedding invitation and visual identity",
          },
          {
            type: "image",
            src: "/images/m&l/footer.png",
            alt: "Wedding invitation and visual identity",
          },
        ],
      },
    ],
    size: "normal",
  },
  {
    slug: "netflix-rebuild",
    title: "Netflix Rebuild",
    short:
      "A Netflix-inspired browsing experience with responsive discovery, trailers, search and a personal watchlist. This was my way of studying one of the most polished streaming experiences—and understanding the tiny interaction details behind it.",
    cover: "/images/netflix.jpg",
    hero: {
      type: "image",
      src: "/images/netflix/Netflix_mockup_responsive.png",
      alt: "Netflix-inspired responsive interface",
    },
    category: "coding",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Framer Motion",
      "TMDB API",
      "Responsive Design",
    ],
    meta: {
      role: "Frontend Developer",
      year: "2026",
      duration: "2 weeks",
      team: "Solo",
    },
    links: [
      {
        label: "GitHub Repository",
        href: "https://github.com/leonajosephine/netflix-inspired",
        kind: "repo",
      },
      // Add the live URL once the project is deployed.
      // {
      //   label: "Live Demo",
      //   href: "https://...",
      //   kind: "live",
      // },
    ],
    blocks: [
      {
        type: "text",
        title: "Rebuilding a Familiar Experience",
        body:
          "This project started as a frontend challenge: recreate the feeling of a familiar streaming platform while focusing on responsive behavior, interaction details and dynamic movie data.",
      },
      {
        type: "text",
        title: "Goal",
        body:
          "Build a Netflix-inspired browsing experience with modern transitions, responsive navigation and dynamic content from the TMDB API.",
      },
      {
        type: "bullets",
        title: "Highlights",
        items: [
          "Trailer modal powered by the TMDB API",
          "Responsive search experience and results grid",
          "Personal watchlist stored in localStorage",
          "Keyboard-friendly interactions",
          "Reusable movie rows and detail views",
        ],
      },
      {
        type: "stack",
        title: "Tech Stack",
        items: [
          "Next.js",
          "React",
          "TypeScript",
          "Framer Motion",
          "TMDB API",
        ],
      },
      {
        type: "gallery",
        title: "Screens & Interactions",
        items: [
          {
            type: "video",
            src: "/media/netflix-video.mp4",
            poster: "/images/netflix.jpg",
            span: "full",
          },
          {
            type: "image",
            src: "/images/netflix/Netflix_mockup_main.png",
            alt: "Responsive website mockup",
            span: "full",
          },
          {
            type: "image",
            src: "/images/netflix_overview.png",
            alt: "Homepage",
          },
          {
            type: "image",
            src: "/images/netflix_movierow_trends.png",
            alt: "Trending movie row",
          },
          {
            type: "image",
            src: "/images/netflix_moviemodal.png",
            alt: "Movie detail modal",
            span: "full",
          },
        ],
      },
    ],
    size: "tall",
  },
  {
    slug: "apple-vision-pro",
    title: "Apple Vision Pro Interior App",
    short:
      "Exploring the future of spatial computing with immersive interactions, 3D content, and native visionOS development.",
    cover: "/images/avp/pink.webp",
    hero: {
      type: "image",
      src: "/images/avp/vision3.png",
      alt: "Apple Vision Pro spatial experience",
    },
    category: "3d",
    tags: [
      "visionOS",
      "Swift",
      "SwiftUI",
      "RealityKit",
      "Spatial Design",
      "3D",
    ],
    meta: {
      role: "Creative Developer",
      year: "2024",
      team: "Team Project",
    },
    links: [
      // Add a video, case study or repository if it can be shared publicly.
      // {
      //   label: "Project Video",
      //   href: "https://...",
      //   kind: "video",
      // },
    ],
    blocks: [
      {
        type: "text",
        title: "Designing Beyond the Screen",
        body:
          "This project was an exciting opportunity to explore what happens when interfaces break free from the limits of a flat screen. With the Apple Vision Pro, I dove into the world of spatial computing, where depth, scale, and immersion redefine how we interact with digital content. The goal was to create experiences that feel intuitive, engaging, and completely natural in a 3D environment.",
      },
      {
        type: "text",
        title: "Overview",
        body:
          "The project combined SwiftUI for native visionOS interfaces with RealityKit to bring 3D elements to life. It was all about experimenting with spatial layouts, immersive interactions, and blending familiar UI principles with the exciting possibilities of a spatial environment.",
      },
      {
        type: "bullets",
        title: "Focus Areas",
        items: [
          "Developing native visionOS interfaces with SwiftUI",
          "Creating spatial layouts and interaction patterns",
          "Integrating 3D content with RealityKit",
          "Experimenting with depth, scale, and immersion",
          "Adapting familiar UI principles to a spatial environment",
        ],
      },
      {
        type: "stack",
        title: "Tech Stack",
        items: ["Swift", "SwiftUI", "RealityKit", "visionOS", "Xcode"],
      },
      {
        type: "gallery",
        title: "Project Preview",
        items: [
          {
            type: "video",
            src: "/images/avp/newInterior.mp4", 
            poster: "/images/avp/pink.webp",
            span: "full",
          },
          {
            type: "image",
            src: "/images/avp/object.png",
            alt: "Spatial interface example",
          },
          {
            type: "image",
            src: "/images/avp/person.jpg",
            alt: "Spatial interface example",
          },
          {
            type: "image",
            src: "/images/avp/sensors.jpg",
            alt: "Immersive spatial experience",
          },
        ],
      },
    ],
    size: "wide",
  },

  // ---------------------------------------------------------------------------
  // TEMPORARILY HIDDEN PROJECTS
  // Keep these objects inside the file so they can be reactivated later.
  // ---------------------------------------------------------------------------

  /*
  {
    slug: "to-do-list",
    title: "To-do List App",
    short: "A customizable task board for organizing projects and daily work.",
    cover: "/images/toDo/cover.png",
    hero: {
      type: "image",
      src: "/images/toDo/overview.png",
      alt: "To-do list app overview",
    },
    category: "coding",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    meta: {
      role: "Frontend Developer",
      year: "2024",
      duration: "3 weeks",
      team: "Solo",
    },
    links: [
      // {
      //   label: "Live Demo",
      //   href: "https://...",
      //   kind: "live",
      // },
      // {
      //   label: "GitHub Repository",
      //   href: "https://...",
      //   kind: "repo",
      // },
    ],
    blocks: [
      {
        type: "text",
        title: "Overview",
        body:
          "A task management interface with customizable boards, filtering and visual organization options.",
      },
      {
        type: "bullets",
        title: "Key Features",
        items: [
          "Create and manage task boards",
          "Add new boards and tasks",
          "Filter tasks",
          "Customize the visual background",
        ],
      },
      {
        type: "stack",
        title: "Tech Stack",
        items: ["React", "TypeScript", "Tailwind CSS"],
      },
      {
        type: "gallery",
        title: "Project Screenshots",
        items: [
          {
            type: "image",
            src: "/images/toDo/macBook.png",
            alt: "Desktop mockup",
            span: "full",
          },
          {
            type: "image",
            src: "/images/toDo/Board.png",
            alt: "Task board",
          },
          {
            type: "image",
            src: "/images/toDo/addBoard.png",
            alt: "Add board screen",
          },
          {
            type: "image",
            src: "/images/toDo/bg.png",
            alt: "Background selection",
          },
          {
            type: "image",
            src: "/images/toDo/filter.png",
            alt: "Filter view",
          },
        ],
      },
    ],
    size: "normal",
  },
  */

  /*
  {
    slug: "mini-game",
    title: "Mini Game",
    short:
      "A small interactive game project that is currently being prepared for the portfolio.",
    cover: "/images/collage.jpg",
    hero: {
      type: "image",
      src: "/images/collage.jpg",
      alt: "Mini game project",
    },
    category: "coding",
    tags: [],
    meta: {
      role: "Developer",
      year: "2023",
      team: "Solo",
    },
    links: [],
    blocks: [
      {
        type: "text",
        title: "Overview",
        body:
          "This project is currently hidden until its content, visuals and final case study are ready.",
      },
      {
        type: "gallery",
        title: "Project Images",
        items: [
          {
            type: "image",
            src: "/images/websiteshop.jpeg",
            alt: "Mini game preview",
          },
          {
            type: "image",
            src: "/images/websiteshop.jpeg",
            alt: "Mini game detail",
          },
        ],
      },
    ],
    size: "normal",
  },
  */

  /*
  {
    slug: "design-website",
    title: "Design Website & Art Direction",
    short:
      "A design-led website concept that is currently being prepared for the portfolio.",
    cover: "/images/toDo/cover.png",
    hero: {
      type: "image",
      src: "/images/toDo/overview.png",
      alt: "Design website concept",
    },
    category: "design",
    tags: [],
    meta: {
      role: "Designer & Developer",
      year: "2024",
      team: "Solo",
    },
    links: [],
    blocks: [
      {
        type: "text",
        title: "Overview",
        body:
          "This project is currently hidden until its design, imagery and case study are ready.",
      },
      {
        type: "gallery",
        title: "Project Screenshots",
        items: [
          {
            type: "image",
            src: "/images/toDo/macBook.png",
            alt: "Desktop mockup",
            span: "full",
          },
          {
            type: "image",
            src: "/images/toDo/Board.png",
            alt: "Website screen",
          },
          {
            type: "image",
            src: "/images/toDo/addBoard.png",
            alt: "Website detail",
          },
          {
            type: "image",
            src: "/images/toDo/bg.png",
            alt: "Visual concept",
          },
          {
            type: "image",
            src: "/images/toDo/filter.png",
            alt: "Interface detail",
          },
        ],
      },
    ],
    size: "normal",
  },
  */

  /*
  {
    slug: "graphic-design-website",
    title: "Graphic Design Website",
    short:
      "A visually expressive website concept with a strong graphic design and art direction focus.",
    cover: "/images/websiteshop.jpeg",
    hero: {
      type: "image",
      src: "/images/toDo/overview.png",
      alt: "Graphic design website concept",
    },
    category: "design",
    tags: [],
    meta: {
      role: "Designer & Developer",
      year: "2024",
      team: "Solo",
    },
    links: [],
    blocks: [
      {
        type: "text",
        title: "Overview",
        body:
          "This project is currently hidden until its visual direction and case study are ready.",
      },
      {
        type: "gallery",
        title: "Project Screenshots",
        items: [
          {
            type: "image",
            src: "/images/toDo/macBook.png",
            alt: "Desktop mockup",
            span: "full",
          },
          {
            type: "image",
            src: "/images/toDo/Board.png",
            alt: "Website screen",
          },
          {
            type: "image",
            src: "/images/toDo/addBoard.png",
            alt: "Website detail",
          },
          {
            type: "image",
            src: "/images/toDo/bg.png",
            alt: "Visual concept",
          },
          {
            type: "image",
            src: "/images/toDo/filter.png",
            alt: "Interface detail",
          },
        ],
      },
    ],
    size: "normal",
  },
  */
];
