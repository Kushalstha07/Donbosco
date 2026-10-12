import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  GraduationCap,
  Search,
  Sparkles,
} from "lucide-react";

const programmes = {
  science: {
    index: "01",
    theme: "Discover",
    image: "classroom",
    title: "Curiosity, with the tools to follow it.",
    introduction:
      "The +2 Science pathway combines a strong theoretical foundation with practical work. Students explore the physical and biological world and prepare for a wide range of further studies.",
    tracks: [
      {
        label: "Physical group",
        subjects: [
          "English",
          "Nepali",
          "Mathematics",
          "Physics",
          "Chemistry",
          "Computer Science",
        ],
        note: "For students drawn to technology, engineering, mathematics and the physical sciences.",
      },
      {
        label: "Biological group",
        subjects: [
          "English",
          "Nepali",
          "Biology",
          "Physics",
          "Chemistry",
          "Mathematics",
        ],
        note: "For students drawn to life sciences, health and related fields.",
      },
    ],
    opportunities: [
      "Lab-based learning",
      "Scientific thinking",
      "Further study pathways",
    ],
  },
  management: {
    index: "02",
    theme: "Create",
    image: "hotel-class",
    title: "Understand how ideas become action.",
    introduction:
      "The +2 Management pathway brings together accounting, economics and business thinking, alongside options that connect learning to practice.",
    tracks: [
      {
        label: "Core subjects",
        subjects: ["English", "Nepali", "Accounting"],
        note: "Build a strong foundation in communication and commerce.",
      },
      {
        label: "Subject choices",
        subjects: [
          "Mathematics",
          "Social Studies",
          "Marketing",
          "Economics",
          "Business Studies",
          "Computer Science",
          "Hotel Management",
        ],
        note: "The school publishes several optional combinations. Confirm current choices with the office.",
      },
    ],
    opportunities: [
      "Business foundations",
      "Practical application",
      "Broad subject choices",
    ],
  },
  humanity: {
    index: "03",
    theme: "Connect",
    image: "community",
    title: "Explore the questions behind society.",
    introduction:
      "The +2 Humanities pathway gives students space to study communication, people, culture and contemporary society.",
    tracks: [
      {
        label: "Subjects of study",
        subjects: [
          "English",
          "Nepali",
          "Mass Communication",
          "Social Studies & Life Skills",
          "Sociology",
        ],
        note: "A foundation for further study across the humanities and social sciences.",
      },
      {
        label: "Practical media",
        subjects: [
          "Newspaper",
          "Radio",
          "Television news",
          "Photography",
          "Voice recording & editing",
        ],
        note: "The current school site describes hands-on media and studio work.",
      },
    ],
    opportunities: [
      "Critical perspectives",
      "Media practice",
      "Communication skills",
    ],
  },
  law: {
    index: "04",
    theme: "Advocate",
    image: "school-event",
    title: "Learn to think, speak and act with purpose.",
    introduction:
      "The +2 Law pathway introduces legal systems and ideas while developing research, writing and presentation skills.",
    tracks: [
      {
        label: "Grade XI",
        subjects: [
          "English",
          "Nepali",
          "Social Studies & Life Skills",
          "Jurisprudence & Legal Theories",
          "Procedural Law / Mass Communication",
          "Constitutional Law",
        ],
        note: "Begin with the ideas and institutions that shape law.",
      },
      {
        label: "Grade XII",
        subjects: [
          "English",
          "Nepali",
          "Social Studies & Life Skills",
          "Nepalese Legal System",
          "Legal Drafting / Mass Communication",
          "Civil & Criminal Law and Justice",
        ],
        note: "Develop an understanding of legal systems, drafting and justice.",
      },
    ],
    opportunities: ["Court visits", "Moot court", "Debate & legal awareness"],
  },
};
const principleItems = [
  {
    title: "Reason",
    no: "01",
    copy: "Education invites young people to think clearly, ask questions and understand the reasons behind choices.",
  },
  {
    title: "Faith & values",
    no: "02",
    copy: "Reflection and a sense of purpose help students consider who they are and how they can serve others.",
  },
  {
    title: "Loving kindness",
    no: "03",
    copy: "A relationship of trust makes a school feel like a place where every learner belongs.",
  },
];

export function SourceDetails({ id, RenderBlocks }) {
  return (
    <details className="cv-source">
      <summary>
        Read the full details from the current school website{" "}
        <ChevronDown size={18} />
      </summary>
      <div>
        <RenderBlocks id={id} />
      </div>
    </details>
  );
}

