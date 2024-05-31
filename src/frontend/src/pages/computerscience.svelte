<script>
   

    let projects = [
        { id: 1, title: "Project 1", description: "Description of Project 1" },
        { id: 2, title: "Project 2", description: "Description of Project 2" },
        { id: 3, title: "Project 3", description: "Description of Project 3" },
        // Add more projects as needed
    ];
</script>

<main>
    <h1>Projects of Computer Science</h1>
    <div class="project-container">
        {#each projects as project}
            <div class="project-card">
                <h2>{project.title}</h2>
                <p>{project.description}</p>
            </div>
        {/each}
    </div>
</main>

<style>
    .project-container {
        display: flex;
        flex-wrap: wrap; /* Allow projects to wrap to the next line if needed */
        gap: 20px;
        margin-top: 20px;
    }

    .project-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 16px;
        cursor: pointer;
        transition: transform 0.2s;
        flex: 1 1 auto; /* Allows the card to grow and shrink */
        max-width: 300px; /* Optional: Set a maximum width for each card */
    }

    .project-card:hover {
        transform: scale(1.05);
    }

    .project-card h2 {
        margin-top: 0;
    }
</style>
