import { TRACK_IDS, type Track, type TrackId } from "@/types";

/**
 * Track catalogue. Edit this file to add or update tracks; the UI renders
 * whatever is listed here. Copy deliberately avoids fees, cohort dates and
 * placement claims.
 */
export const TRACKS: Record<TrackId, Track> = {
  "ai-ml": {
    id: "ai-ml",
    name: "AI/ML Engineering",
    shortName: "AI/ML",
    emoji: "📊",
    tagline: "Teach machines to learn from data.",
    description:
      "AI/ML engineers turn data into predictions and decisions. You clean data, train and evaluate models, and ship them so real products can use them.",
    careerPath: "Data Analyst → ML Engineer → Applied Scientist / ML Platform Engineer",
    skills: ["Python & pandas", "Model training & evaluation", "Statistics basics"],
    project: "Predict whether a customer will leave using a small public dataset and a simple classifier.",
  },
  "web-dev": {
    id: "web-dev",
    name: "Web Development",
    shortName: "Web Dev",
    emoji: "🌐",
    tagline: "Build sites and apps people use every day.",
    description:
      "Web developers design and build everything that runs in a browser — from landing pages to full-stack apps — caring about speed, accessibility and clean code.",
    careerPath: "Junior Web Developer → Full-Stack Engineer → Senior / Lead Engineer",
    skills: ["HTML, CSS & JavaScript", "React / Next.js", "REST APIs & databases"],
    project: "Build and deploy a full-stack web app with a database, user auth and a live URL.",
  },
  "cloud-engineering": {
    id: "cloud-engineering",
    name: "Cloud Engineering",
    shortName: "Cloud",
    emoji: "☁️",
    tagline: "Design and run the infrastructure the internet lives on.",
    description:
      "Cloud engineers architect, build and manage scalable infrastructure on platforms like AWS, Azure or GCP — handling compute, storage, networking and cost at scale.",
    careerPath: "Cloud Support Engineer → Cloud Engineer → Solutions / Platform Architect",
    skills: ["AWS / Azure / GCP fundamentals", "Networking & IAM", "Infrastructure as Code (Terraform)"],
    project: "Deploy a scalable web app on a cloud provider using Infrastructure as Code, with auto-scaling and monitoring.",
  },
  "devops": {
    id: "devops",
    name: "DevOps Engineering",
    shortName: "DevOps",
    emoji: "🔄",
    tagline: "Ship software faster, safer and more reliably.",
    description:
      "DevOps engineers bridge development and operations — automating pipelines, containerising apps and building the feedback loops that let teams ship with confidence.",
    careerPath: "Junior DevOps Engineer → Site Reliability Engineer → Platform / SRE Lead",
    skills: ["Docker & Kubernetes", "CI/CD pipelines", "Monitoring & on-call"],
    project: "Containerise an app and build a full CI/CD pipeline that tests, builds and deploys on every push.",
  },
  "cyber-security": {
    id: "cyber-security",
    name: "Cyber Security",
    shortName: "Cyber Security",
    emoji: "🔐",
    tagline: "Find the weaknesses before attackers do.",
    description:
      "Cyber security engineers protect systems, networks and data by finding vulnerabilities, building defences and responding when things go wrong.",
    careerPath: "Security Analyst → Penetration Tester / Security Engineer → Security Architect",
    skills: ["Networking & Linux", "Ethical hacking basics", "Threat analysis & incident response"],
    project: "Set up a home lab, run a basic vulnerability scan on a test machine and write a short findings report.",
  },
  fde: {
    id: "fde",
    name: "Forward Deployed Engineering (FDE)",
    shortName: "FDE",
    emoji: "🤝",
    tagline: "Solve real customer problems with code.",
    description:
      "Forward deployed engineers work close to customers, understand messy business problems and build the integrations and tools that actually solve them.",
    careerPath: "Solutions Engineer → Forward Deployed Engineer → Technical Product / Customer Engineering Lead",
    skills: ["APIs & integrations", "Problem discovery", "Communicating with non-engineers"],
    project: "Automate a repetitive spreadsheet task for a club or office using a script and a simple API.",
  },
  mobile: {
    id: "mobile",
    name: "Mobile App Development",
    shortName: "Mobile",
    emoji: "📱",
    tagline: "Build apps people carry in their pocket.",
    description:
      "Mobile developers design and build apps for Android and iOS, caring about smooth interfaces, offline behaviour and real-device performance.",
    careerPath: "Junior Mobile Developer → Mobile Engineer → Senior / Cross-platform Lead",
    skills: ["Flutter, React Native or Kotlin/Swift", "UI state management", "Local storage & APIs"],
    project: "Build a daily habit tracker that saves progress on the device and shows a weekly streak.",
  },
  "ai-dev": {
    id: "ai-dev",
    name: "AI Development",
    shortName: "AI Dev",
    emoji: "🤖",
    tagline: "Build intelligent products — from prompts to autonomous agents.",
    description:
      "AI developers build products powered by large language models: chatbots, assistants, RAG pipelines, and autonomous agents that plan, use tools, and act on your behalf.",
    careerPath: "Junior AI Developer → GenAI / Agent Engineer → AI Systems Architect",
    skills: ["Prompt design & RAG", "Tool / function calling", "Planning loops & guardrails"],
    project: "Build a research agent that searches the web, answers from your own documents, and saves a sourced summary to a file.",
  },
};

export const TRACK_LIST: Track[] = TRACK_IDS.map((id) => TRACKS[id]);

export function isTrackId(value: unknown): value is TrackId {
  return typeof value === "string" && (TRACK_IDS as readonly string[]).includes(value);
}

export function getTrack(id: TrackId): Track {
  return TRACKS[id];
}
