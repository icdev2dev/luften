// projectStore.js
import { writable } from 'svelte/store';

// Initial projects data
const initialProjects = [
    { id: 1, name: 'Project 1', department: 'Computer Science' },
    { id: 2, name: 'Project 2', department: 'Electrical Engineering' },
    { id: 3, name: 'Project 3', department: 'Mechanical Engineering' }
];

// Create a writable store for projects
export const projects = writable(initialProjects);

// Add functions to interact with the projects data if needed
