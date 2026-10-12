import React, { useRef, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Heart,
  Sparkles,
} from "lucide-react";

const stories = [
  {
    image: "hero",
    kicker: "A place to belong",
    title: "Confidence starts with being seen.",
    alt: "Students smiling together at Nepal Don Bosco",
  },
  {
    image: "science-lab",
    kicker: "A place to discover",
    title: "Questions become possibilities.",
    alt: "Students exploring a science practical",
  },
  {
    image: "community",
    kicker: "A place to grow",
    title: "We learn better together.",
    alt: "Students walking through the school courtyard",
  },
];
const pathways = [
  {
    name: "School",
    number: "01",
    lead: "Build a strong beginning.",
    copy: "A broad English-medium education that gives children the confidence to think, create, play and care for others.",
    subjects: ["Academic foundations", "Creative learning", "Sport & culture"],
    image: "student-life",
    url: "/school/admission",
  },
  {
    name: "Science",
    number: "02",
    lead: "Ask better questions.",
    copy: "Study Physics, Chemistry and Mathematics alongside Biology or Computer Science, supported by practical work in the labs.",
    subjects: ["Physics", "Chemistry", "Biology", "Computer Science"],
    image: "science-lab",
    url: "/plus-two/science",
  },
  {
    name: "Management",
    number: "03",
    lead: "Make ideas work.",
    copy: "Explore business, accounting and economics, with choices that connect classroom thinking to the real world.",
    subjects: [
      "Accounting",
      "Economics",
      "Business Studies",
      "Hotel Management",
    ],
    image: "hospitality",
    url: "/plus-two/management",
  },
  {
    name: "Humanities",
    number: "04",
    lead: "Understand people.",
    copy: "Look at society, media and communication from different perspectives while building a strong foundation for further study.",
    subjects: ["Mass Communication", "Sociology", "Social Studies"],
    image: "creative",
    url: "/plus-two/humanities",
  },
  {
    name: "Law",
    number: "05",
    lead: "Find your voice.",
    copy: "Begin to understand legal thought and practice through study, discussion and applied experiences.",
    subjects: ["Legal theory", "Constitutional law", "Legal drafting"],
    image: "investiture",
    url: "/plus-two/law",
  },
];
const values = [
  {
    number: "01",
    title: "Reason",
    icon: Compass,
    copy: "We help young people think clearly, ask questions and understand the world they are entering.",
  },
  {
    number: "02",
    title: "Faith & values",
    icon: Sparkles,
    copy: "We make room for reflection, integrity and a sense of responsibility towards others.",
  },
  {
    number: "03",
    title: "Loving kindness",
    icon: Heart,
    copy: "A caring relationship is the foundation of learning. Every student deserves to feel known and supported.",
  },
];
const gallery = [
  ["science-lab", "Learning by doing"],
  ["sports", "Showing up for the team"],
  ["celebration", "Moments worth sharing"],
  ["creative", "Making and imagining"],
  ["school-event", "Taking the stage"],
];

