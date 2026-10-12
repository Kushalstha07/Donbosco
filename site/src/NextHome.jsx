import React, { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Experienced Teachers", value: 75, suffix: "+" },
  { label: "Successful Graduates", value: 5000, suffix: "+" },
  { label: "Academic Programs", value: 50, suffix: "+" },
  { label: "Clubs & Activities", value: 20, suffix: "+" },
];

const paths = [
  {
    name: "School", number: "01", eyebrow: "SCHOOL YEARS", title: "A strong beginning for every learner.",
    body: "A broad English-medium education that brings together academic foundations, creative learning, sport and a sense of responsibility toward others.",
    points: ["Academic foundations", "Creative learning", "Sport & culture"], image: "creative", href: "/school/admission",
  },
  {
    name: "Science", number: "02", eyebrow: "+2 PATHWAY", title: "For minds that love to discover.",
    body: "Explore scientific ideas through theory and practical investigation, with subject choices that include Biology and Computer Science.",
    points: ["Physics & Chemistry", "Mathematics", "Practical learning"], image: "science-lab", href: "/plus-two/science",
  },
  {
    name: "Management", number: "03", eyebrow: "+2 PATHWAY", title: "Make ideas work in the real world.",
    body: "Study business, accounting and economics while developing a practical understanding of organisations and opportunity.",
    points: ["Accounting", "Economics", "Business Studies"], image: "hospitality", href: "/plus-two/management",
  },
  {
    name: "Humanities", number: "04", eyebrow: "+2 PATHWAY", title: "Understand people and perspectives.",
    body: "Build insight into society, media and communication, and learn to consider the questions that shape our communities.",
    points: ["Communication", "Sociology", "Social Studies"], image: "classroom", href: "/plus-two/humanities",
  },
  {
    name: "Law", number: "05", eyebrow: "+2 PATHWAY", title: "Find your voice and use it well.",
    body: "Begin exploring legal thought and practice through reading, discussion and applied experiences.",
    points: ["Legal theory", "Constitutional law", "Legal drafting"], image: "investiture", href: "/plus-two/law",
  },
];

const principles = [
  { number: "01", title: "Reason", text: "Young people are encouraged to ask questions, think clearly and understand the world they are entering." },
  { number: "02", title: "Faith & values", text: "Learning makes room for reflection, integrity and a sense of responsibility toward others." },
  { number: "03", title: "Loving kindness", text: "A caring relationship helps every student feel known, trusted and supported." },
];

