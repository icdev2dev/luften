<!-- src/ProjectPage.svelte -->
<script>
    import { projects } from '../stores/projectStore';
</script>

<main>
    <h1>All Projects</h1>
    <div class="project-container">
        {#each $projects as project}
            <div class="project-card">
                <h2>{project.name}</h2>
                <p>Department: {project.department}</p>
                <p>Description: {project.description}</p>
            </div>
        {/each}
    </div>
</main>

<style>
    main {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        font-family: Arial, sans-serif;
    }

    h1 {
        text-align: center;
        margin-bottom: 20px;
    }

    .project-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-gap: 20px;
    }

    .project-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 16px;
        background-color: #f9f9f9;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .project-card h2 {
        margin-bottom: 8px;
    }

    .project-card p {
        margin-top: 8px;
        font-size: 14px;
        color: #666;
    }
</style>
