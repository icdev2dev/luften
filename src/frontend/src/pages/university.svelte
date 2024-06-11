<!-- src/UniversityPage.svelte -->
<script>
    import { universities } from '../stores/universityStore';
    import { projects } from '../stores/projectStore'; // Import projects store
    import { get } from 'svelte/store';
    import { navigate } from 'svelte-routing';

    let selectedUniversity = null;

    // Automatically subscribe to changes in the universities and projects store
    $: universityList = $universities;
    $: projectList = $projects;

    function selectUniversity(universityId) {
        selectedUniversity = selectedUniversity === universityId ? null : universityId;
    }

    function handleDepartmentClick(department) {
        navigate(`/createproject/${department}`); // Navigate to Project Creation page for selected department
    }

    // Function to filter projects based on selected university and department
    function getProjectsForDepartment(department) {
        return projectList.filter(project => project.department === department);
    }
</script>

<main>
    <h1>Universities</h1>
    <div class="university-container">
        {#each universityList as university}
            <div class="university-card" on:click={() => selectUniversity(university.id)}>
                <h2>{university.name}</h2>
            </div>
        {/each}
    </div>

    {#if selectedUniversity !== null}
        <div class="department-container show">
            <h2>Departments at {universityList.find(u => u.id === selectedUniversity).name}</h2>
            <ul class="department-list">
                {#each universityList.find(u => u.id === selectedUniversity).departments as department}
                    <li>
                        <a href="#" on:click={() => handleDepartmentClick(department)}>{department}</a>
                        <!-- Display projects for the department -->
                        <ul>
                            {#each getProjectsForDepartment(department) as project}
                                <li>{project.name}</li>
                            {/each}
                        </ul>
                    </li>
                {/each}
            </ul>
        </div>
    {/if}
</main>

  
<style>
    .university-container {
        display: flex;
        overflow-x: auto; /* Allows horizontal scrolling if cards overflow */
    }
    .university-card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 16px;
        margin: 8px;
        cursor: pointer;
        transition: transform 0.2s;
        flex: 1 1 auto; /* Allows the card to grow and shrink */
        max-width: 300px; /* Optional: Set a maximum width for each card */
    }
    .university-card:hover {
        transform: scale(1.05);
    }
    .department-container {
        margin-top: 16px;
        background-color: black; /* Change background color to black */
        border-radius: 8px;
        padding: 16px;
        display: none; /* Initially hide the department card */
    }
    .department-container.show {
        display: block; /* Show the department card when selected */
    }
    .department-list {
        list-style-type: none;
        padding: 0;
    }
    .department-list li {
        padding: 8px 0;
        color: white; /* Set text color to white */
    }
</style>