function SchoolCounters() {
  const element = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = element.current;
    if (!node) return;
    let frame;
    let started = false;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started) return;
      started = true;
      observer.disconnect();
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setProgress(1);
        return;
      }
      const start = performance.now();
      const tick = (now) => {
        const elapsed = Math.min((now - start) / 1300, 1);
        setProgress(1 - Math.pow(1 - elapsed, 3));
        if (elapsed < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.25 });
    observer.observe(node);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, []);

  return (
    <div className="ch-stats" ref={element} aria-label="School figures">
      <div className="container ch-stats-grid">
        {stats.map((item) => (
          <div className="ch-stat" key={item.label} aria-label={`${item.value.toLocaleString("en-US")}${item.suffix} ${item.label}`}>
            <strong aria-hidden="true">{Math.round(item.value * progress).toLocaleString("en-US")}{item.suffix}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NextHome({ Link, media }) {
  const [activePath, setActivePath] = useState(0);
  const selected = paths[activePath];

  return (
    <main className="ch-home">
      <section className="ch-hero" aria-labelledby="ch-hero-title">
        <div className="container ch-hero-grid">
          <div className="ch-hero-copy">
            <span className="ch-overline">NEPAL DON BOSCO · SIDDHIPUR, LALITPUR</span>
            <h1 id="ch-hero-title">A place to <em>learn.</em><br />A place to <em>belong.</em></h1>
            <p>We are a Salesian learning community where academic ambition meets care for the whole person. Students are encouraged to think, create, serve and grow into confident versions of themselves.</p>
            <div className="ch-actions"><Link to="/about/history" className="ch-button ch-button-primary">Discover our school</Link><Link to="/school/admission" className="ch-text-link">Explore admissions</Link></div>
            <div className="ch-hero-note">SCHOOL YEARS <span /> FOUR +2 PATHWAYS <span /> EST. 2002</div>
          </div>
          <div className="ch-hero-photo"><img src={media("hero")} alt="Students smiling together at Nepal Don Bosco" /><div className="ch-photo-caption"><span>LIFE AT DON BOSCO</span><strong>Every student has a story to write.</strong></div></div>
        </div>
        <SchoolCounters />
      </section>

      <section className="ch-pathways ch-section" id="pathways" aria-labelledby="ch-pathways-title">
        <div className="container">
          <div className="ch-section-head"><span className="ch-overline">01 / LEARNING PATHWAYS</span><h2 id="ch-pathways-title">Room to find <em>your direction.</em></h2><p>From the school years through +2, students can explore the subjects and experiences that make them curious.</p></div>
          <div className="ch-path-tabs" role="tablist" aria-label="Academic pathways">
            {paths.map((path, index) => (
              <button
                key={path.name}
                type="button"
                role="tab"
                id={`ch-tab-${index}`}
                aria-controls="ch-panel"
                aria-selected={activePath === index}
                tabIndex={activePath === index ? 0 : -1}
                className={activePath === index ? "active" : ""}
                onClick={() => setActivePath(index)}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
                  event.preventDefault();
                  const next = (index + (event.key === "ArrowRight" ? 1 : -1) + paths.length) % paths.length;
                  setActivePath(next);
                  document.getElementById(`ch-tab-${next}`)?.focus();
                }}
              >
                <img src={media(path.image)} alt="" loading="lazy" />
                <span><small>{path.number}</small>{path.name}</span>
              </button>
            ))}
          </div>
          <div className="ch-path-panel" id="ch-panel" role="tabpanel" aria-labelledby={`ch-tab-${activePath}`} key={selected.name}>
            <div className="ch-path-image"><img src={media(selected.image)} alt={`${selected.name} learning at Nepal Don Bosco`} /></div>
            <div className="ch-path-detail"><span className="ch-overline">{selected.eyebrow}</span><h3>{selected.title}</h3><p>{selected.body}</p><div className="ch-path-points">{selected.points.map((point) => <span key={point}>{point}</span>)}</div><Link to={selected.href} className="ch-button ch-button-accent">Explore {selected.name}</Link></div>
          </div>
          <p className="ch-fine-print">Subjects and entry criteria may change. Please confirm current details with the school office.</p>
        </div>
      </section>

      <section className="ch-life ch-section" aria-labelledby="ch-life-title">
        <div className="container ch-life-grid">
          <div className="ch-life-copy"><span className="ch-overline">02 / LIFE & VALUES</span><h2 id="ch-life-title">More than a school day. <em>A way to grow.</em></h2><p>Lessons matter. So do friendships, teamwork, sport, service and the quiet confidence that comes from being encouraged. Don Bosco’s Preventive System brings care into everyday learning.</p><div className="ch-principles">{principles.map((item) => <div className="ch-principle" key={item.number}><span>{item.number}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</div><Link to="/about/don-bosco" className="ch-text-link">Read about our approach</Link></div>
          <div className="ch-life-photos">
            <figure className="ch-life-photo-main"><img src={media("community")} alt="Students and families in the school courtyard" /><figcaption>Learning together, every day</figcaption></figure>
            <div className="ch-life-photo-grid">
              <figure><img src={media("science-lab")} alt="Students working in the science lab" /><figcaption>Discovery</figcaption></figure>
              <figure><img src={media("sports")} alt="Student with a sports trophy" /><figcaption>Team spirit</figcaption></figure>
              <figure><img src={media("school-event")} alt="Students taking part in a school event" /><figcaption>Expression</figcaption></figure>
              <figure><img src={media("student-life")} alt="Students enjoying time together outdoors" /><figcaption>Belonging</figcaption></figure>
            </div>
            <Link to="/gallery/photos" className="ch-gallery-link">Explore the photo gallery</Link>
          </div>
        </div>
      </section>

      <section className="ch-next ch-section" aria-labelledby="ch-next-title">
        <div className="container">
          <div className="ch-next-head"><div><span className="ch-overline">03 / YOUR NEXT CHAPTER</span><h2 id="ch-next-title">Come and <em>see what is possible.</em></h2></div><p>Explore the route that fits your child, then speak with the school office about current places, dates and requirements.</p></div>
          <div className="ch-admission-grid">
            <article className="ch-admission-card">
              <img src={media("campus")} alt="Nepal Don Bosco campus and courtyard" loading="lazy" />
              <div className="ch-admission-content"><span>SCHOOL ADMISSIONS</span><h3>A strong start begins here.</h3><p>For families considering the school years.</p><ol><li>Ask the office about current vacancies.</li><li>Collect and complete the application form.</li><li>Meet the school for the relevant assessment.</li></ol><Link to="/school/admission" className="ch-button ch-button-primary">Explore school admissions</Link></div>
            </article>
            <article className="ch-admission-card">
              <img src={media("investiture")} alt="Students celebrating at a school ceremony" loading="lazy" />
              <div className="ch-admission-content"><span>+2 ADMISSIONS</span><h3>Choose the path ahead.</h3><p>For students ready to explore the +2 section.</p><ol><li>Review the available streams and requirements.</li><li>Apply and complete the entrance process.</li><li>Attend the interview with a parent or guardian.</li></ol><Link to="/plus-two/admission" className="ch-button ch-button-primary">Explore +2 admissions</Link></div>
            </article>
          </div>
          <div className="ch-next-foot"><p>Questions about admissions or school life? Our team can help you plan the next step.</p><Link to="/contact" className="ch-text-link">Contact the school office</Link></div>
        </div>
      </section>
    </main>
  );
}