export default function NextHome({ Link, media }) {
  const [story, setStory] = useState(0);
  const [pathway, setPathway] = useState(0);
  const [value, setValue] = useState(0);
  const rail = useRef(null);
  const activePath = pathways[pathway];
  return (
    <main className="nx-home">
      <section className="nx-hero" aria-labelledby="nx-hero-title">
        <div className="nx-hero-grid container">
          <div className="nx-hero-copy" data-reveal>
            <span className="nx-kicker">
              <span /> NEPAL DON BOSCO · SIDDHIPUR
            </span>
            <h1 id="nx-hero-title">
              A school for
              <br />
              the lives <em>they’ll lead.</em>
            </h1>
            <p>
              We believe a great education opens more than doors. It helps young
              people become curious thinkers, kind neighbours and confident
              versions of themselves.
            </p>
            <div className="nx-actions">
              <Link to="/about/history" className="nx-button nx-button-lime">
                Explore our school <ArrowUpRight size={18} />
              </Link>
              <Link to="/school/admission" className="nx-hero-link">
                Admissions <ArrowRight size={17} />
              </Link>
            </div>
            <div className="nx-hero-lower">
              <span>SCROLL TO DISCOVER</span>
              <ArrowDown size={18} />
            </div>
          </div>
          <div className="nx-hero-art" data-reveal>
            <div className="nx-photo-stage">
              {stories.map((item, i) => (
                <img
                  key={item.image}
                  className={story === i ? "is-current" : ""}
                  src={media(item.image)}
                  alt={item.alt}
                />
              ))}
              <div className="nx-photo-label">
                <small>{stories[story].kicker}</small>
                <strong>{stories[story].title}</strong>
              </div>
            </div>
            <div className="nx-story-select" aria-label="Choose a school story">
              {stories.map((item, i) => (
                <button
                  key={item.image}
                  type="button"
                  className={story === i ? "active" : ""}
                  aria-label={`Show story ${i + 1}: ${item.kicker}`}
                  aria-pressed={story === i}
                  onClick={() => setStory(i)}
                >
                  <span>0{i + 1}</span>
                  <i />
                </button>
              ))}
            </div>
            <div className="nx-orbit-badge" aria-hidden="true">
              <span>EST. 2002</span>
              <strong>DB</strong>
              <span>NEPAL</span>
            </div>
          </div>
        </div>
      </section>

      <div className="nx-proof">
        <div className="container nx-proof-inner">
          <span>ROOTED IN THE SALESIAN TRADITION</span>
          <span className="nx-proof-divider" />
          <strong>
            School years <i>→</i> +2 pathways
          </strong>
          <span className="nx-proof-divider" />
          <span>MAHALAXMI-6, LALITPUR</span>
        </div>
      </div>

      <section className="nx-intro nx-section">
        <div className="container nx-intro-grid">
          <div data-reveal>
            <span className="nx-overline">01 / THE IDEA</span>
            <h2>
              More than what a student knows. <em>Who they become.</em>
            </h2>
          </div>
          <div className="nx-intro-side" data-reveal>
            <p>
              At Don Bosco, we take the whole person seriously. Lessons matter.
              So do friendships, questions, responsibility, sport, service and
              the quiet confidence that comes from being encouraged.
            </p>
            <Link to="/about/don-bosco" className="nx-text-link">
              The Don Bosco approach <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      <section className="nx-pathways nx-section" id="pathways">
        <div className="container">
          <div className="nx-section-top" data-reveal>
            <div>
              <span className="nx-overline">02 / FIND YOUR DIRECTION</span>
              <h2>
                There is more than <em>one way forward.</em>
              </h2>
            </div>
            <p>
              Explore the school years and four +2 streams. Each pathway has
              room for what makes you curious.
            </p>
          </div>
          <div className="nx-explorer" data-reveal>
            <div
              className="nx-path-tabs"
              role="tablist"
              aria-label="Academic pathways"
            >
              {pathways.map((item, i) => (
                <button
                  key={item.name}
                  id={`nx-path-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={pathway === i}
                  aria-controls="nx-path-panel"
                  tabIndex={pathway === i ? 0 : -1}
                  className={pathway === i ? "active" : ""}
                  onClick={() => setPathway(i)}
                  onKeyDown={(e) => {
                    let n = i;
                    if (e.key === "ArrowDown" || e.key === "ArrowRight")
                      n = (i + 1) % pathways.length;
                    else if (e.key === "ArrowUp" || e.key === "ArrowLeft")
                      n = (i - 1 + pathways.length) % pathways.length;
                    else return;
                    e.preventDefault();
                    setPathway(n);
                    document.getElementById(`nx-path-tab-${n}`)?.focus();
                  }}
                >
                  <span>{item.number}</span>
                  <strong>{item.name}</strong>
                  <ArrowUpRight size={18} />
                </button>
              ))}
            </div>
            <div
              className="nx-path-panel"
              id="nx-path-panel"
              role="tabpanel"
              aria-labelledby={`nx-path-tab-${pathway}`}
              key={activePath.name}
            >
              <div className="nx-path-photo">
                <img
                  src={media(activePath.image)}
                  alt={`${activePath.name} students at Nepal Don Bosco`}
                />
              </div>
              <div className="nx-path-copy">
                <span className="nx-overline">
                  {activePath.number} / {activePath.name.toUpperCase()}
                </span>
                <h3>{activePath.lead}</h3>
                <p>{activePath.copy}</p>
                <div className="nx-tags">
                  {activePath.subjects.map((subject) => (
                    <span key={subject}>{subject}</span>
                  ))}
                </div>
                <Link to={activePath.url} className="nx-text-link">
                  Explore {activePath.name} <ArrowUpRight size={17} />
                </Link>
              </div>
            </div>
          </div>
          <p className="nx-note">
            Course combinations and entry criteria can change. Confirm current
            details with the school office.
          </p>
        </div>
      </section>

      <section className="nx-photo-break" aria-label="School life">
        <div className="nx-break-photo">
          <img
            src={media("community")}
            alt="Students and families sharing a moment at Nepal Don Bosco"
            loading="lazy"
          />
        </div>
        <div className="nx-break-panel">
          <span className="nx-overline">BEYOND THE CLASSROOM</span>
          <h2>
            The moments in between <em>make the difference.</em>
          </h2>
          <p>
            Experiments, performances, team spirit and everyday friendships all
            have a place here.
          </p>
          <Link to="/gallery/photos" className="nx-text-link">
            See life at Don Bosco <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      <section className="nx-values nx-section">
        <div className="container nx-values-grid">
          <div className="nx-values-lead" data-reveal>
            <span className="nx-overline">03 / OUR WAY</span>
            <h2>Care is part of the curriculum.</h2>
            <p>
              Don Bosco’s Preventive System is built on a simple idea: young
              people grow best when learning is guided by trust, purpose and
              presence.
            </p>
            <Link to="/about/don-bosco" className="nx-text-link">
              Discover our approach <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="nx-value-list" data-reveal>
            {values.map((item, i) => {
              const Icon = item.icon;
              return (
                <button
                  type="button"
                  className={`nx-value ${value === i ? "active" : ""}`}
                  aria-expanded={value === i}
                  key={item.title}
                  onClick={() => setValue(i)}
                >
                  <span className="nx-value-num">{item.number}</span>
                  <span className="nx-value-main">
                    <strong>{item.title}</strong>
                    {value === i && <small>{item.copy}</small>}
                  </span>
                  <Icon size={24} strokeWidth={1.5} />
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="nx-moments nx-section">
        <div className="container nx-moments-head">
          <div>
            <span className="nx-overline">04 / HERE, TOGETHER</span>
            <h2>
              Life looks different from <em>every angle.</em>
            </h2>
          </div>
          <div className="nx-rail-controls">
            <button
              type="button"
              aria-label="Previous photos"
              onClick={() =>
                rail.current?.scrollBy({ left: -390, behavior: "smooth" })
              }
            >
              <ArrowLeft size={21} />
            </button>
            <button
              type="button"
              aria-label="Next photos"
              onClick={() =>
                rail.current?.scrollBy({ left: 390, behavior: "smooth" })
              }
            >
              <ArrowRight size={21} />
            </button>
          </div>
        </div>
        <div className="nx-moment-rail" ref={rail}>
          {gallery.map(([photo, label], i) => (
            <div className="nx-moment" key={photo}>
              <img src={media(photo)} alt={label} loading="lazy" />
              <span>
                0{i + 1} / {label}
              </span>
            </div>
          ))}
        </div>
        <div className="container nx-moments-foot">
          <p>Every child finds their own way to shine.</p>
          <Link to="/gallery/photos" className="nx-text-link">
            Open the gallery <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      <section className="nx-final">
        <div className="container nx-final-inner">
          <span className="nx-overline">THE NEXT CHAPTER STARTS HERE</span>
          <h2>
            Let’s see what
            <br />
            <em>they can become.</em>
          </h2>
          <p>
            Whether you are exploring the school or a +2 stream, our team can
            help you take the next step.
          </p>
          <div>
            <Link to="/school/admission" className="nx-button nx-button-lime">
              School admissions <ArrowUpRight size={18} />
            </Link>
            <Link
              to="/plus-two/admission"
              className="nx-button nx-button-outline"
            >
              +2 admissions <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
