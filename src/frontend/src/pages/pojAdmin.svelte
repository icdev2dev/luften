<script>
    import { projects } from '../stores/projectStore';
    import { get } from 'svelte/store';

    let projectName = '';
    let projectDescription = '';
    let selectedDepartment = '';

    function addProject() {
        if (projectName.trim() !== '' && selectedDepartment.trim() !== '') {
            const newProject = { name: projectName, description: projectDescription, department: selectedDepartment };
            projects.update(proj => [...proj, newProject]);
            projectName = '';
            projectDescription = '';
            selectedDepartment = '';
        }
    }
</script>

<main>
    <h1>Admin Panel - Add Project</h1>
    <div class="form-container">
        <label>
            Project Name:
            <input type="text" bind:value={projectName} />
        </label>
        <label>
            Department:
            <input type="text" bind:value={selectedDepartment} />
        </label>
        <label>
            Description:
            <textarea rows="8" bind:value={projectDescription}></textarea>
        </label>
        <button on:click={addProject}>Add Project</button>
    </div>
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

    .form-container {
        margin-top: 20px;
    }

    label {
        display: block;
        font-weight: bold;
        margin-bottom: 10px;
    }

    input[type="text"], textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
        margin-bottom: 10px;
    }

    textarea {
        resize: vertical;
        height: 150px;
    }

    button {
        padding: 10px 20px;
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
