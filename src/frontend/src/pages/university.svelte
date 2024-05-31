<!--  
<script>
    let universities = [
        { id: 1, name: "University A", departments: ["Computer Science", "Mathematics", "Physics"] },
        { id: 2, name: "University B", departments: ["Biology", "Chemistry", "Environmental Science"] },
        { id: 3, name: "University C", departments: ["Engineering", "Economics", "History"] },
    ];

    let selectedUniversity = null;

    function selectUniversity(universityId) {
        selectedUniversity = selectedUniversity === universityId ? null : universityId;
    }

    function handleDepartmentClick(department) {
        console.log("Clicked on department:", department);
    }
</script>

<main>
    <h1>Universities</h1>
    <div class="university-container">
        {#each universities as university}
            <div class="university-card" on:click={() => selectUniversity(university.id)}>
                <h2>{university.name}</h2>
            </div>
        {/each}
    </div>

    {#if selectedUniversity !== null}
        <div class="department-container show">
            <h2>Departments at {universities.find(u => u.id === selectedUniversity).name}</h2>
            <ul class="department-list">
                {#each universities.find(u => u.id === selectedUniversity).departments as department}
                    <li><a href="#" on:click={() => handleDepartmentClick(department)}>{department}</a></li>
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
 -->

 <script>
    import { navigate } from "svelte-routing";
    import Computerscience from "./computerscience.svelte";

    let universities = [
        { id: 1, name: "University A", departments: ["Computer Science", "Mathematics", "Physics"] },
        { id: 2, name: "University B", departments: ["Biology", "Chemistry", "Environmental Science"] },
        { id: 3, name: "University C", departments: ["Engineering", "Economics", "History"] },
    ];

    let selectedUniversity = null;

    function selectUniversity(universityId) {
        selectedUniversity = selectedUniversity === universityId ? null : universityId;
    }

    function handleDepartmentClick(department) {
        if (department === "Computer Science") {
            navigate('/computerscience'); // Navigate to Computer Science page
        } else {
            console.log("Clicked on department:", department);
        }
    }
</script>

<main>
    <h1>Universities</h1>
    <div class="university-container">
        {#each universities as university}
            <div class="university-card" on:click={() => selectUniversity(university.id)}>
                <h2>{university.name}</h2>
            </div>
        {/each}
    </div>

    {#if selectedUniversity !== null}
        <div class="department-container show">
            <h2>Departments at {universities.find(u => u.id === selectedUniversity).name}</h2>
            <ul class="department-list">
                {#each universities.find(u => u.id === selectedUniversity).departments as department}
                    <li>
                        <a href="#" on:click={() => handleDepartmentClick(department)}>{department}</a>
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

