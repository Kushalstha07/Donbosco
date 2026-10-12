import React, { createContext, useContext, useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  GraduationCap,
  Image as ImageIcon,
  Mail,
  MapPin,
  Phone,
  Play,
  School,
  Search,
  X,
} from "lucide-react";
import content from "./source-content.json";
import NextHome from "./NextHome.jsx";
import PageDepth from "./PageDepth.jsx";
import {
  ProgramPage,
  DonBoscoPage,
  HistoryPage,
  RulesPage,
  SourceDetails,
} from "./CuratedPages.jsx";

const NavigationContext = createContext(() => {});
const bundledImages = import.meta.glob("./assets/images/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
});
const media = (name) => bundledImages[`./assets/images/${name}.webp`];
const official = "https://nepaldonbosco.com";
const annualReport = `${official}/uploads/20230522163707.pdf`;

const groups = [
  {
    label: "About",
    items: [
      ["Don Bosco", "/about/don-bosco", "about-don-bosco"],
      ["Our Story", "/about/history", "facets-of-history"],
      ["Leadership", "/about/leadership", "about-leadership"],
      ["Annual reports", "/about/annual-reports", "annual-reports"],
    ],
  },
  {
    label: "School",
    items: [
      ["Teaching staff", "/school/teaching-staff", "teaching-staff"],
      ["Office staff", "/school/office-staff", "office-staff"],
      ["Supportive staff", "/school/supportive-staff", "supportive-staff"],
      ["School rules", "/school/rules", "school-rules"],
      ["Facilities", "/school/facilities", "facilities"],
      ["School admission", "/school/admission", "school-admission"],
    ],
  },
  {
    label: "+2 Section",
    items: [
      ["Humanities", "/plus-two/humanities", "humanity"],
      ["Science", "/plus-two/science", "science"],
      ["Management", "/plus-two/management", "management"],
      ["Law", "/plus-two/law", "law"],
      ["+2 admission", "/plus-two/admission", "plus-2-section-admission"],
      ["+2 rules", "/plus-two/rules", "plus-2-section-rules"],
    ],
  },
  {
    label: "Gallery",
    items: [
      ["Photo gallery", "/gallery/photos", "image-gallery"],
      ["Video gallery", "/gallery/videos", "video-gallery"],
    ],
  },
];
const directPages = [
  ["Alumni", "/alumni", "alumni"],
  ["Downloads", "/downloads", "downloads"],
  ["Contact", "/contact", "contact"],
];
const allEntries = [
  ...groups.flatMap((group) =>
    group.items.map((item) => ({
      label: item[0],
      path: item[1],
      id: item[2],
      group: group.label,
    })),
  ),
  ...directPages.map((item) => ({
    label: item[0],
    path: item[1],
    id: item[2],
    group: "Explore",
  })),
];
const byPath = Object.fromEntries(allEntries.map((page) => [page.path, page]));
const legacy = Object.fromEntries(
  allEntries
    .filter((page) => page.id !== "annual-reports")
    .map((page) => [`/${page.id}.php`, page.path]),
);
const retiredAboutRoutes = Object.fromEntries(
  [
    ["management-council", "management-council"],
    ["rector-major", "our-rector-major"],
    ["provincial", "our-provincial"],
    ["former-rector", "former-rector"],
    ["former-principal", "former-principal"],
  ].flatMap(([path, id]) => [
    [`/about/${path}`, "/about/leadership"],
    [`/${id}.php`, "/about/leadership"],
  ]),
);
const canonicalPath = (pathname) => {
  const clean = pathname.replace(/\/$/, "") || "/";
  return retiredAboutRoutes[clean] || legacy[clean] || clean;
};

const pageDescriptions = {
  "about-don-bosco":
    "The person, purpose and educational philosophy behind the Salesian tradition.",
  "facets-of-history":
    "The story of Nepal Don Bosco School & College, from its foundation in Siddhipur to today.",
  "about-leadership":
    "The people guiding the school and its place in the wider Salesian family.",
  "annual-reports":
    "School publications and reports available from the official website.",
  "teaching-staff":
    "Meet the teachers and educators named in the school directory.",
  "office-staff": "The people helping our school run day to day.",
  "supportive-staff": "Recognising the staff whose work supports school life.",
  "school-rules":
    "The expectations and routines that help everyone learn and grow well.",
  facilities:
    "Spaces that support academics, practical learning, creativity and community.",
  "school-admission":
    "Information for families exploring admission to the school years.",
  humanity:
    "Explore people, society, ideas and communication through the Humanities stream.",
  science:
    "A foundation in scientific thinking, practical investigation and future study.",
  management:
    "Learn the ideas and skills behind enterprise, commerce and leadership.",
  law: "An introduction to legal thought, systems and practical skills.",
  "plus-2-section-admission":
    "How to take the next step into +2 study at Nepal Don Bosco.",
  "plus-2-section-rules": "Guidelines for students in the +2 section.",
  "image-gallery":
    "A closer look at learning, celebration and everyday life at Don Bosco.",
  "video-gallery": "Stories and events from the school community, on film.",
  alumni:
    "A place for past pupils to stay connected with the Don Bosco community.",
  downloads: "School documents and useful links in one place.",
  contact: "Reach the school office or find us in Siddhipur, Lalitpur.",
};
const pageImages = {
  About: "campus",
  School: "classroom",
  "+2 Section": "science-lab",
  Gallery: "celebration",
  Explore: "campus",
};

