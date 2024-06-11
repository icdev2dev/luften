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
        // localStorage.setItem('universities', JSON.stringify(get($universities)));
        
        // Redirect to University Page after adding the university
        navigate('university');
    }

    function deleteUniversity(id) {
        universities.update(unis => unis.filter(u => u.id !== id));
    }
</script>

<main>
    <h1>Super Admin Panel</h1>
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
    <div class="card-container">
        {#each $universities as university}
            <div class="card">
                <div class="card-content">
                    <p class="university-name">{university.name}</p>
                    <button class="delete-button" on:click={() => deleteUniversity(university.id)}>Delete</button>
                </div>
            </div>
        {/each}
    </div>
</main>

<style>
    main {
        max-width: 100%;
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

    .card-container {
        display: flex;
        overflow-x: auto;
    }

    .card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        min-width: 200px;
        margin-right: 10px;
    }

    .card-content {
        text-align: center;
    }

    .university-name {
        font-size: 18px;
        font-weight: bold;
        margin: 0 0 10px 0;
    }

    .delete-button {
        padding: 5px 10px;
        border: none;
        border-radius: 4px;
        background-color: #dc3545;
        color: white;
        cursor: pointer;
        font-size: 14px;
        transition: background-color 0.3s;
    }

    .delete-button:hover {
        background-color: #c82333;
    }

    .delete-button:active {
        background-color: #bd2130;
    }
</style>
