type FieldCopy = {
  label: string;
  placeholder: string;
  helper: string;
};

type RichTextSegment = string | { text: string; strong: true };

type AboutSection = {
  name: string;
  subtitle: string;
  paragraphs: string[];
  highlightsTitle: string;
  highlights: string[];
};

type TeamMember = {
  name: string;
  role: string;
  bio: string;
  image?: string;
  stats?: string[];
};

export type Dictionary = {
  seo: {
    title: string;
    description: string;
    keywords: string[];
    imageAlt: string;
  };
  common: {
    nav: {
      home: string;
      about: string;
      services: string;
      getStarted: string;
    };
    footer: {
      copyright: string;
      rights: string;
    };
  };
  home: {
    title: string;
    subtitle: string;
    cta: string;
    logosCaption: string;
    logos: { label: string; image: string; alt?: string }[];
  };
  homeResults: {
    caption: string;
    heading: string;
  };
  homeStats: {
    eyebrow: string;
    statLabelPrefix: string;
    statValue: string;
    statLabelSuffix: string;
    subtext: string;
    mentorCta: {
      eyebrow: string;
      title: string;
      body: string;
      buttonLabel: string;
    };
  };
  homeCTA: {
    title: string;
    body: string;
    ctaLabel: string;
  };
  testimonials: {
    caption?: string;
    title: string;
    subtitle?: string;
    highlight?: string;
    items: {
      title?: string;
      quote: string;
      author: string;
      role?: string;
      initial?: string;
      imageSrc?: string;
      imageAlt?: string;
    }[];
  };
  services: {
    college: {
      title: string;
      bullets: RichTextSegment[][];
    };
    research: {
      title: string;
      bullets: RichTextSegment[][];
    };
  };
  contact: {
    hero: {
      title: string;
      description: string;
    };
    nextSteps: {
      title: string;
      body: string;
      urgentPrefix: string;
      emailLabel: string;
      preferCall: string;
    };

    form: {
      heading: string;
      subheading: string;
      sendingLabel: string;
      successMessage: string;
      missingFieldsPrefix: string;
      invalidEmailMessage: string;
      genericError: string;
      submitLabel: string;
      submittingLabel: string;
      requiredNote: string;
      servicePlaceholder: string;
      services: { value: string; label: string }[];
      fields: {
        name: FieldCopy;
        email: FieldCopy;
        phone: FieldCopy;
        service: FieldCopy;
        howDidYouFindUs: FieldCopy;
        subject: FieldCopy;
        message: FieldCopy;
      };
    };
  };
  about: {
    heroTitle: string;
    heroBody: string;
    heroEyebrow: string;
    mentorLabel: string;
    foundedByLabel: string;
    daniel: AboutSection;
    andrew: AboutSection;
    team: TeamMember[];
    globalChapters: TeamMember[];
  };
};

