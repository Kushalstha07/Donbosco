import React from "react";

const pageDepth = {
  "about-don-bosco": {
    label: "THE IDEA BEHIND THE SCHOOL",
    title: "Learning is personal here.",
    intro: "Don Bosco's educational approach asks adults to be present in young people's lives. It joins learning with trust, guidance and room to grow through everyday experience.",
    image: "student-life",
    imageAlt: "Students spending time together at Nepal Don Bosco",
    points: [
      ["Reason", "Students need space to ask questions, understand choices and practise sound judgement. The approach values explanation and dialogue in daily school life."],
      ["Faith and values", "Reflection, respect and responsibility connect classroom learning with the way young people treat others and contribute to their communities."],
      ["Loving kindness", "The school describes care and personal attention as part of education. Students learn best when they feel known, encouraged and safe to try."],
    ],
  },
  "facets-of-history": {
    label: "OUR STORY TODAY",
    title: "A place shaped by its community.",
    intro: "Since opening in Siddhipur in 2002, Nepal Don Bosco has brought a Salesian approach to school education. Its story is also the story of the students, families and staff who have made the campus their own.",
    image: "community",
    imageAlt: "The Nepal Don Bosco school community gathered together",
    points: [
      ["Rooted in Siddhipur", "The campus is part of the local community in Lalitpur. Its location and relationships with families give the school a distinct sense of place."],
      ["Learning across stages", "The school years build foundations for young learners, while the +2 section offers subject pathways for students considering what comes next."],
      ["A continuing story", "Classrooms, celebrations, service and friendships all add to the school's history. The photo and video galleries offer a closer look at those moments."],
    ],
  },
  "about-leadership": {
    label: "LEADERSHIP IN PRACTICE",
    title: "Guidance reaches beyond an office.",
    intro: "School leadership connects the everyday needs of students and teachers with the wider Salesian mission. The council, Salesian leaders and former leaders each represent a different part of that continuity.",
    image: "campus",
    imageAlt: "Nepal Don Bosco campus and courtyard",
    points: [
      ["At the school", "The management council supports the school community and its educational work. Families can contact the school office for current responsibilities and appointments."],
      ["In the Salesian family", "The school belongs to a network with a shared focus on young people. Regional and worldwide leadership links local work to that wider purpose."],
      ["Across generations", "Former Rectors and Principals helped shape the institution students know today. Recognising their service keeps that history visible."],
    ],
  },
  "annual-reports": {
    label: "SCHOOL PUBLICATIONS",
    title: "A record to explore.",
    intro: "Annual reports bring information from a school year into one publication. The available PDF is hosted on the current school website and can be opened from the link above.",
    image: "school-event",
    imageAlt: "Students and staff at a Nepal Don Bosco school event",
    points: [
      ["Read the publication", "Open the PDF to see the report as published by the school. If you need an accessible copy or have a question about its contents, contact the office."],
      ["Explore school life", "The galleries show additional moments from learning, activities and celebrations. They offer a visual companion to the written publication."],
      ["Ask for current information", "A published report records a particular year. For current policies, staffing or admissions details, the school office is the best point of contact."],
    ],
  },
  "teaching-staff": {
    label: "BEHIND EVERY LESSON",
    title: "People make learning possible.",
    intro: "The teaching directory helps families find names and roles. A teacher's work reaches beyond a subject lesson, through guidance, feedback and steady attention to each student's progress.",
    image: "classroom",
    imageAlt: "Learning in a Nepal Don Bosco classroom",
    points: [
      ["Find a name", "Use the search above to look for a staff member or role. The directory follows the published school listing, which may change during the year."],
      ["Stay connected", "Questions about a class or a student's learning can begin with the school office, which can direct families to the right person."],
      ["See learning in action", "The campus and gallery pages show the settings where teaching, practical work and student activities take place."],
    ],
  },
  "office-staff": {
    label: "HELP THROUGH THE SCHOOL DAY",
    title: "The people who keep things moving.",
    intro: "Office staff help families and students navigate enquiries, records and the many practical details of school life. The directory above reflects the names published by the school.",
    image: "campus",
    imageAlt: "Nepal Don Bosco school campus",
    points: [
      ["Start with the office", "For admissions, documents or a general question, the office can explain the current process and connect you with the right team."],
      ["Use the directory", "Search by name or role if you know whom you need. Confirm current roles with the school before relying on a published listing."],
      ["Plan a visit", "The Contact page has the school's phone numbers, email address and directions to the Siddhipur campus."],
    ],
  },
  "supportive-staff": {
    label: "EVERY ROLE MATTERS",
    title: "A school is built by many hands.",
    intro: "Support staff contribute to the daily care and operation of the campus. Their work helps create the conditions in which students can learn and take part in school life.",
    image: "community",
    imageAlt: "Members of the Nepal Don Bosco community",
    points: [
      ["Part of one community", "A welcoming school depends on people working across different responsibilities, from classrooms to shared spaces and daily routines."],
      ["Find published names", "The directory above brings together the names listed by the school. The office can confirm the most current staffing information."],
      ["Show appreciation", "Recognising the people behind everyday school life is part of valuing the whole community, not only the moments seen in class."],
    ],
  },
  facilities: {
    label: "SPACES FOR A FULL EDUCATION",
    title: "Learning moves around campus.",
    intro: "A school day includes focused classroom work, practical discovery, creative activity and time together. Explore the spaces above, then see more of campus life in the photo gallery.",
    image: "creative",
    imageAlt: "Students taking part in creative learning",
    points: [
      ["Study and discussion", "Classrooms give students a setting to build knowledge, ask questions and learn with their peers."],
      ["Practical experience", "Laboratory and applied learning help students connect ideas with what they can observe, make and test."],
      ["Shared activity", "Sport, events and creative work offer other ways to practise teamwork, confidence and expression."],
    ],
  },
  "school-rules": {
    label: "A SHARED FRAMEWORK",
    title: "Clear guidance helps everyone belong.",
    intro: "The rules above cover learning, conduct, wellbeing and daily routines. Reading them alongside a conversation with the school can help families understand how they apply in practice.",
    image: "student-life",
    imageAlt: "Students together at Nepal Don Bosco",
    points: [
      ["Read the relevant section", "Open the topic that matches your question. The sections are grouped so families can find guidance without scanning the full document."],
      ["Confirm the latest policy", "Published rules may be revised. The school office can clarify current requirements and explain how they apply to a particular situation."],
      ["Ask when unsure", "A short conversation can prevent confusion about attendance, activities, transport or expectations during the school day."],
    ],
  },
  "school-admission": {
    label: "PLANNING FOR SCHOOL",
    title: "A good beginning starts with a conversation.",
    intro: "The admissions steps above help families prepare. The office can explain places, documents, assessments and dates for the class your child is considering.",
    image: "hero",
    imageAlt: "Nepal Don Bosco students together",
    points: [
      ["Learn about the school", "Explore the school's story, values and facilities to see how the learning environment fits your child."],
      ["Prepare your questions", "Ask about the relevant class, current vacancies, required documents and the timing of the admission process."],
      ["Stay in touch", "Admission details can change by intake. Use the Contact page to reach the school before making plans around a date or requirement."],
    ],
  },
  science: {
    label: "BEYOND THE SUBJECT LIST",
    title: "Follow questions with evidence.",
    intro: "Science learning combines concepts with observation and practical work. The subject groups above show different ways students can develop their interests during +2.",
    image: "science-lab",
    imageAlt: "Students learning in the science laboratory",
    points: [
      ["Build foundations", "Physics, Chemistry and Mathematics provide tools for explaining patterns and solving problems across many fields."],
      ["Explore your interests", "Biology and Computer Science choices can help students pursue different questions and prepare for further study."],
      ["Check combinations", "The available subjects and entry criteria may change. Confirm the current intake with the +2 office before applying."],
    ],
  },
  management: {
    label: "BEYOND THE SUBJECT LIST",
    title: "See how organisations work.",
    intro: "Management brings together numbers, people and decisions. The pathway encourages students to understand how an idea becomes a plan and how a plan works in practice.",
    image: "hospitality",
    imageAlt: "Students taking part in practical management learning",
    points: [
      ["Read the numbers", "Accounting and Economics help students make sense of resources, choices and the wider setting for business."],
      ["Connect ideas to work", "Options such as Business Studies, Marketing, Computer Science and Hotel Management offer different practical perspectives."],
      ["Plan your subjects", "Optional combinations may vary. Ask the school which choices are available for the current +2 intake."],
    ],
  },
  humanity: {
    label: "BEYOND THE SUBJECT LIST",
    title: "Understand people and perspectives.",
    intro: "Humanities invites students to look closely at society, communication and the way people understand one another. Its subjects join study with practical expression.",
    image: "classroom",
    imageAlt: "Students working together in class",
    points: [
      ["Study society", "Sociology and social studies help students investigate communities, institutions and everyday experience."],
      ["Practise communication", "Media work described by the school includes writing, photography, recording and editing."],
      ["Keep options open", "Talk with the +2 office about the subject combination offered in the current year and where it may lead."],
    ],
  },
  law: {
    label: "BEYOND THE SUBJECT LIST",
    title: "Learn to examine an argument.",
    intro: "The Law pathway introduces legal ideas while building the habits of careful reading, clear writing and reasoned discussion.",
    image: "investiture",
    imageAlt: "Nepal Don Bosco students at a school ceremony",
    points: [
      ["Start with principles", "Jurisprudence and Constitutional Law introduce the ideas and institutions that shape legal systems."],
      ["Apply your learning", "Drafting, debate and moot court activities help students practise explaining a position and responding to another view."],
      ["Check the current course", "The published subject list includes choices. Ask the school which combinations and activities are currently offered."],
    ],
  },
  "plus-2-section-admission": {
    label: "PLANNING FOR +2",
    title: "Choose a direction, then ask the details.",
    intro: "Science, Management, Humanities and Law offer different starting points. Explore each pathway, then ask the school about current criteria, subject choices and the application timetable.",
    image: "science-lab",
    imageAlt: "Students in a Nepal Don Bosco science class",
    points: [
      ["Compare interests", "Look beyond a stream's name to the subjects and learning experiences it contains."],
      ["Confirm requirements", "The office can provide the latest eligibility, assessment, interview and document information for this intake."],
      ["Make a plan", "Use the application steps above as a guide, then follow the dates and instructions given by the school."],
    ],
  },
  "plus-2-section-rules": {
    label: "LIFE IN THE +2 SECTION",
    title: "Know the expectations from the start.",
    intro: "The guidance above outlines expectations for +2 students. Read the relevant topics before the term begins, and ask the school when a rule needs clarification.",
    image: "student-life",
    imageAlt: "Nepal Don Bosco students on campus",
    points: [
      ["Learning routines", "Attendance, preparation and participation help students get the most from their chosen subjects."],
      ["Community life", "Clear standards for conduct and shared spaces support a respectful environment for everyone."],
      ["Current guidance", "Policies may change. The school office can confirm the latest version and answer questions about a specific circumstance."],
    ],
  },
  "image-gallery": {
    label: "MORE THAN A PHOTOGRAPH",
    title: "A closer view of school life.",
    intro: "The gallery brings together scenes from classrooms, activities and the wider school community. Open an image to see it larger, or choose an album to follow a particular theme.",
    image: "celebration",
    imageAlt: "A celebration at Nepal Don Bosco",
    points: [
      ["Everyday learning", "Photos of classrooms and practical work show the many ways students explore ideas."],
      ["Shared moments", "Events and celebrations record the occasions that bring students, staff and families together."],
      ["Browse by theme", "Album pages gather photos around an activity or part of school life. Some published albums may not yet contain images."],
    ],
  },
  "video-gallery": {
    label: "STORIES IN MOTION",
    title: "See the community at work and play.",
    intro: "The videos above link to recordings published by the school. They offer another way to experience events, student work and moments shared on campus.",
    image: "school-event",
    imageAlt: "A school event at Nepal Don Bosco",
    points: [
      ["Choose a story", "Browse titles to find a school event, practical lesson or community gathering that interests you."],
      ["Watch on YouTube", "Selecting a video opens the published recording on YouTube, where playback and captions depend on that video."],
      ["Keep exploring", "The photo gallery offers still images of learning spaces, activities and celebrations across school life."],
    ],
  },
  alumni: {
    label: "STAY PART OF THE STORY",
    title: "Connections can continue after school.",
    intro: "Past pupils carry their experiences into new places and careers. Reconnecting can begin simply: share a memory, ask about school news or get in touch with the office.",
    image: "student-life",
    imageAlt: "Nepal Don Bosco students spending time together",
    points: [
      ["Share your journey", "The school may welcome news from former students. Contact the office to ask how you can share an update."],
      ["Reconnect with people", "If you are looking for a past pupil activity or a way to reach the school community, the office can advise on current opportunities."],
      ["Look back", "Browse the photo gallery for scenes of campus life and the events that have shaped the Don Bosco experience."],
    ],
  },
  downloads: {
    label: "FIND WHAT YOU NEED",
    title: "Useful resources in one place.",
    intro: "The links above collect the available report and admissions information. If a document you need is not listed, ask the school office for the latest copy or guidance.",
    image: "campus",
    imageAlt: "Nepal Don Bosco campus",
    points: [
      ["Read the report", "The annual report link opens a PDF on the school's current website."],
      ["Explore admissions", "The school and +2 admission pages explain the steps and direct you to the office for current requirements."],
      ["Request a document", "Forms, policies and notices may change. Contact the school rather than relying on an old copy."],
    ],
  },
  contact: {
    label: "START A CONVERSATION",
    title: "We can help you find the right answer.",
    intro: "Whether you are considering admission, need a document or want to learn more about school life, the office is a useful first point of contact.",
    image: "campus",
    imageAlt: "Nepal Don Bosco campus and courtyard",
    points: [
      ["Admissions", "Mention the class or +2 pathway you are asking about so the school can share the relevant process and dates."],
      ["School information", "For rules, facilities, staff or a visit, explain what you need and the office can direct your enquiry."],
      ["Finding campus", "Use the directions link above to plan a visit to Siddhipur, Lalitpur. Call ahead if you need to meet a particular person."],
    ],
  },
};

export default function PageDepth({ id, media }) {
  const detail = pageDepth[id];
  if (!detail) return null;
  return (
    <section className="page-depth" aria-label={`More about ${detail.title}`}>
      <div className="container">
        <div className="page-depth-lead">
          <div>
            <span className="cv-section-label">{detail.label}</span>
            <h2>{detail.title}</h2>
            <p>{detail.intro}</p>
          </div>
          <img src={media(detail.image)} alt={detail.imageAlt} loading="lazy" />
        </div>
        <div className="page-depth-grid">
          {detail.points.map(([heading, copy], index) => (
            <article key={heading}>
              <span>0{index + 1}</span>
              <h3>{heading}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
