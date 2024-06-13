// projectStore.js
import { writable } from 'svelte/store';

// Initial projects data
const initialProjects = [
    { id: 1, name: 'Project 1', department: 'Computer Science', description: 'Description of Project 1' },
    { id: 2, name: 'Project 2', department: 'Electrical Engineering', description: 'Description of Project 2' },
    { id: 3, name: 'Project 3', department: 'Mechanical Engineering', description: 'Description of Project 3' }
];

// Create a writable store for projects
export const projects = writable(initialProjects);

// Create a writable store for the selected project
export const selectedProject = writable(null);

// Function to select a project
export function selectProject(project) {
    selectedProject.set(project);
}