export function ProgramPage({ page, GenericPage, Link, media, RenderBlocks }) {
  const program = programmes[page.id];
  const [track, setTrack] = useState(0);
  if (!program) return null;
  const selected = program.tracks[track];
  return (
    <GenericPage page={page}>
      <div className="cv-program-lead">
        <div>
          <span className="cv-index">+2 PATHWAY / {program.index}</span>
          <h2>{program.title}</h2>
          <p>{program.introduction}</p>
          <Link to="/plus-two/admission" className="cv-action">
            Explore admission <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="cv-program-image">
          <img
            src={media(program.image)}
            alt={`${page.label} students at Nepal Don Bosco`}
          />
          <span>
            {program.theme} <Sparkles size={17} />
          </span>
        </div>
      </div>
      <div className="cv-learning-band">
        <span>THE EXPERIENCE</span>
        {program.opportunities.map((item, i) => (
          <strong key={item}>
            <b>0{i + 1}</b>
            {item}
          </strong>
        ))}
      </div>
      <section className="cv-program-curriculum">
        <div className="cv-section-label">WHAT YOU'LL STUDY</div>
        <h2>A closer look at the pathway.</h2>
        <p>
          Explore the subject groups published by the school. Combinations may
          vary by intake.
        </p>
        <div
          className="cv-track-tabs"
          role="tablist"
          aria-label={`${page.label} subject groups`}
        >
          {program.tracks.map((item, i) => (
            <button
              type="button"
              key={item.label}
              role="tab"
              aria-selected={track === i}
              className={track === i ? "active" : ""}
              onClick={() => setTrack(i)}
            >
              {item.label}
              <ArrowUpRight size={16} />
            </button>
          ))}
        </div>
        <div className="cv-track-panel" role="tabpanel" key={selected.label}>
          <div>
            <span>
              0{track + 1} / {selected.label.toUpperCase()}
            </span>
            <h3>{selected.label}</h3>
            <p>{selected.note}</p>
          </div>
          <ul>
            {selected.subjects.map((subject) => (
              <li key={subject}>
                <Check size={16} />
                {subject}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="cv-next-step">
        <GraduationCap size={30} strokeWidth={1.4} />
        <div>
          <span>READY TO TAKE THE NEXT STEP?</span>
          <h3>Make your future yours.</h3>
          <p>
            Ask the school about current subjects, admission requirements and
            scholarships.
          </p>
        </div>
        <Link to="/plus-two/admission" className="cv-action">
          Admissions <ArrowUpRight size={18} />
        </Link>
      </div>
      <SourceDetails id={page.id} RenderBlocks={RenderBlocks} />
    </GenericPage>
  );
}

export function DonBoscoPage({ page, GenericPage, Link, media, RenderBlocks }) {
  const [active, setActive] = useState(0);
  return (
    <GenericPage page={page}>
      <div className="cv-statement">
        <span className="cv-index">THE SALESIAN WAY</span>
        <h2>“Education is a matter of the heart.”</h2>
        <p>
          Saint John Bosco built an approach to education that meets young
          people with presence, understanding and care. That spirit continues to
          shape Nepal Don Bosco School & College.
        </p>
      </div>
      <div className="cv-founder-grid">
        <div className="cv-founder-image">
          <img src={media("hero")} alt="Nepal Don Bosco students together" />
        </div>
        <div>
          <span className="cv-section-label">THE PREVENTIVE SYSTEM</span>
          <h2>Three ideas. One caring approach.</h2>
          <div className="cv-principles">
            {principleItems.map((item, i) => (
              <button
                type="button"
                key={item.title}
                onClick={() => setActive(i)}
                className={active === i ? "active" : ""}
                aria-expanded={active === i}
              >
                <span>{item.no}</span>
                <strong>{item.title}</strong>
                <ArrowUpRight size={17} />
                {active === i && <p>{item.copy}</p>}
              </button>
            ))}
          </div>
        </div>
      </div>
      <section className="cv-timeline">
        <span className="cv-section-label">A LIFE DEDICATED TO THE YOUNG</span>
        <h2>From one dream to a worldwide mission.</h2>
        <div>
          {[
            ["1815", "John Bosco is born in Becchi, Italy."],
            [
              "1841",
              "He is ordained a priest and begins working with young people in Turin.",
            ],
            ["1859", "The Salesian Society takes shape around his mission."],
            ["1888", "Don Bosco dies, leaving a living educational legacy."],
            ["1934", "He is canonised as Saint John Bosco."],
          ].map(([year, label]) => (
            <article key={year}>
              <strong>{year}</strong>
              <p>{label}</p>
            </article>
          ))}
        </div>
      </section>
      <div className="cv-inline-cta">
        <span>Want to understand our school story?</span>
        <Link to="/about/history">
          Explore our history <ArrowRight size={17} />
        </Link>
      </div>
      <SourceDetails id={page.id} RenderBlocks={RenderBlocks} />
    </GenericPage>
  );
}

export function HistoryPage({ page, GenericPage, Link, media, RenderBlocks }) {
  return (
    <GenericPage page={page}>
      <div className="cv-history-head">
        <span className="cv-index">ROOTED IN SIDDHIPUR</span>
        <h2>A school shaped by purpose and place.</h2>
        <p>
          Nepal Don Bosco School was established in 2002 as an English-medium
          school for girls and boys. Its Salesian character remains central to
          the way the school teaches and cares.
        </p>
      </div>
      <div className="cv-history-photo">
        <img src={media("campus")} alt="Nepal Don Bosco campus in Siddhipur" />
        <span>THE CAMPUS / SIDDHIPUR, LALITPUR</span>
      </div>
      <div className="cv-history-points">
        <article>
          <strong>2002</strong>
          <div>
            <h3>The beginning</h3>
            <p>
              Nepal Don Bosco School opens in Siddhipur under the Nepal Don
              Bosco Society.
            </p>
          </div>
        </article>
        <article>
          <strong>Today</strong>
          <div>
            <h3>Learning across stages</h3>
            <p>
              The school supports learners through the school years and into +2
              pathways.
            </p>
          </div>
        </article>
        <article>
          <strong>Always</strong>
          <div>
            <h3>Education with heart</h3>
            <p>
              The Salesian tradition keeps character, community and care close
              to academic life.
            </p>
          </div>
        </article>
      </div>
      <div className="cv-inline-cta">
        <span>Explore the education behind the story.</span>
        <Link to="/about/don-bosco">
          The Don Bosco approach <ArrowRight size={17} />
        </Link>
      </div>
      <SourceDetails id={page.id} RenderBlocks={RenderBlocks} />
    </GenericPage>
  );
}

const schoolRuleSections = [
  { title: "Aims & learning", start: 0, end: 3 },
  { title: "School terms & promotion", start: 3, end: 5 },
  { title: "Books", start: 5, end: 7 },
  { title: "Discipline", start: 7, end: 10 },
  { title: "Library & laboratory", start: 10, end: 12 },
  { title: "Communication", start: 12, end: 15 },
  { title: "Health & wellbeing", start: 15, end: 17 },
  { title: "Activities", start: 17, end: 20 },
];
function BlockSlice({ blocks }) {
  return (
    <div className="cv-rule-copy">
      {blocks.map((block, i) =>
        block.type === "list" ? (
          <ul key={i}>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{block.text}</p>
        ),
      )}
    </div>
  );
}
export function RulesPage({ page, GenericPage, content }) {
  const [query, setQuery] = useState("");
  const school = page.id === "school-rules";
  const blocks = content[page.id] || [];
  const routes = useMemo(
    () =>
      school
        ? Array.from({ length: 27 }, (_, i) => ({
            name: blocks[23 + i * 2]?.text,
            detail: blocks[24 + i * 2]?.text,
          })).filter((x) => x.name && x.detail)
        : [],
    [school, blocks],
  );
  const filtered = routes.filter((route) =>
    `${route.name} ${route.detail}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <GenericPage page={page}>
      <div className="cv-rules-head">
        <span className="cv-index">A SHARED WAY OF LEARNING</span>
        <h2>Clear expectations. A caring community.</h2>
        <p>
          Find the guidance you need without searching through a long document.
          For current policy or a specific situation, please confirm with the
          school office.
        </p>
      </div>
      {school ? (
        <>
          <div className="cv-accordion">
            {schoolRuleSections.map((section, i) => (
              <details key={section.title} open={i === 0}>
                <summary>
                  <span>0{i + 1}</span>
                  <strong>{section.title}</strong>
                  <ChevronDown size={20} />
                </summary>
                <BlockSlice
                  blocks={blocks
                    .slice(section.start, section.end)
                    .filter((b) => b.text && !b.text.match(/^[A-Z &]+$/))}
                />
              </details>
            ))}
          </div>
          <section className="cv-routes">
            <span className="cv-section-label">TRANSPORT SERVICE</span>
            <h2>Find a bus route.</h2>
            <p>
              The existing school site lists the routes below. Ask the school to
              confirm present coverage and timings.
            </p>
            <label className="cv-search">
              <Search size={19} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a place or route number"
                aria-label="Search bus routes"
              />
            </label>
            <div className="cv-route-grid">
              {filtered.map((route, i) => (
                <div key={`${route.name}-${i}`}>
                  <strong>{route.name}</strong>
                  <span>{route.detail}</span>
                </div>
              ))}
            </div>
            {!filtered.length && (
              <p className="cv-empty">
                No matching route. Try another place name or contact the school
                office.
              </p>
            )}
          </section>
        </>
      ) : (
        <div className="cv-accordion">
          {(blocks.find((b) => b.type === "list")?.items || []).map(
            (item, i) => (
              <details key={i}>
                <summary>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <strong>{item.split(/[:.]/)[0].slice(0, 90)}</strong>
                  <ChevronDown size={20} />
                </summary>
                <p>{item}</p>
              </details>
            ),
          )}
        </div>
      )}
    </GenericPage>
  );
}