const enUS: Dictionary = {
  seo: {
    title: "Kang Consulting | Elite College Consulting & Research Mentorship",
    description:
      "Personalized college admissions strategy, research mentorship, and competition prep from the Kang brothers and their award-winning team.",
    keywords: [
      "college consulting",
      "college admissions help",
      "ISEF mentorship",
      "research mentorship",
      "Ivy League admissions",
      "Kang Consulting",
      "Daniel Kang",
      "Andrew Kang",
    ],
    imageAlt: "Kang Consulting acceptance letter collage",
  },
  common: {
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      getStarted: "REQUEST A FREE CONSULTATION",
    },
    footer: {
      copyright: "Copyright {year} Kang Consulting.",
      rights: "All rights reserved.",
    },
  },
  home: {
    title: "Kang Consulting. Get Accepted.",
    subtitle: "Receive 1-to-1 mentoring from two Stanford brothers.",
    cta: "REQUEST A FREE CONSULTATION",
    logosCaption: "Students Accepted to Top Universities Nationwide",
    logos: [
      { label: "Harvard", image: "/logos/harvard.png", alt: "Harvard University logo" },
      { label: "Yale", image: "/logos/yale.png", alt: "Yale University logo" },
      { label: "Princeton", image: "/logos/princeton.png", alt: "Princeton University logo" },
      { label: "Stanford", image: "/logos/stanford.png", alt: "Stanford University logo" },
      { label: "MIT", image: "/logos/mit.png", alt: "MIT logo" },
    ],
  },
  homeResults: {
    caption: "Get into your dream school now.",
    heading: "Proof That We Get Students In:",
  },
  homeStats: {
    eyebrow: "Independently verified client results",
    statLabelPrefix: "Our clients are",
    statValue: "11.2x",
    statLabelSuffix: "more likely to be accepted into Ivy+ schools.",
    subtext: "USNWR College Rankings* for 11.2x statistic.",
    mentorCta: {
      eyebrow: "Meet the mentors",
      title: "The team behind the outcomes",
      body: "Get matched with Stanford mentors and award-winning coaches who guide research, essays, and competition strategy.",
      buttonLabel: "Meet the mentors",
    },
  },
  homeCTA: {
    title: "Complimentary strategy consult",
    body: "Request a 30-minute conversation with the Kang brothers to map your admissions or research plan and see how our team can accelerate results.",
    ctaLabel: "Request consultation",
  },
  testimonials: {
    caption: "What our students have said.",
    title: "Real clients. Real experiences.",
    items: [
      {
        title: "RSI + HYPSM Admit",
        quote:
          "I worked with Daniel for 3 years and he is literally the best bar none when it comes to college admissions, research and writing essays. Not only did he help me get world-class extracurriculars such as RSI and grand awards at ISEF, he meticulously helped craft my application from start to finish. Through his irreplaceable help, I was admitted to Harvard, Yale, Stanford and MIT.",
        initial: "A",
        author: "Aaditya Saha",
        role: "Harvard, Yale, Stanford, MIT Admit | RSI | ISEF Grand Awards",
        imageSrc: "/testimonial_pfps/227aa3_7628239.jpg",
        imageAlt: "Portrait of Aaditya Saha",
      },
      {
        title: "Hodson Trust Scholar",
        quote:
          "Kang Consulting was set apart by the depth and precision of their advice. Their support wasn't generic; it was personalized, strategic, and rooted in years of proven success. Andrew had a clear, well-crafted formula for highlighting my unique strengths and ensuring every part of my application, from essays and activities to recommendations and overall narrative, was competitive for top 10 universities. With their help, I got into Johns Hopkins as a Hodson Trust Scholar on a pre-med track, supported by a scholarship worth over $150,000.",
        author: "Jenna Sharma",
        role: "Columbia, UPenn (Wharton & Life Sciences), Johns Hopkins Hodson Trust Scholar",
        imageSrc: "/testimonial_pfps/jennaimage.jpg",
        imageAlt: "Portrait of Jenna Sharma",
      },
      {
        title: "UPenn M&TSI Admit",
        quote:
          "I didn't know much about summer programs and was about to apply to an expensive pre-collegiate one before I found Daniel. He completely changed my perspective. Even though I was late to the game as a junior, he introduced me to top-tier programs like RSI, SSP, and M&TSI. I had no clue how to approach the M&TSI application -- but after just a few sessions with Daniel, I crafted a strong essay and video and got in! He's genuinely the GOAT for this stuff.",
        initial: "V",
        author: "Viraj Kamath",
        role: "Admitted to UPenn M&TSI | Class of 2025",
      },
      {
        title: "Duke Admit",
        quote:
          "I've done 15+ free info sessions from other college consultants -- none came close to the value Daniel provides. Unlimited sessions and personal advising for the price is unheard of, but it's the quality that blew me away. I struggled with writing before, but in just one session, Daniel helped me turn my Common App essay into something I'm genuinely proud of. He's insanely dedicated -- even after a personal loss, he still showed up for our session with full energy. If you're serious about getting into a T20 or T10, Daniel's your guy. No fluff, just real results.",
        initial: "S",
        author: "Siddhartha Milkuri",
        role: "College Applicant | Class of 2025",
      },
      {
        title: "Stanford + Columbia Admit",
        quote:
          "Working with Daniel over the past year changed everything for me. I ended up getting a Columbia Likely Letter, major scholarships from Rice and Emory, selected as a Duke/UNC Robertson Scholar, and ultimately admitted to my dream school -- Stanford. Daniel's advice is gold, and he keeps it real every step of the way. If you're even thinking about applying to a top school, I'd recommend him without hesitation.",
        initial: "R",
        author: "Rishabh Ranjan",
        role: "Stanford Admit | Columbia Likely Letter | Robertson Scholar",
      },
    ],
  },
  services: {
    college: {
      title: "College Consulting",
      bullets: [
        [
          "Receive ",
          { text: "unlimited personalized guidance", strong: true },
          " through every phase of the admissions process in any portal from ",
          { text: "HYPSM admits", strong: true },
          " and the Stanford brothers.",
        ],
        [
          "Obtain ",
          { text: "exclusive", strong: true },
          " early action/early decision strategies, advice for major selection in Regular Decision, and ",
          { text: "school-specific", strong: true },
          " essay pointers grounded in insider admissions tactics.",
        ],
        [
          "Be ",
          { text: "roadmapped", strong: true },
          " into extracurriculars and competitions primed for admission using strategized approaches curated by Kang Consulting.",
        ],
        [
          "Receive ",
          { text: "personal mentorship", strong: true },
          " directly from Stanford students who have guided hundreds of applicants.",
        ],
        ["Personalized guidance through every step: school list strategy, essays, timelines, and interview prep."],
      ],
    },
    research: {
      title: "Research Mentorship",
      bullets: [
        [
          "Be personally ",
          { text: "mentored by Stanford students", strong: true },
          " majoring in STEM with access to cutting-edge labs, research networks, and direct links to STEM competitions.",
        ],
        [
          "Have ",
          { text: "unlimited weekly access", strong: true },
          " to both founders — Daniel Kang (Top Award ISEF, STS Scholar, U.S. Rep. EUCYS) and Andrew Kang (ISEF Award Winner, NIH Scholar, TISF 2nd).",
        ],
        [
          "Receive ",
          { text: "award-winning playbooks", strong: true },
          " for science fairs, direct research mentorship, and outreach methods for in-lab placements.",
        ],
      ],
    },
  },
  contact: {
    hero: {
      title: "Tell us how we can help",
      description:
        "Share your story, ambitions, and timeline. We will follow up with next steps, fit, and how we can support your admissions or research goals.",
    },
    nextSteps: {
      title: "What happens next",
      body: "A member of the Kang Consulting team will review your submission and reach out within one business day with next steps.",
      urgentPrefix: "Need something sooner? Email us directly at",
      emailLabel: "support@kangconsulting.org",
      preferCall: "Prefer a phone call? Include your number and the best times to reach you.",
    },

    form: {
      heading: "Start a consultation",
      subheading: "Tell us a little about what you are looking for. We typically reply within one business day.",
      sendingLabel: "Delivering to Kang Consulting",
      successMessage: "Thanks! A member of our team will reach out to you via email shortly.",
      missingFieldsPrefix: "Please fill out:",
      invalidEmailMessage: "Please enter a valid email address.",
      genericError: "Something went wrong.",
      submitLabel: "Submit consultation",
      submittingLabel: "Sending...",
      requiredNote: "*Required fields",
      servicePlaceholder: "Select a service",
      services: [
        { value: "college-consulting", label: "College Consulting" },
        { value: "research-mentorship", label: "Research Mentorship" },
        { value: "both", label: "Both Services" },
        { value: "prestige", label: "Prestige Program" },
      ],
      fields: {
        name: {
          label: "Name*",
          placeholder: "Jane Doe",
          helper: "Your full name",
        },
        email: {
          label: "Email*",
          placeholder: "you@example.com",
          helper: "We will send confirmation here",
        },
        phone: {
          label: "Phone",
          placeholder: "Optional",
          helper: "Optional — include if you prefer a call",
        },
        service: {
          label: "Service*",
          placeholder: "",
          helper: "Select the service you are interested in",
        },
        howDidYouFindUs: {
          label: "How did you find us?",
          placeholder: "Referral, search, social media...",
          helper: "Optional — e.g. referral, search, social media",
        },
        subject: {
          label: "Subject*",
          placeholder: "What should we call this request?",
          helper: "Briefly summarize your request",
        },
        message: {
          label: "Message*",
          placeholder: "Share your goals, timeline, or anything else we should know.",
          helper: "Share any context, goals, or questions.",
        },
      },
    },
  },
  about: {
    heroTitle: "About Us",
    heroBody:
      "As two Stanford brothers deeply interested in uplifting students and preparing them for admissions, we provide elite college admissions advice paired with competitive research opportunities for our clients.\n\nCo-founded by Daniel Kang (ISEF Best of Category winner) and Andrew Kang (ISEF Award Winner / NIH Scholar), our mission is to empower students with competency and white-glove mentorship to achieve their academic dreams.",
    heroEyebrow: "Our Story",
    mentorLabel: "Mentor profile",
    foundedByLabel: "Founded by",
    daniel: {
      name: "Daniel Kang",
      subtitle: "Founder • ISEF Winner • Stanford Scholar",
      paragraphs: [
        "Daniel Kang is the Lead Mentor at Kang Consulting and a Stanford University senior from Guam whose path into elite research and college admissions was entirely self-directed. Without access to established academic pipelines or institutional guidance, Daniel learned how opportunity works by building it himself—cold-emailing professors, transforming his home into a DIY lab, and independently developing a research project that went on to win Best of Category at the Intel ISEF, the first achievement of its kind from the Oceania region.",
        "Daniel later earned full-ride admission to Stanford University and other top institutions without consultants or legacy support. Today, Daniel leads Kang Consulting’s research and admissions mentorship, guiding students across backgrounds—from first-time researchers to international competitors—into universities such as Harvard, MIT, Stanford, Yale, and Princeton, and toward top honors at ISEF, Regeneron STS, and other elite competitions. His mentoring philosophy centers on clarity, authenticity, and ownership, with a singular goal: helping students become the strongest, most compelling version of themselves for rigorous summer program applications and competitive college admissions cycles.",
      ],
      highlightsTitle: "Clients have gone on to:",
      highlights: [
        "Admitted to Stanford, Yale, UPenn, Brown, Columbia, Duke, and more with full ride scholarships",
        "1st Place at Intel ISEF, EUCYS Award (Top 9 at ISEF), 3x ISEF Special Awardee, three-time ISEF Finalist",
        "Nationally recognized as Top 300 Regeneron STS Scholar",
        "Minor Planet Named in Recognition: (34490) Danielkang",
        "First at ISEF, EUCYS, TISF, GISF, and Google State Fair",
      ],
    },
    andrew: {
      name: "Andrew Kang",
      subtitle: "Co-Founder • Questbridge Scholar • Stanford 2029",
      paragraphs: [
        "Andrew Kang is a Stanford University freshman from Guam and the co-founder of Kang Consulting, where his approach to college admissions is grounded in strategy, storytelling, and context rather than surface-level metrics, mentoring students with deep insight. Without a perfect GPA, ultra-high standardized test scores, or elite recommenders, Andrew focused on understanding what admissions officers actually value—intellectual direction, coherence, and narrative strength. In the most competitive admissions cycle to date, this led to his admission to Stanford, Yale, UPenn, Duke, USC, and other top universities, alongside full-ride scholarship offers totaling over $1,000,000, including admission to Washington University in St. Louis without applying.",
        "Even before entering college himself, Andrew helped students gain admission to programs such as UPenn Wharton, mentored researchers to win ISEF grand awards and over $100,000 in scholarship special awards, and guided students through highly competitive research and debate pathways. A published researcher and former NIH intern, Regeneron ISEF NOAA Special Award recipient, national STEM and debate champion, and experienced mentor across multiple admissions portals, Andrew specializes in helping students with nontraditional or uneven profiles craft compelling, high-impact applications that reflect both ambition and authenticity.",
      ],
      highlightsTitle: "Clients have gone on to:",
      highlights: [
        "Admitted to Stanford, Yale, UPenn, Duke, USC, and more with full ride scholarships",
        "Regeneron ISEF NOAA Special Award Recipient",
        "Published Researcher: NIH Intern, UOG Researcher",
        "Admitted to WashU without applying with full-ride scholarship",
        "National STEM Champion, 2nd TISF, NSDA Nationals",
      ],
    },
    team: [
      {
        name: "Mingchuan Cheng",
        role: "Head of Research • Stanford",
        bio: "Mingchuan is a freshman at Stanford University, originally from Salt Lake City, UT. First exposed to science fairs in junior year, when he applied for a local research lab and started working on state of the art prosthetic control methods. Since then, he’s been awarded with top STEM accolades, including ISEF, Regeneron STS, published research, and eventually a likely letter notifying early acceptance to Stanford and acceptances to other top schools. Mingchuan also leads a science fair community with 2000+ members. \n\nCurrently, Mingchuan is diving into the world of tech entrepreneurship at Stanford, being a member of the prestigious Business Association of Stanford Entrepreneurial Students, along with recently raising $100,000 at a $2,000,000 valuation for his healthcare compliance startup. As the new head of research for Kang Consulting, Mingchuan is excited to share his knowledge and experiences in hopes of contributing to the success of other young scientists.",
        image: "/about/mingchuan_white.png",
      },
      {
        name: "Joshua Ayuk",
        role: "Head of Operations",
        bio: "Joshua is a freshman at Stanford University. He grew up in Houston, TX as a First-Gen, Low Income (FGLI) student. Recently discovering a passion for Computer Science, Joshua has navigated his journey through high school as student-athlete in Track and Football, self teaching himself web and app development, and gaining a full ride to Stanford through the Questbridge Match Scholarship. Since then Joshua has also co-created a consumer app for college students with over 4,000+ users and is paving his way through Stanford's vibrant startup community.\n\nCurrently, Joshua is exploring CS and EE at Stanford, and is a founding technical chair member of a rising Stanford club which offers consulting for non-profits. As the new Head of Operations for Kang Consulting, Joshua is excited to facilitate the process of getting students into their dream schools.",
        image: "/about/joshua_headshot_enhanced.png",
      },
    ],
    globalChapters: [
      {
        name: "Anthony Du",
        bio: "Anthony Du is a Stanford University computer science student and undergraduate researcher at Stanford’s Robust Systems Group, where he works on chip efficiency and formal verification methods. An American-born Chinese mentor with deep cultural fluency and a strong grasp of the U.S. admissions process, Anthony specializes in helping students translate their authentic stories into essays that resonate with American admissions readers, especially for international applicants from mainland China. He brings firsthand experience as a 1590 SAT scorer, three-time AIME qualifier, Ross Mathematics Program alumnus, and a student admitted to Stanford, Yale, and multiple T20 universities. \n\nHaving mentored over 20 successful applicants, Anthony is known for his meticulous feedback and narrative clarity—his writing has been described by admissions officers as “beautifully written” and “clearly memorable.” At Kang Consulting, he focuses on college admissions strategy, essay development, and research mentoring, guiding students to present both intellectual depth and personal voice with confidence.",
        role: "Head of Kang Consulting China",
        image: "/about/anthony_white.png",
      },
    ],
  },
};

export async function getDictionary(): Promise<Dictionary> {
  return enUS;
}