function useRoute() {
  const [path, setPath] = useState(() => canonicalPath(window.location.pathname));
  useEffect(() => {
    const onPop = () => {
      const canonical = canonicalPath(window.location.pathname);
      if (window.location.pathname !== canonical)
        window.history.replaceState({}, "", canonical);
      setPath(canonical);
    };
    const canonical = canonicalPath(window.location.pathname);
    if (window.location.pathname !== canonical)
      window.history.replaceState({}, "", canonical);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const navigate = (to) => {
    if (to === path) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.history.pushState({}, "", to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  return [path, navigate];
}
function Link({ to, children, className = "", onClick, ...props }) {
  const navigate = useContext(NavigationContext);
  return (
    <a
      href={to}
      className={className}
      onClick={(event) => {
        if (
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        )
          return;
        event.preventDefault();
        onClick?.();
        navigate(to);
      }}
      {...props}
    >
      {children}
    </a>
  );
}
function Brand({ inverse = false }) {
  return (
    <Link
      to="/"
      className={`brand ${inverse ? "brand-inverse" : ""}`}
      aria-label="Nepal Don Bosco School and College home"
    >
      <span className="brand-mark" aria-hidden="true">
        <span className="brand-mark-inner">DB</span>
      </span>
      <span className="brand-wordmark">
        <strong>Nepal Don Bosco</strong>
        <small>
          School & College <i>•</i> Siddhipur
        </small>
      </span>
    </Link>
  );
}
function Header({ path }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const close = () => {
    setMobileOpen(false);
    setOpenGroup(null);
    setSearchOpen(false);
  };
  useEffect(() => close(), [path]);
  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") close();
      if (
        event.key === "/" &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)
      ) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const results = allEntries
    .filter((page) =>
      `${page.label} ${page.group}`.toLowerCase().includes(query.toLowerCase()),
    )
    .slice(0, 9);
  return (
    <>
      <header className="site-header nx-header">
        <div className="container header-inner">
          <Brand />
          <nav
            className={`main-nav ${mobileOpen ? "is-open" : ""}`}
            aria-label="Main navigation"
            id="main-nav"
          >
            <Link
              to="/"
              className={path === "/" ? "nav-active" : ""}
              onClick={close}
            >
              Home
            </Link>
            {groups.map((group, i) => (
              <div
                className={`nav-group ${openGroup === i ? "group-open" : ""}`}
                key={group.label}
              >
                <button
                  type="button"
                  aria-expanded={openGroup === i}
                  onClick={() => setOpenGroup(openGroup === i ? null : i)}
                >
                  {group.label}
                </button>
                <div className="nav-dropdown">
                  <div className="nx-menu-heading">
                    <span>EXPLORE / {String(i + 1).padStart(2, "0")}</span>
                    <strong>{group.label}</strong>
                    <p>
                      Find the people, places and pathways that make Nepal Don
                      Bosco.
                    </p>
                  </div>
                  <div className="nx-menu-links">
                    {group.items.map(([label, to]) => (
                      <Link to={to} key={to} onClick={close}>
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <Link
              to="/alumni"
              onClick={close}
              className={path === "/alumni" ? "nav-active" : ""}
            >
              Alumni
            </Link>
            <Link
              to="/contact"
              onClick={close}
              className={path === "/contact" ? "nav-active" : ""}
            >
              Contact
            </Link>
            <Link to="/school/admission" className="nav-apply" onClick={close}>
              Admissions
            </Link>
          </nav>
          <button
            className="nx-search-trigger"
            type="button"
            aria-label="Search site"
            onClick={() => setSearchOpen(true)}
          >
            Search
          </button>
          <button
            className="menu-toggle"
            type="button"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-controls="main-nav"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>
      {searchOpen && (
        <div
          className="nx-search-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Search website"
        >
          <div
            className="nx-search-backdrop"
            onClick={() => setSearchOpen(false)}
          />
          <div className="nx-search-panel">
            <div className="nx-search-top">
              <span>FIND YOUR WAY AROUND</span>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                aria-label="Close search"
              >
                Close
              </button>
            </div>
            <label>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, programmes, people..."
                aria-label="Search pages"
              />
            </label>
            <div className="nx-search-results">
              <small>
                {query ? `${results.length} RESULTS` : "POPULAR PAGES"}
              </small>
              {results.length ? (
                results.map((page) => (
                  <Link to={page.path} key={page.path} onClick={close}>
                    <span>{page.group}</span>
                    <strong>{page.label}</strong>
                  </Link>
                ))
              ) : (
                <p>
                  No matching page. Try a different word or contact the school
                  office.
                </p>
              )}
            </div>
            <div className="nx-search-bottom">
              PRESS ESC TO CLOSE <span>·</span> TYPE / TO OPEN SEARCH
            </div>
          </div>
        </div>
      )}
    </>
  );
}
function Home() {
  return <NextHome Link={Link} media={media} />;
}
function PageHero({ page }) {
  const heroPhoto =
    {
      science: "science-lab",
      management: "hospitality",
      humanity: "creative",
      law: "investiture",
    }[page.id] || pageImages[page.group];
  return (
    <section className="page-hero">
      <div className="container page-hero-inner">
        <div className="page-hero-copy" data-reveal>
          <div className="breadcrumbs">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <span>{page.group}</span>
            <ChevronRight size={14} />
            <span>{page.label}</span>
          </div>
          <span className="eyebrow">{page.group} / Nepal Don Bosco</span>
          <h1>{page.label}</h1>
          <p>{pageDescriptions[page.id]}</p>
        </div>
        <div className="page-hero-image" data-reveal>
          <img
            src={media(heroPhoto)}
            alt={`${page.label} at Nepal Don Bosco`}
          />
        </div>
      </div>
    </section>
  );
}
function RenderBlocks({ id }) {
  const blocks = content[id] || [];
  let count = 0;
  return (
    <div className="prose">
      {blocks.map((block, i) => {
        if (block.type === "heading") {
          if (
            !block.text ||
            block.text.toLowerCase() === id.replaceAll("-", " ")
          )
            return null;
          count++;
          return (
            <h2 key={i} id={`section-${count}`}>
              {block.text}
            </h2>
          );
        }
        if (block.type === "paragraph") return <p key={i}>{block.text}</p>;
        if (block.type === "list") {
          const Tag = block.ordered ? "ol" : "ul";
          return (
            <Tag key={i}>
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </Tag>
          );
        }
        if (block.type === "table")
          return (
            <div className="table-scroll" key={i}>
              <table>
                <tbody>
                  {block.rows.map((row, j) => (
                    <tr key={j}>
                      {row.map((cell, k) =>
                        j === 0 ? (
                          <th key={k}>{cell}</th>
                        ) : (
                          <td key={k}>{cell}</td>
                        ),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        return null;
      })}
    </div>
  );
}
function GenericPage({ page, children }) {
  return (
    <main>
      <PageHero page={page} />
      <section className="inner-section">
        <div className="container inner-grid">
          <article className="page-content" data-reveal>
            {children || <RenderBlocks id={page.id} />}
          </article>
        </div>
      </section>
      <PageDepth id={page.id} media={media} />
      <Related page={page} />
    </main>
  );
}
function Related({ page }) {
  const group = groups.find((g) => g.label === page.group);
  const options = (group?.items || directPages)
    .filter((item) => item[1] !== page.path)
    .slice(0, 3);
  return (
    <section className="related-section">
      <div className="container">
        <div className="related-head">
          <div>
            <span className="eyebrow">Continue exploring</span>
            <h2>Explore more at Don Bosco.</h2>
          </div>
          <Link to="/contact" className="text-action">
            Have a question? <ArrowUpRight size={17} />
          </Link>
        </div>
        <div className="related-grid">
          {options.map(([label, to], i) => (
            <Link to={to} key={to}>
              <span>0{i + 1}</span>
              <strong>{label}</strong>
              <ArrowUpRight size={20} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
function StaffPage({ page }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const rows =
    (content[page.id] || [])
      .find((block) => block.type === "table")
      ?.rows.slice(1)
      .filter((row) => row[1]) || [];
  const filters =
    page.id === "teaching-staff"
      ? ["All", "Primary", "Secondary", "Leadership"]
      : ["All"];
  const filtered = rows.filter((row) => {
    const role = row[2] || "";
    return (
      (filter === "All" ||
        (filter === "Leadership"
          ? /rector|principal|administrator/i.test(role)
          : role.toLowerCase().includes(filter.toLowerCase()))) &&
      `${row[1]} ${role}`.toLowerCase().includes(query.toLowerCase())
    );
  });
  return (
    <GenericPage page={page}>
      <div className="cv-directory-head">
        <div>
          <span className="cv-index">THE PEOPLE OF DON BOSCO</span>
          <h2>Meet the team behind the school.</h2>
          <p>
            Find a person by name or role. This directory follows the current
            school website and should be confirmed before official publication.
          </p>
        </div>
        <strong>
          {String(rows.length).padStart(2, "0")}
          <span>PEOPLE LISTED</span>
        </strong>
      </div>
      <div className="cv-directory-tools">
        <label>
          <Search size={19} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or role"
            aria-label="Search staff"
          />
        </label>
        <div>
          {filters.map((item) => (
            <button
              type="button"
              key={item}
              className={filter === item ? "active" : ""}
              aria-pressed={filter === item}
              onClick={() => setFilter(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <p className="cv-result-count">
        SHOWING {filtered.length} OF {rows.length}
      </p>
      <div className="cv-directory-grid">
        {filtered.map((row, i) => (
          <article key={`${row[1]}-${i}`}>
            <div className="cv-person-mark">
              {row[1]
                .replace(/^(Mr\.?|Mrs\.?|Ms\.?|Fr\.?|Miss)\s*/i, "")
                .split(/\s+/)
                .slice(0, 2)
                .map((part) => part[0])
                .join("")
                .toUpperCase()}
            </div>
            <div>
              <h3>{row[1]}</h3>
              <p>{row[2] || "School staff"}</p>
            </div>
            <span>{String(i + 1).padStart(2, "0")}</span>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <div className="cv-empty">
          No matching staff member. Try another search or filter.
        </div>
      )}
    </GenericPage>
  );
}
const facilityTopics = [
  {
    name: "The campus",
    photo: "campus",
    label: "A PLACE TO BELONG",
    description:
      "A shared setting for learning, friendship and the many moments that shape a school day.",
  },
  {
    name: "Learning spaces",
    photo: "science-lab",
    label: "LEARN BY DOING",
    description:
      "Practical work helps students test ideas and turn curiosity into understanding.",
  },
  {
    name: "Creative spaces",
    photo: "creative",
    label: "ROOM TO EXPRESS",
    description:
      "Making, performing and experimenting are part of a full education.",
  },
  {
    name: "Sport & activity",
    photo: "sports",
    label: "MOVE TOGETHER",
    description: "Games and activities make room for teamwork, effort and joy.",
  },
];
function FacilitiesPage({ page }) {
  const [active, setActive] = useState(0);
  const item = facilityTopics[active];
  return (
    <GenericPage page={page}>
      <div className="cv-facility-head">
        <span className="cv-index">THE CAMPUS EXPERIENCE</span>
        <h2>Every space has a part to play.</h2>
        <p>
          From the classroom to practical work and shared activity, school life
          happens across the whole campus.
        </p>
      </div>
      <div className="cv-facility-explorer">
        <div className="cv-facility-tabs">
          {facilityTopics.map((topic, i) => (
            <button
              type="button"
              key={topic.name}
              className={active === i ? "active" : ""}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
            >
              <span>0{i + 1}</span>
              <strong>{topic.name}</strong>
              <ArrowUpRight size={19} />
            </button>
          ))}
        </div>
        <div className="cv-facility-stage" key={item.photo}>
          <img src={media(item.photo)} alt={item.name} />
          <div>
            <span>{item.label}</span>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
        </div>
      </div>
      <div className="cv-facility-secondary">
        <img
          src={media("hotel-class")}
          alt="Students in a practical hospitality lesson"
        />
        <div>
          <span className="cv-section-label">PRACTICAL LEARNING</span>
          <h3>Ideas come alive in practice.</h3>
          <p>
            The school highlights laboratories and practical facilities that
            help students apply what they study.
          </p>
          <Link to="/plus-two/management" className="cv-action">
            Explore the pathways <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </GenericPage>
  );
}
const galleryImages = [
  ["campus", "The campus"],
  ["student-life", "School life"],
  ["science-lab", "Science lab"],
  ["sports", "Sport"],
  ["celebration", "Celebration"],
  ["creative", "Creative learning"],
  ["investiture", "Student leadership"],
  ["hospitality", "Practical learning"],
  ["community", "Our community"],
  ["school-event", "School event"],
  ["classroom", "In the classroom"],
  ["hotel-class", "Hospitality class"],
];
const albums = [
  {
    slug: "class-5-speech",
    title: "Class 5 Inter House Speech Competition 2082",
    photos: [],
  },
  { slug: "past-pupils", title: "Past Pupils", photos: [] },
  { slug: "former-salesians", title: "Former Salesians at NDBS", photos: [] },
  { slug: "former-rectors", title: "Former Rectors", photos: [] },
  { slug: "former-principals", title: "Former Principals", photos: [] },
  {
    slug: "ndbs-gallery",
    title: "NDBS Gallery",
    photos: galleryImages.slice(0, 11),
  },
  { slug: "sports", title: "Sports", photos: [galleryImages[3]] },
  { slug: "school-events", title: "School Events", photos: [] },
  {
    slug: "donbosco-gallery",
    title: "Donbosco Gallery",
    photos: [galleryImages[1]],
  },
];
function GalleryPage({ page, album }) {
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    const esc = (e) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);
  const photos = album?.photos || galleryImages;
  return (
    <GenericPage page={page}>
      <div className="content-intro">
        <span className="eyebrow">Photo gallery</span>
        <h2>{album ? album.title : "Moments from our community."}</h2>
        <p>
          {album
            ? `${album.photos.length} photo${album.photos.length === 1 ? "" : "s"} in this album on the current school website.`
            : "Browse the album categories published by the school, or explore a collection of photos from across campus life."}
        </p>
      </div>
      {album ? (
        <>
          <Link to="/gallery/photos" className="text-action gallery-back">
            <ChevronLeft size={17} /> All albums
          </Link>
          {photos.length ? (
            <div className="gallery-grid">
              {photos.map(([photo, label], i) => (
                <button
                  className="gallery-item"
                  type="button"
                  key={photo}
                  onClick={() => setSelected(i)}
                  aria-label={`View ${label} photo`}
                >
                  <img src={media(photo)} alt={label} loading="lazy" />
                  <span>
                    {label}
                    <ArrowUpRight size={16} />
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="gallery-empty">
              <ImageIcon size={30} />
              <h3>No photos published yet</h3>
              <p>
                The current school website lists this album without photos.
                Explore another album or check back with the school.
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="album-grid">
            {albums.map((item, i) => (
              <Link
                to={`/gallery/photos/${item.slug}`}
                className="album-card"
                key={item.slug}
              >
                <img
                  src={media(
                    item.photos[0]?.[0] ||
                      galleryImages[i % galleryImages.length][0],
                  )}
                  alt=""
                  loading="lazy"
                />
                <span>
                  {item.photos.length} photo
                  {item.photos.length === 1 ? "" : "s"}
                </span>
                <strong>{item.title}</strong>
                <ArrowUpRight size={18} />
              </Link>
            ))}
          </div>
          <h3 className="gallery-subhead">A glimpse of school life</h3>
          <div className="gallery-grid">
            {galleryImages.slice(0, 6).map(([photo, label], i) => (
              <button
                className="gallery-item"
                type="button"
                key={photo}
                onClick={() => setSelected(i)}
                aria-label={`View ${label} photo`}
              >
                <img src={media(photo)} alt={label} loading="lazy" />
                <span>
                  {label}
                  <ArrowUpRight size={16} />
                </span>
              </button>
            ))}
          </div>
        </>
      )}
      {selected !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setSelected(null)}
        >
          <button
            className="lightbox-close"
            onClick={() => setSelected(null)}
            aria-label="Close photo"
          >
            <X size={24} />
          </button>
          <button
            className="lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              setSelected((selected - 1 + photos.length) % photos.length);
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft size={30} />
          </button>
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={media(photos[selected][0])} alt={photos[selected][1]} />
            <figcaption>
              {photos[selected][1]} · {selected + 1} / {photos.length}
            </figcaption>
          </figure>
          <button
            className="lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              setSelected((selected + 1) % photos.length);
            }}
            aria-label="Next photo"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      )}
    </GenericPage>
  );
}
const videos = [
  ["NEPAL DON BOSCO SCHOOL SIDDHIPUR", "epwLbn6fPn0"],
  ["Parents Day", "mUZNHnrssF4"],
  ["Parents Day", "pk502s4s2M4"],
  ["Mass Communication Practical", "74yk_AQUEDk"],
  ["Bosco Beat 2074", "qRfL-j0wT5c"],
  ["Bosco Beat 2074", "5m0FEe6xJ1s"],
  ["Hotel Management Practical", "ay1lCZ_1lDI"],
  ["Fun Moments", "B5o-sqblCBQ"],
  ["Gratitude Day", "xe2mbQDWhqc"],
  ["Rector Major visits Nepal Don Bosco", "8A7GnwxyISI"],
];
function VideoPage({ page }) {
  return (
    <GenericPage page={page}>
      <div className="content-intro">
        <span className="eyebrow">Video gallery</span>
        <h2>Stories in motion.</h2>
        <p>
          Watch school events and student experiences published on the current
          website.
        </p>
      </div>
      <div className="video-grid">
        {videos.map(([title, id], i) => (
          <a
            href={`https://www.youtube.com/watch?v=${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="video-card"
            key={`${id}-${i}`}
          >
            <div className="video-thumb">
              <img
                src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                alt=""
                loading="lazy"
              />
              <span>
                <Play fill="currentColor" size={20} />
              </span>
            </div>
            <div>
              <small>VIDEO / {String(i + 1).padStart(2, "0")}</small>
              <h3>{title}</h3>
              <ExternalLink size={17} />
            </div>
          </a>
        ))}
      </div>
    </GenericPage>
  );
}
function AdmissionsPage({ page, plusTwo = false }) {
  const [active, setActive] = useState(0);
  const steps = plusTwo
    ? [
        {
          title: "Explore a pathway",
          copy: "Start with the stream that fits your interests: Science, Management, Humanities or Law.",
          action: "Compare +2 streams",
          to: "/plus-two/science",
          image: "science-lab",
        },
        {
          title: "Get the current details",
          copy: "Confirm this intake’s entry requirements, dates, fees and scholarship information with the school office.",
          action: "Contact the office",
          to: "/contact",
          image: "campus",
        },
        {
          title: "Apply & meet the school",
          copy: "The current site describes an application, entrance test and interview process. The school can guide you through the latest steps.",
          action: "Open the official application",
          external: `${official}/admission/admission_form_senior_class.php`,
          image: "student-life",
        },
      ]
    : [
        {
          title: "Enquire about a place",
          copy: "The school shares current vacancies and admission dates through its office and notice board.",
          action: "Contact the office",
          to: "/contact",
          image: "student-life",
        },
        {
          title: "Collect an application",
          copy: "Ask the school office for the correct form and a list of documents for your child’s class.",
          action: "Call the school",
          external: "tel:+97715709283",
          image: "campus",
        },
        {
          title: "Complete the process",
          copy: "The school will explain any assessment, document review and final admission steps.",
          action: "View school rules",
          to: "/school/rules",
          image: "classroom",
        },
      ];
  const step = steps[active];
  return (
    <GenericPage page={page}>
      <div className="cv-admission-head">
        <div>
          <span className="cv-index">YOUR JOURNEY STARTS HERE</span>
          <h2>Let's make the next step simple.</h2>
          <p>
            Choose the admission route that fits your family, then walk through
            the process. The school office can confirm all current details.
          </p>
        </div>
        <div className="cv-admission-switch">
          <Link to="/school/admission" className={!plusTwo ? "active" : ""}>
            School years <ArrowUpRight size={16} />
          </Link>
          <Link to="/plus-two/admission" className={plusTwo ? "active" : ""}>
            +2 section <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
      <div className="cv-admission-explorer">
        <div className="cv-admission-steps">
          {steps.map((item, i) => (
            <button
              type="button"
              key={item.title}
              className={active === i ? "active" : ""}
              aria-pressed={active === i}
              onClick={() => setActive(i)}
            >
              <span>0{i + 1}</span>
              <strong>{item.title}</strong>
              <ArrowRight size={18} />
            </button>
          ))}
        </div>
        <div className="cv-admission-detail" key={active}>
          <div>
            <span>STEP 0{active + 1} / 03</span>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
            {step.to ? (
              <Link to={step.to} className="cv-action">
                {step.action} <ArrowUpRight size={17} />
              </Link>
            ) : (
              <a
                href={step.external}
                className="cv-action"
                target={step.external.startsWith("http") ? "_blank" : undefined}
                rel={
                  step.external.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
              >
                {step.action} <ArrowUpRight size={17} />
              </a>
            )}
          </div>
          <img src={media(step.image)} alt="Nepal Don Bosco school life" />
        </div>
      </div>
      <div className="cv-admission-contact">
        <div>
          <span className="cv-section-label">QUESTIONS ARE WELCOME</span>
          <h3>Talk to a real person.</h3>
          <p>
            For current intake dates, requirements and scholarships, contact the
            school directly.
          </p>
        </div>
        <a href="tel:+97715709283">
          01-5709283 <ArrowUpRight size={19} />
        </a>
      </div>
      <SourceDetails id={page.id} RenderBlocks={RenderBlocks} />
    </GenericPage>
  );
}
function ContactPage({ page }) {
  return (
    <GenericPage page={page}>
      <div className="content-intro">
        <span className="eyebrow">Contact us</span>
        <h2>We would be glad to hear from you.</h2>
        <p>
          Reach the school office for admissions, school information and general
          enquiries.
        </p>
      </div>
      <div className="contact-grid">
        <a href="tel:+97715709283">
          <Phone size={25} />
          <span>Call us</span>
          <strong>
            01-5709283
            <br />
            01-5709395
          </strong>
          <ArrowUpRight size={18} />
        </a>
        <a href="mailto:ndbssiddhipur@gmail.com">
          <Mail size={25} />
          <span>Email us</span>
          <strong>
            ndbssiddhipur
            <br />
            @gmail.com
          </strong>
          <ArrowUpRight size={18} />
        </a>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Nepal+Don+Bosco+School+Siddhipur+Lalitpur"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MapPin size={25} />
          <span>Visit us</span>
          <strong>
            Mahalaxmi-6, Siddhipur
            <br />
            Lalitpur, Nepal
          </strong>
          <ArrowUpRight size={18} />
        </a>
      </div>
      <div className="map-panel">
        <img src={media("campus")} alt="Nepal Don Bosco School campus" />
        <div>
          <span className="eyebrow">Find your way</span>
          <h3>Come to Siddhipur.</h3>
          <p>
            Open directions to Nepal Don Bosco School & College in your maps
            app.
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Nepal+Don+Bosco+School+Siddhipur+Lalitpur"
            target="_blank"
            rel="noopener noreferrer"
            className="text-action"
          >
            Get directions <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </GenericPage>
  );
}
function DownloadsPage({ page, report = false }) {
  return (
    <GenericPage page={page}>
      <div className="content-intro">
        <span className="eyebrow">Publications & resources</span>
        <h2>{report ? "Annual reports." : "Useful school links."}</h2>
        <p>
          {report
            ? "The current website links to the publication below."
            : "The existing Downloads page has no documents listed. Here are the available school resources and admissions pages."}
        </p>
      </div>
      <div className="download-list">
        <a href={annualReport} target="_blank" rel="noopener noreferrer">
          <span className="download-icon">
            <Download size={23} />
          </span>
          <span>
            <strong>Annual report</strong>
            <small>PDF · Hosted on the official school website</small>
          </span>
          <ArrowUpRight size={19} />
        </a>
        {!report && (
          <>
            <Link to="/school/admission">
              <span className="download-icon">
                <School size={23} />
              </span>
              <span>
                <strong>School admission information</strong>
                <small>View the admissions page</small>
              </span>
              <ArrowRight size={19} />
            </Link>
            <Link to="/plus-two/admission">
              <span className="download-icon">
                <GraduationCap size={23} />
              </span>
              <span>
                <strong>+2 admission information</strong>
                <small>View the +2 admissions page</small>
              </span>
              <ArrowRight size={19} />
            </Link>
          </>
        )}
      </div>
    </GenericPage>
  );
}
function AlumniPage({ page }) {
  return (
    <GenericPage page={page}>
      <div className="content-intro">
        <span className="eyebrow">Past pupils</span>
        <h2>The Don Bosco connection continues.</h2>
        <p>
          School may end, but the people, memories and values stay with us. Past
          pupils who wish to reconnect with Nepal Don Bosco can contact the
          school office.
        </p>
      </div>
      <div className="alumni-panel">
        <img src={media("community")} alt="Nepal Don Bosco community" />
        <div>
          <span className="eyebrow">Stay connected</span>
          <h3>Once Don Bosco, always part of the story.</h3>
          <p>
            Share your story or ask about past pupil activities through the
            school office.
          </p>
          <Link to="/contact" className="button button-primary">
            Contact the school <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </GenericPage>
  );
}
function AboutLeadershipPage({ page }) {
  const readPeople = (id) => {
    const blocks = content[id] || [];
    return blocks.flatMap((block, index) =>
      block.type === "heading" && block.text?.toLowerCase() !== "sample"
        ? [{ name: block.text, role: blocks[index + 1]?.type === "paragraph" ? blocks[index + 1].text : "" }]
        : [],
    );
  };
  const council = readPeople("management-council");
  const former = [
    ...readPeople("former-rector").map((person) => ({ ...person, title: "Former Rector" })),
    ...readPeople("former-principal").map((person) => ({ ...person, title: "Former Principal" })),
  ];
  const salesianLeaders = [
    {
      name: "Fr. Fabio Attard SDB",
      role: "Rector Major of the Salesians of Don Bosco",
      description: "The 11th successor of Don Bosco, guiding the worldwide Salesian congregation and its mission of accompanying young people.",
    },
    {
      name: "Fr. Sunil Kerketta SDB",
      role: "Provincial of the Salesian Province of Kolkata",
      description: "Installed as the 18th Provincial of Kolkata on 8 February 2026. The province serves communities across India, Bangladesh and Nepal.",
    },
  ];
  const announcement = "https://donboscosouthasia.org/News-Info?id=12033&title=Fr.-Sunil-Kerketta-Installed-as-18th-Provincial-of-Kolkata-Salesians";
  return (
    <GenericPage page={page}>
      <div className="about-lead-intro">
        <div>
          <span className="cv-index">ONE SCHOOL, A WIDER SALESIAN FAMILY</span>
          <h2>People who guide our community.</h2>
          <p>School leadership, Salesian guidance and the service of those who came before all contribute to the story of Nepal Don Bosco.</p>
        </div>
        <img src={media("community")} alt="Nepal Don Bosco school community together" />
      </div>
      <section className="about-lead-section" aria-labelledby="school-leaders-heading">
        <div className="about-lead-section-head"><span className="cv-index">01 / AT THE SCHOOL</span><h2 id="school-leaders-heading">School leadership</h2><p>The management council named in the school's published directory.</p></div>
        <div className="about-lead-grid">
          {council.map((person) => <article className="about-lead-card" key={person.name}><span>NEPAL DON BOSCO</span><h3>{person.name}</h3><p>{person.role}</p></article>)}
        </div>
      </section>
      <section className="about-lead-section" aria-labelledby="salesian-leaders-heading">
        <div className="about-lead-section-head"><span className="cv-index">02 / THE SALESIAN FAMILY</span><h2 id="salesian-leaders-heading">Wider leadership</h2><p>The worldwide congregation and the Kolkata province connect our school to a much broader educational mission.</p></div>
        <div className="about-lead-grid about-lead-grid-two">
          {salesianLeaders.map((person) => <article className="about-lead-card" key={person.name}><span>{person.role}</span><h3>{person.name}</h3><p>{person.description}</p></article>)}
        </div>
        <a href={announcement} target="_blank" rel="noopener noreferrer" className="text-action">Read the Salesian announcement</a>
      </section>
      <section className="about-lead-section" aria-labelledby="former-leaders-heading">
        <div className="about-lead-section-head"><span className="cv-index">03 / WITH GRATITUDE</span><h2 id="former-leaders-heading">Former leaders</h2><p>Recognising people whose service helped shape the school.</p></div>
        <div className="about-lead-grid about-lead-grid-two">
          {former.map((person) => <article className="about-lead-card" key={person.name}><span>{person.title}</span><h3>{person.name}</h3><p>{person.role}</p></article>)}
        </div>
      </section>
      <p className="about-lead-note">Names and roles are adapted from published school and Salesian sources; please confirm current appointments with the school.</p>
    </GenericPage>
  );
}
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-about">
            <Brand inverse />
            <p>
              A Salesian learning community in Siddhipur, Lalitpur, caring for
              the whole person since 2002.
            </p>
            <div className="footer-social">
              <a href="tel:+97715709283" aria-label="Call school">
                Call
              </a>
              <a
                href="mailto:ndbssiddhipur@gmail.com"
                aria-label="Email school"
              >
                Email
              </a>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Nepal+Don+Bosco+School+Siddhipur+Lalitpur"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Find school"
              >
                Directions
              </a>
            </div>
          </div>
          <div className="footer-nav">
            {groups.map((group) => (
              <div key={group.label}>
                <h3>{group.label}</h3>
                {group.items.map(([label, to]) => (
                  <Link to={to} key={to}>
                    {label}
                  </Link>
                ))}
              </div>
            ))}
            <div>
              <h3>Connect</h3>
              {directPages.map(([label, to]) => (
                <Link to={to} key={to}>
                  {label}
                </Link>
              ))}
              <a href={official} target="_blank" rel="noopener noreferrer">
                Current website
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Nepal Don Bosco School & College ·
            Redesign concept
          </span>
          <span>
            Content adapted from the{" "}
            <a href={official} target="_blank" rel="noopener noreferrer">
              current school website
            </a>
            ; verify before publication.
          </span>
        </div>
      </div>
    </footer>
  );
}
function NotFound() {
  return (
    <main className="not-found container">
      <span className="eyebrow">404 / Page not found</span>
      <h1>Let's get you back on track.</h1>
      <p>The page you requested isn't here.</p>
      <Link to="/" className="button button-primary">
        Return home <ArrowRight size={18} />
      </Link>
    </main>
  );
}
export default function App() {
  const [path, navigate] = useRoute();
  const selectedAlbum = path.startsWith("/gallery/photos/")
    ? albums.find((item) => `/gallery/photos/${item.slug}` === path)
    : null;
  const page = selectedAlbum
    ? { ...byPath["/gallery/photos"], label: selectedAlbum.title, path }
    : byPath[path];
  useEffect(() => {
    document.title = page
      ? `${page.label} | Nepal Don Bosco School & College`
      : path === "/"
        ? "Nepal Don Bosco School & College | Siddhipur"
        : "Page not found | Nepal Don Bosco";
    const elements = document.querySelectorAll("[data-reveal]");
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.06, rootMargin: "0px 0px -30px 0px" },
    );
    elements.forEach((element) => {
      element.classList.add("reveal-ready");
      observer.observe(element);
    });
    return () => observer.disconnect();
  }, [path]);
  const renderPage = () => {
    if (path === "/") return <Home />;
    if (!page) return <NotFound />;
    if (
      ["teaching-staff", "office-staff", "supportive-staff"].includes(page.id)
    )
      return <StaffPage page={page} />;
    if (page.id === "facilities") return <FacilitiesPage page={page} />;
    if (["science", "management", "humanity", "law"].includes(page.id))
      return (
        <ProgramPage
          page={page}
          GenericPage={GenericPage}
          Link={Link}
          media={media}
          RenderBlocks={RenderBlocks}
        />
      );
    if (page.id === "about-don-bosco")
      return (
        <DonBoscoPage
          page={page}
          GenericPage={GenericPage}
          Link={Link}
          media={media}
          RenderBlocks={RenderBlocks}
        />
      );
    if (page.id === "facets-of-history")
      return (
        <HistoryPage
          page={page}
          GenericPage={GenericPage}
          Link={Link}
          media={media}
          RenderBlocks={RenderBlocks}
        />
      );
    if (["school-rules", "plus-2-section-rules"].includes(page.id))
      return (
        <RulesPage page={page} GenericPage={GenericPage} content={content} />
      );
    if (page.id === "image-gallery")
      return <GalleryPage page={page} album={selectedAlbum} />;
    if (page.id === "video-gallery") return <VideoPage page={page} />;
    if (
      page.id === "school-admission" ||
      page.id === "plus-2-section-admission"
    )
      return (
        <AdmissionsPage
          page={page}
          plusTwo={page.id === "plus-2-section-admission"}
        />
      );
    if (page.id === "contact") return <ContactPage page={page} />;
    if (page.id === "downloads" || page.id === "annual-reports")
      return (
        <DownloadsPage page={page} report={page.id === "annual-reports"} />
      );
    if (page.id === "alumni") return <AlumniPage page={page} />;
    if (page.id === "about-leadership")
      return <AboutLeadershipPage page={page} />;
    return <GenericPage page={page} />;
  };
  return (
    <NavigationContext.Provider value={navigate}>
      <Header path={path} />
      {renderPage()}
      <Footer />
    </NavigationContext.Provider>
  );
}
