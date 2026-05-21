export type ProjectLinkKind = "live" | "repo" | "figma" | "video" | "case" | "app";

export type ProjectLink = {
  label: string;
  href: string;
  kind?: ProjectLinkKind;
};

export type Media =
  | { type: "image"; src: string; alt?: string }
  | { type: "gif"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string } // mp4/webm in /public
  | { type: "youtube"; id: string; title?: string };

export type Block =
  | { type: "text"; title?: string; body: string }
  | { type: "bullets"; title?: string; items: string[] }
  | { type: "stack"; title?: string; items: string[] }
  | { type: "metrics"; title?: string; items: { label: string; value: string }[] }
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
    slug: "netflix-rebuild",
    title: "Netflix Rebuild",
    short: "Netflix-inspired UI with search, trailers & a personal list.",
    cover: "/images/netflix.jpg",
    hero: { type: "image", src: "/images/netflix/Netflix_mockup_responsive.png", alt: "Homepage" },
    category: "coding",
    tags: ["Next.js", "React", "TypeScript", "Framer Motion", "TMDB"],
    meta: { role: "Frontend", year: "2026", duration: "2 weeks", team: "Solo" },
    links: [
      { label: "Live Demo", href: "https://your-demo-url.com", kind: "live" },
      { label: "GitHub Repo", href: "https://github.com/leonajosephine/netflix-inspired", kind: "repo" },
    ],
    blocks: [
      { type: "text", title: "Goal", body: "Rebuild a Netflix-like browsing experience with modern transitions and fast navigation." },
      { type: "bullets", title: "Highlights", items: [
        "Trailer modal via TMDB /videos",
        "Search experience with responsive results grid",
        "My List stored in localStorage",
        "Keyboard-friendly interactions"
      ]},
      { type: "stack", title: "Tech Stack", items: ["Next.js (App Router)", "TypeScript", "Framer Motion", "TMDB API"] },
      { type: "gallery", title: "Screens / Interactions", items: [
        { type: "video", src: "/media/netflix-video.mp4", poster: "/images/netflix.jpg" },
        { type: "image", src: "/images/netflix/Netflix_mockup_main.png", alt: "Responsivness ofWebsite" },
        { type: "image", src: "/images/netflix_overview.png", alt: "Homepage" },
        { type: "image", src: "/images/netflix_movierow_trends.png", alt: "Trends row design" },
        { type: "image", src: "/images/netflix_moviemodal.png", alt: "Movie detail page" },
        //{ type: "gif", src: "/images/netflix-scroll.gif", alt: "Scroll interaction" }
      ]}
    ],
    size: "wide"
  },

  {
    slug: "skincare-brand-site",
    title: "Skincare Brand Website",
    short: "Ultra clean product/brand website with editorial visuals.",
    cover: "/images/lunara/lunara_title.png", 
    hero: { type: "image", src: "/images/lunara/lunara_hero.png", alt: "Skincare hero" },
    category: "design",
    tags: ["Design", "React", "UI", "Brand", "Responsive", "Mobile-First"],
    meta: { role: "UI/Frontend", year: "2025", duration: "1 week", team: "Solo" },
    links: [
      { label: "Case Study", href: "https://your-site.com/case/skincare", kind: "case" },
      { label: "Figma", href: "https://figma.com/...", kind: "figma" },
      { label: "Repo", href: "https://github.com/leonajosephine/lunara-skin", kind: "repo" },
    ],
    blocks: [
      { type: "text", title: "Concept", body: "A minimal editorial layout focusing on typography, spacing and strong product storytelling." },
      { type: "metrics", title: "Outcome", items: [
        { label: "Focus", value: "Premium, clean aesthetic" },
        { label: "Structure", value: "Component-based sections" }
      ]},
      { type: "stack", title: "Technologies Used", items: ["React", "TypeScript", "Tailwind CSS"] },
      { type: "gallery", title: "Mockups", items: [
        { type: "image", src: "/images/lunara/lunara_mobile1.png" },
        { type: "image", src: "/images/lunara/lunara_packages.png" },
        { type: "image", src: "/images/lunara/lunara_single.png" },
        { type: "image", src: "/images/lunara-overview.png" },
        { type: "image", src: "/images/lunara-divider.png" },
        { type: "image", src: "/images/lunara-teaser.png" },
        { type: "image", src: "/images/lunara/lunara_magazine.png" },
        { type: "image", src: "/images/lunara/lunara_brandIdentity.png" },
      ]}
    ],
    size: "tall"
  },
  {
    slug: "to-do-list",
    title: "To do List App",
    short: "Description for project three.",
    cover: "/images/toDo/cover.png",
    hero: { type: "image", src: "/images/toDo/overview.png", alt: "Project three hero" },
    category: "coding",
    tags: ["Tag1", "Tag2"],
    meta: { role: "Role", year: "2024", duration: "3 weeks", team: "Team Name" },
    links: [
      { label: "Live Site", href: "https://example.com", kind: "live" },
      { label: "Repository", href: "https://example.com", kind: "repo" },
    ],
    blocks: [
      { type: "text", title: "Overview", body: "Detailed overview of project three." },
      { type: "bullets", title: "Key Features", items: [
        "Feature one",
        "Feature two",
        "Feature three"
      ]},
      { type: "stack", title: "Technologies Used", items: ["React", "TypeScript", "Tailwind CSS"] },
      { type: "gallery", title: "Project Screenshots", items: [
        { type: "image", src: "/images/toDo/macBook.png", alt: "Screenshot one" },
        { type: "image", src: "/images/toDo/Board.png", alt: "Screenshot one" },
        { type: "image", src: "/images/toDo/addBoard.png", alt: "Screenshot one" },
        { type: "image", src: "/images/toDo/bg.png", alt: "Screenshot one" },
        { type: "image", src: "/images/toDo/filter.png", alt: "Screenshot two" }

      ]}
    ],
    size: "normal"
  },
  {
    slug: "book / reading list app",
    title: "Reading List App",
    short: "This project is a book/reading list app that allows users to track their reading progress, create personalized reading lists, and discover new books based on their interests. The app features a clean and intuitive interface, making it easy for users to manage their reading habits and explore a wide range of book recommendations.",
    cover: "/images/readingList/hero.png",
    hero: { type: "image", src: "/images/readingList/read_dark.png", alt: "Project four hero" },
    category: "coding",
    tags: ["TagA", "TagB"],
    meta: { role: "Role", year: "2023", duration: "3 months", team: "Team Alpha" },
    links: [
      { label: "Live App", href: "https://example.com", kind: "live" },
      { label: "GitHub", href: "https://example.com", kind: "repo" },
    ],
    blocks: [
      { type: "text", title: "Introduction", body: "Detailed introduction of project four." },
      { type: "bullets", title: "Main Features", items: [
        "Save all your books in one place",
        "Make Lists to organize your reading",
        "Switch Theme to your liking (6 different themes)",
        "Connect with friends to see their reading lists and share recommendations"
      ]},
      { type: "stack", title: "Used Technologies", items: ["React Native", "iOS", "Android", "XCode", "Supabase", "GoogleBooksAPI"] },
      { type: "gallery", title: "Project Images", items: [
        { type: "image", src: "/images/readingList/read_themes.png", alt: "Image one" },
        { type: "image", src: "/images/readingList/read_home.png ", alt: "Image two" },
        { type: "image", src: "/images/readingList/read_features.png", alt: "Image four" },
        //{ type: "image", src: "/images/readingList/read_themes1.png", alt: "Image five" },
        { type: "image", src: "/images/readingList/read_themes2.png", alt: "Image six" },
        { type: "image", src: "/images/readingList/read_dark2.png", alt: "Image three" },
        
      ]}
    ],
    size: "big"
  }, 
  {
    slug: "mini game",
    title: "Mini Game Test",
    short: "Description for project four.",
    cover: "/images/collage.jpg",
    hero: { type: "image", src: "/images/collage.jpg", alt: "Project four hero" },
    category: "coding",
    tags: ["TagA", "TagB"],
    meta: { role: "Role", year: "2023", duration: "4 weeks", team: "Team Alpha" },
    links: [
      { label: "Live Demo", href: "https://example.com", kind: "live" },
      { label: "GitHub", href: "https://example.com", kind: "repo" },
    ],
    blocks: [
      { type: "text", title: "Introduction", body: "Detailed introduction of project four." },
      { type: "bullets", title: "Main Features", items: [
        "Feature A",
        "Feature B",
        "Feature C"
      ]},
      { type: "stack", title: "Used Technologies", items: ["TechA", "TechB", "TechC"] },
      { type: "gallery", title: "Project Images", items: [
        { type: "image", src: "/images/websiteshop.jpeg", alt: "Image one" },
        { type: "image", src: "/images/websiteshop.jpeg", alt: "Image two" }
      ]}
    ],
    size: "normal"
  },
  {
    slug: "apple-vision-app",
    title: "Apple Vision pro VR app",
    short: "Description for project three.",
    cover: "/images/metallic.png",
    hero: { type: "image", src: "/images/metallic.png", alt: "Project three hero" },
    category: "3d",
    tags: ["Tag1", "Tag2"],
    meta: { role: "Role", year: "2024", duration: "3 weeks", team: "Team Name" },
    links: [
      { label: "Live Site", href: "https://example.com", kind: "live" },
      { label: "Repository", href: "https://example.com", kind: "repo" },
    ],
    blocks: [
      { type: "text", title: "Overview", body: "Detailed overview of project three." },
      { type: "bullets", title: "Key Features", items: [
        "Feature one",
        "Feature two",
        "Feature three"
      ]},
      { type: "stack", title: "Technologies Used", items: ["Tech1", "Tech2", "Tech3"] },
      { type: "gallery", title: "Project Screenshots", items: [
        { type: "image", src: "/images/metallic.png", alt: "Screenshot one" },
        { type: "image", src: "/images/metallic.png", alt: "Screenshot two" }
      ]}
    ],
    size: "normal"
  },
  {
    slug: "wedding",
    title: "Wedding Website",
    short: "Netflix-inspired UI with search, trailers & a personal list.",
    cover: "/images/m&l/invitations.jpg",
    hero: { type: "image", src: "/images/m&l/cover.png", alt: "Homepage" },
    category: "design",
    tags: ["Next.js", "TypeScript", "Framer Motion", "TMDB"],
    meta: { role: "Frontend", year: "2026", duration: "2 weeks", team: "Solo" },
    links: [
      { label: "Live Demo", href: "https://your-demo-url.com", kind: "live" },
      { label: "GitHub Repo", href: "https://github.com/leonajosephine/netflix-inspired", kind: "repo" },
    ],
    blocks: [
      { type: "text", title: "Goal", body: "Rebuild a Netflix-like browsing experience with modern transitions and fast navigation." },
      { type: "bullets", title: "Highlights", items: [
        "Trailer modal via TMDB /videos",
        "Search experience with responsive results grid",
        "My List stored in localStorage",
        "Keyboard-friendly interactions"
      ]},
      { type: "stack", title: "Tech Stack", items: ["Next.js (App Router)", "TypeScript", "Framer Motion", "TMDB API"] },
      { type: "gallery", title: "Screens / Interactions", items: [
        { type: "image", src: "/images/netflix_overview.png", alt: "Homepage" },
        { type: "image", src: "/images/netflix_movierow_trends.png", alt: "Trends row design" },
        { type: "image", src: "/images/netflix_moviemodal.png", alt: "Movie detail page" },
        //{ type: "gif", src: "/images/netflix-scroll.gif", alt: "Scroll interaction" }
      ]}
    ],
    size: "tall"
  },
  {
    slug: "eightsquared",
    title: "Eightsquared Website",
    short: "Modern responsive website for an AI Company, showcasing their portfolio and services with a clean, minimalist but also techy aesthetic.",
    cover: "/images/e2/e2_hero.png",
    hero: { type: "image", src: "/images/e2/e2_hero.png", alt: "Project four hero" },
    category: "design",
    tags: ["Next.js", "TypeScript", "Framer Motion", "TMDB"],
    meta: { role: "Frontend", year: "2026", duration: "2 weeks", team: "Solo" },
    links: [
      { label: "Live Demo", href: "https://eightsquared.vercel.app", kind: "live" },
      { label: "GitHub Repo", href: "https://github.com/leonajosephine/netflix-inspired", kind: "repo" },
    ],
    blocks: [
      { type: "text", title: "Goal", body: "Rebuild a Netflix-like browsing experience with modern transitions and fast navigation." },
      { type: "bullets", title: "Highlights", items: [
        "Trailer modal via TMDB /videos",
        "Search experience with responsive results grid",
        "My List stored in localStorage",
        "Keyboard-friendly interactions"
      ]},
      { type: "stack", title: "Tech Stack", items: ["Next.js (App Router)", "TypeScript", "Framer Motion", "TMDB API"] },
      { type: "gallery", title: "Screens / Interactions", items: [
        { type: "image", src: "/images/e2/e2_components.png", alt: "Movie detail page" },
        { type: "image", src: "/images/e2/e2_lightanddark.png", alt: "Trends row design" },
        { type: "image", src: "/images/e2/e2_desktop_dark.png", alt: "Movie detail page" },
        { type: "image", src: "/images/e2/e2_responsive.png", alt: "Homepage" },
        { type: "image", src: "/images/e2/e2_brandIdentity.png", alt: "Movie detail page" },
        { type: "image", src: "/images/e2/e2_showcase.png", alt: "Movie detail page" },
      ]}
    ],
    size: "big"
  },
  {
    slug: "new",
    title: "Design Website & art direction",
    short: "Description for project three.",
    cover: "/images/toDo/cover.png",
    hero: { type: "image", src: "/images/toDo/overview.png", alt: "Project three hero" },
    category: "coding",
    tags: ["Tag1", "Tag2"],
    meta: { role: "Role", year: "2024", duration: "3 weeks", team: "Team Name" },
    links: [
      { label: "Live Site", href: "https://example.com", kind: "live" },
      { label: "Repository", href: "https://example.com", kind: "repo" },
    ],
    blocks: [
      { type: "text", title: "Overview", body: "Detailed overview of project three." },
      { type: "bullets", title: "Key Features", items: [
        "Feature one",
        "Feature two",
        "Feature three"
      ]},
      { type: "stack", title: "Technologies Used", items: ["React", "TypeScript", "Tailwind CSS"] },
      { type: "gallery", title: "Project Screenshots", items: [
        { type: "image", src: "/images/toDo/macBook.png", alt: "Screenshot one" },
        { type: "image", src: "/images/toDo/Board.png", alt: "Screenshot one" },
        { type: "image", src: "/images/toDo/addBoard.png", alt: "Screenshot one" },
        { type: "image", src: "/images/toDo/bg.png", alt: "Screenshot one" },
        { type: "image", src: "/images/toDo/filter.png", alt: "Screenshot two" }

      ]}
    ],
    size: "normal"
  },
  {
    slug: "new 2",
    title: "grafik design website with heavy design and art direction focus",
    short: "Description for project three.",
    cover: "/images/websiteshop.jpeg",
    hero: { type: "image", src: "/images/toDo/overview.png", alt: "Project three hero" },
    category: "coding",
    tags: ["Tag1", "Tag2"],
    meta: { role: "Role", year: "2024", duration: "3 weeks", team: "Team Name" },
    links: [
      { label: "Live Site", href: "https://example.com", kind: "live" },
      { label: "Repository", href: "https://example.com", kind: "repo" },
    ],
    blocks: [
      { type: "text", title: "Overview", body: "Detailed overview of project three." },
      { type: "bullets", title: "Key Features", items: [
        "Feature one",
        "Feature two",
        "Feature three"
      ]},
      { type: "stack", title: "Technologies Used", items: ["React", "TypeScript", "Tailwind CSS"] },
      { type: "gallery", title: "Project Screenshots", items: [
        { type: "image", src: "/images/toDo/macBook.png", alt: "Screenshot one" },
        { type: "image", src: "/images/toDo/Board.png", alt: "Screenshot one" },
        { type: "image", src: "/images/toDo/addBoard.png", alt: "Screenshot one" },
        { type: "image", src: "/images/toDo/bg.png", alt: "Screenshot one" },
        { type: "image", src: "/images/toDo/filter.png", alt: "Screenshot two" }

      ]}
    ],
    size: "normal"
  },
  {
    slug: "aurem",
    title: "Jewelry Brand Website & Art Direction",
    short: "This is for Aurem - a jewelry brand that focuses on creating unique and timeless pieces. The website features a clean and elegant design, showcasing the brand's collections and craftsmanship.",
    cover: "/images/aurem/responsive.png",
    hero: { type: "image", src: "/images/aurem/hero.png", alt: "Project three hero" },
    category: "coding",
    tags: ["Tag1", "Tag2"],
    meta: { role: "Role", year: "2026", duration: "1 week", team: "solo" },
    links: [
      { label: "Case Study", href: "https://your-site.com/case/aurem", kind: "figma" },
      { label: "Demo Site", href: "https://example.com", kind: "live" },
      { label: "Repository", href: "https://example.com", kind: "repo" },
    ],
    blocks: [
      { type: "text", title: "Overview", body: "This Project is about building a brand from sratch to a finished website. This includes: the branding, UX/UI, creative and art direction, webdevelopment." },
      { type: "metrics", title: "Outcome", items: [
        { label: "UI/UX design & Art direction:", value: "Concept and execution of the visual identity" },
        { label: "Frontend", value: "Component-based sections" },
        { label: "Frontend", value: "Component-based sections" }

      ]},
      { type: "bullets", title: "Key Features", items: [
        "• Figma: Branding, UI design, Wireframing",
        "• Art direction: Concept and execution of the visual identity, including the use of colors, typography, and imagery to create a cohesive and compelling brand experience. This included the creation of a photoshoot concept, moodboard and direction for the photography, as well as the selection of models, styling, and locations to ensure that the final AI genrated images aligned with the brand's vision and resonated with the target audience.",
        "• Next.js: Development of a responsive website with a focus on performance and accessibility",
      ]},
      { type: "stack", title: "Technologies Used", items: ["Next.js", "TypeScript", "Tailwind CSS", "AI"] },
      { type: "gallery", title: "Project Screenshots", items: [
        { type: "image", src: "/images/aurem/hero.png", alt: "Screenshot one" },
        { type: "image", src: "/images/aurem/responsive2.png", alt: "Screenshot two" },        { type: "image", src: "/images/aurem/collection.png", alt: "Screenshot three" },
        { type: "image", src: "/images/aurem/collection2.png", alt: "Screenshot three" },
        { type: "image", src: "/images/aurem/pdp1.png", alt: "Screenshot four" },
        { type: "image", src: "/images/aurem/pdp2.png", alt: "Screenshot four" },
        { type: "image", src: "/images/aurem/explore.png", alt: "Screenshot five" },
        { type: "image", src: "/images/aurem/featured.png", alt: "Screenshot six" },
        { type: "image", src: "/images/aurem/campaign.png", alt: "Screenshot six" },
        { type: "image", src: "/images/aurem/editorialSplit.png", alt: "Screenshot six" },
      ]}
    ],
    size: "big"
  },

];
