<!-- src/Admin.svelte -->
<script>
    import { universities } from '../stores/universityStore';
    import { get } from 'svelte/store';
    import { navigate } from 'svelte-routing';

    let universityName = '';
    let departments = '';
    let newId = get(universities).length + 1;

    function addUniversity() {
        const departmentList = departments.split(',').map(dep => dep.trim());
        const newUniversity = { id: newId, name: universityName, departments: departmentList };
        universities.update(unis => [...unis, newUniversity]);
        universityName = '';
        departments = '';
        newId++;
        
        // Save universities to local storage after adding
       
        // Redirect to University Page after adding the university
        navigate('university');
        localStorage.setItem('universities', JSON.stringify(get($universities)));
        
    }

    function deleteUniversity(id) {
        universities.update(unis => unis.filter(u => u.id !== id));
    }
</script>

<main>
    <h1>Admin Panel</h1>
    <div>
        <label>
            University Name:
            <input type="text" bind:value={universityName} />
        </label>
    </div>
    <div>
        <label>
            Departments (comma separated):
            <input type="text" bind:value={departments} />
        </label>
    </div>
    <button on:click={addUniversity}>Add University</button>

    <h2>Existing Universities:</h2>
    {#each $universities as university}
        <div>
            <p>{university.name}</p>
            <button on:click={() => deleteUniversity(university.id)}>Delete</button>
        </div>
    {/each}
</main>

<style>
    main {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        font-family: Arial, sans-serif;
    }

    h1 {
        text-align: center;
        margin-bottom: 20px;
    }

    div {
        margin-bottom: 20px;
    }

    label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
    }

    input[type="text"] {
        width: calc(100% - 20px);
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
    }

    button {
        display: block;
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 4px;
        background-color: #007BFF;
        color: white;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #0056b3;
    }

    button:active {
        background-color: #004494;
    }
</style>