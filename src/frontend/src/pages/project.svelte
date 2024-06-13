<script>
    import { projects, selectedProject, selectProject } from '../stores/projectStore'; // Import projects store and functions
    import { onDestroy } from 'svelte';

    // Automatically subscribe to changes in the projects store
    $: projectList = $projects;

    let currentSelectedProject;
    const unsubscribe = selectedProject.subscribe(value => {
        currentSelectedProject = value;
    });

    onDestroy(() => {
        unsubscribe();
    });

    function handleCardClick(project) {
        if (currentSelectedProject === project) {
            selectProject(null); // Deselect if the same project is clicked
        } else {
            selectProject(project); // Select the clicked project
        }
    }
</script>

<main>
    <h1>Projects</h1>
    <div class="project-container">
        {#each projectList as project}
            <div class="project-card" on:click={() => handleCardClick(project)}>
                <h3>{project.name}</h3>
                <p>{project.department}</p>
            </div>
        {/each}
    </div>

    {#if currentSelectedProject}
        <div class="description-card">
            <h3>{currentSelectedProject.name}</h3>
            <p>{currentSelectedProject.description}</p>
        </div>
    {/if}
</main>

<style>
    .project-container {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        margin-top: 16px;
    }
    .project-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 16px;
        cursor: pointer;
        transition: transform 0.2s;
        width: calc(33.333% - 32px);
        box-sizing: border-box;
    }
    .project-card:hover {
        transform: scale(1.05);
    }
    .description-card {
        margin-top: 16px;
        background-color: black;
        border-radius: 8px;
        padding: 16px;
        color: white;
    }
</style>
