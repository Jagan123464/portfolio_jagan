// Central barrel export — re-exports all portfolio data.
// This is a convenience file; you can also import from individual data files.
import personalData from './personalData';
import skillsData from './skillsData';
import projectsData from './projectsData';
import experienceData from './experienceData';
import educationData from './educationData';
import certificationsData from './certificationsData';

// Named exports (recommended — import only what you need)
export { personalData, skillsData, projectsData, experienceData, educationData, certificationsData };

// Default export — mirrors the original DATA object for easy reference
const DATA = {
  ...personalData,
  skills: skillsData,
  projects: projectsData,
  experience: experienceData,
  education: educationData,
  certs: certificationsData,
};

export default DATA;
