// Portfolio projects
const projectsData = [
  {
    num: "01",
    cat: "DATA ANALYTICS",
    title: "Android Play Store Analysis",
    desc: "Comprehensive EDA and clustering analysis on Android Play Store dataset to uncover app market trends, user preferences, and performance patterns.",
    features: [
      "Exploratory Data Analysis on ratings, installs & reviews",
      "K-Means clustering to segment apps by key features",
      "Market trend insights for data-driven app strategy",
      "Visualization of distinct app performance clusters",
    ],
    stack: ["Python", "K-Means", "Pandas", "Matplotlib", "Scikit-learn"],
    gradient: "linear-gradient(135deg,#1a56db,#06b6d4)",
    icon: "📊",
  },
  {
    num: "02",
    cat: "AI · RESEARCH",
    title: "AI-Powered HR Recruitment System",
    desc: "Intelligent recruitment platform automating candidate sourcing, screening and ranking. Published in IJCRT (April 2025).",
    features: [
      "Automated resume screening using NLP techniques",
      "ML-based candidate ranking and shortlisting",
      "Predictive analytics on historical hiring data",
      "Bias reduction through data-driven decisions",
    ],
    stack: ["Python", "NLP", "Machine Learning", "Predictive Analytics"],
    gradient: "linear-gradient(135deg,#7c3aed,#3b7eff)",
    icon: "🤖",
  },
{
  num: "03",
  cat: "JAVA FULL STACK",

  title: "Hospital Management System",

  desc: "A full-stack Hospital Management System designed to streamline healthcare operations through secure management of patients, doctors, appointments, medical records, billing, laboratory services, pharmacy, and prescriptions.",

  features: [
    "Secure JWT authentication and role-based access control",
    "Patient, doctor, department, and appointment management",
    "Medical records, billing, laboratory, pharmacy, and prescription modules",
    "RESTful APIs connecting React frontend with Spring Boot backend"
  ],

  stack: [
    "Java",
    "Spring Boot",
    "React.js",
    "MySQL",
    "JWT",
    "REST API"
  ],

  gradient: "linear-gradient(135deg,#06b6d4,#f59e0b)",

  icon: "🏥",

  githubUrl: null,

  demoUrl: null,
},
];

export default projectsData;
