import type { TrackId } from "@/types";

export interface RoadmapStage {
  title: string;
  /** A suggested pace for a beginner studying alongside college or work. Four two-week stages, eight weeks in all. Not a promise or a programme schedule. */
  pace: string;
  topics: string[];
  /** A concrete thing to build or show at the end of the stage. */
  milestone: string;
}

/**
 * Beginner roadmaps, one per track. Copy deliberately avoids fees, cohort dates,
 * placement claims and links to specific paid courses.
 */
export const ROADMAPS: Record<TrackId, RoadmapStage[]> = {
  "ai-ml": [
    { title: "Foundations", pace: "Weeks 1–2", topics: ["Python basics", "Loading and cleaning data with pandas", "Simple charts", "Mean, spread and distributions"], milestone: "Clean and chart a public dataset, and write down three things you notice." },
    { title: "Core machine learning", pace: "Weeks 3–4", topics: ["Regression and classification", "Train and test splits", "scikit-learn basics", "Accuracy, precision and recall"], milestone: "Predict customer churn with a simple classifier and explain how well it works." },
    { title: "Go deeper", pace: "Weeks 5–6", topics: ["Spotting overfitting", "Cross-validation", "Feature engineering basics", "Clustering"], milestone: "Compare three models on one problem and explain why the best one won." },
    { title: "Ship it", pace: "Weeks 7–8", topics: ["Wrapping a model in a small API or app", "A simple web demo", "Writing a clear README"], milestone: "A demo on GitHub that someone else can try in a minute." },
  ],
  "web-dev": [
    { title: "Foundations", pace: "Weeks 1–2", topics: ["HTML & CSS basics", "JavaScript fundamentals", "Git and GitHub", "How the web works: HTTP, DNS, browsers"], milestone: "A static personal webpage live on GitHub Pages." },
    { title: "Interactive front-end", pace: "Weeks 3–4", topics: ["DOM manipulation", "Fetching data from APIs", "Intro to React", "Responsive design with CSS"], milestone: "A React app that fetches and displays live data from a public API." },
    { title: "Back-end basics", pace: "Weeks 5–6", topics: ["Node.js and Express (or Next.js API routes)", "Databases: SQL basics and one ORM", "Authentication with sessions or JWTs"], milestone: "A full-stack app with sign-in, a database and at least two protected pages." },
    { title: "Ship it", pace: "Weeks 7–8", topics: ["Deploying to a cloud platform", "Environment variables and secrets", "Performance basics: images, caching, Lighthouse"], milestone: "Your full-stack app live on a real URL with a score above 80 in Lighthouse." },
  ],
  "cloud-engineering": [
    { title: "Foundations", pace: "Weeks 1–2", topics: ["Linux command line", "Networking basics: IP, DNS, TCP/UDP, HTTP/S", "What cloud is and why it exists", "One cloud provider's free tier: sign up and explore"], milestone: "Launch a virtual machine on a cloud provider and host a simple website on it." },
    { title: "Core cloud services", pace: "Weeks 3–4", topics: ["Compute: VMs and serverless functions", "Storage: object storage and databases", "IAM: users, roles and least privilege", "Billing and cost basics"], milestone: "Deploy a small app that uses compute, storage and a managed database — all within the free tier." },
    { title: "Networking & Infrastructure as Code", pace: "Weeks 5–6", topics: ["VPCs, subnets, security groups and load balancers", "Terraform basics: write, plan, apply", "Managing secrets safely", "DNS and certificates"], milestone: "Provision the same app twice — staging and production — using a Terraform script." },
    { title: "Reliability & scale", pace: "Weeks 7–8", topics: ["Auto-scaling groups", "CloudWatch or equivalent: metrics and alerts", "Backup and disaster recovery basics", "Cost optimisation: right-sizing and reserved capacity"], milestone: "A monitored, auto-scaling deployment with a runbook for the two most likely failure scenarios." },
  ],
  "devops": [
    { title: "Foundations", pace: "Weeks 1–2", topics: ["Git branching strategies", "Linux command line and Bash scripts", "Containers: Docker basics", "What CI/CD is and why it matters"], milestone: "Containerise a small app and run it with a single command." },
    { title: "Pipelines", pace: "Weeks 3–4", topics: ["GitHub Actions or equivalent: triggers, jobs, steps", "Automated testing in the pipeline", "Building and pushing a Docker image", "Environment variables and secrets in CI"], milestone: "A pipeline that tests, builds and publishes a Docker image on every push." },
    { title: "Deployment & orchestration", pace: "Weeks 5–6", topics: ["Container orchestration basics: Kubernetes concepts", "Rolling updates and rollbacks", "Deploying to a cloud environment from CI", "Blue-green and canary deployments"], milestone: "Your pipeline deploys to a real environment and rolls back automatically on failure." },
    { title: "Observability & on-call", pace: "Weeks 7–8", topics: ["Logs, metrics and traces: the three pillars", "Setting up alerts and dashboards", "Writing runbooks and post-mortems", "On-call culture and incident response"], milestone: "A dashboard with meaningful alerts and a one-page runbook for your app's top failure mode." },
  ],
  "cyber-security": [
    { title: "Foundations", pace: "Weeks 1–2", topics: ["Linux command line", "Networking: IP, DNS, TCP/UDP, HTTP/S", "How common attacks work: phishing, SQLi, XSS", "Password hygiene and 2FA"], milestone: "Set up a Linux virtual machine and explain how a packet travels from browser to server." },
    { title: "Recon & scanning", pace: "Weeks 3–4", topics: ["nmap port scanning", "Enumeration basics", "OWASP Top 10 overview", "Using a safe lab target (e.g. TryHackMe or HackTheBox free rooms)"], milestone: "Scan a test machine, list open ports and services, and describe two potential risks." },
    { title: "Exploitation basics", pace: "Weeks 5–6", topics: ["SQL injection and XSS in a safe lab", "Privilege escalation concepts", "Burp Suite basics", "Writing a basic findings report"], milestone: "Complete a guided CTF room and document every step in a short write-up." },
    { title: "Defence and response", pace: "Weeks 7–8", topics: ["Firewalls and network segmentation", "Log analysis and basic SIEM", "Incident response steps", "Secure coding principles"], milestone: "A one-page incident response plan for a small fictional business." },
  ],
  fde: [
    { title: "Foundations", pace: "Weeks 1–2", topics: ["One language: Python or JavaScript", "APIs and JSON", "SQL basics", "Git"], milestone: "A script that pulls data from a public API and saves it neatly." },
    { title: "Integrations", pace: "Weeks 3–4", topics: ["REST and webhooks", "Cleaning messy data", "Automating spreadsheets and CSV files"], milestone: "Automate a messy weekly report from start to finish." },
    { title: "Understand the customer", pace: "Weeks 5–6", topics: ["Asking good discovery questions", "Mapping a workflow", "Scoping what to build first"], milestone: "Map a real process, for example at a local shop, and propose a small fix." },
    { title: "Deliver and support", pace: "Weeks 7–8", topics: ["Building the small tool", "A short handover guide", "Collecting feedback"], milestone: "A small tool that one real person tries, with a one-page note of what changed." },
  ],
  mobile: [
    { title: "Foundations", pace: "Weeks 1–2", topics: ["Programming basics in Kotlin, Dart or JavaScript", "Screen layout basics", "Git"], milestone: "Recreate one screen of an app you like." },
    { title: "Your first app", pace: "Weeks 3–4", topics: ["Pick a path: Flutter, React Native, or native Android or iOS", "State and navigation", "Saving data on the phone"], milestone: "A habit tracker that remembers your habits after you close it." },
    { title: "Real-world apps", pace: "Weeks 5–6", topics: ["Calling an API", "Loading, empty and error states", "Permissions and accessibility"], milestone: "An app that shows a list from an API and handles a bad connection." },
    { title: "Release", pace: "Weeks 7–8", topics: ["Testing on real devices", "Performance basics", "Store listings and privacy notes"], milestone: "A beta-tested app, with feedback from a few real users." },
  ],
  "ai-dev": [
    { title: "Foundations", pace: "Weeks 1–2", topics: ["Python basics", "How large language models work: tokens, context, temperature", "Using a chat model and comparing outputs", "APIs and JSON"], milestone: "Write five prompts for one task, compare the answers, and explain what changed." },
    { title: "Prompting & RAG", pace: "Weeks 3–4", topics: ["System prompts and structured outputs", "Calling a language model API", "Splitting documents into chunks and embedding them", "Retrieval-augmented generation (RAG) and citing sources"], milestone: "A chatbot that answers questions from your own PDF notes and shows the passages it used." },
    { title: "Agents & tools", pace: "Weeks 5–6", topics: ["Tool / function calling: give the model a weather or search tool", "The plan, act, observe loop", "Keeping memory of past steps", "Bounded retries and asking a human before risky actions"], milestone: "An agent that searches, reads results, and saves a sourced summary — and asks before doing anything risky." },
    { title: "Quality & safety", pace: "Weeks 7–8", topics: ["Evaluating outputs on a fixed test set", "Reducing hallucinations", "Guardrails and permissions", "Handling private data safely"], milestone: "An evaluation sheet showing how your prompts and agent improved, with a written list of test scenarios including the awkward ones." },
  ],
};
