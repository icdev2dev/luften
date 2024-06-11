// src/stores/universityStore.js
import { writable } from 'svelte/store';

export const universities = writable([
    { id: 1, name: "University A", departments: ["Computer Science", "Mathematics", "Physics"] },
    { id: 2, name: "University B", departments: ["Biology", "Chemistry", "Environmental Science"] },
    { id: 3, name: "University C", departments: ["Engineering", "Economics", "History"] },
 ]);
