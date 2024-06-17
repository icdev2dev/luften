<!-- <script>

import { listPupils } from "../../dataservices";
import { createPupil, deletePupil } from "../../dataservices";
import { exportPupilMessages } from "../../dataservices";

import { refreshPupils } from "../../dataservices";
$: users = $listPupils

let selectedUsers  = [""]

let newUser = '';
let newPassword = '';
let newRole ='';
	
const options = [{
	value: 'admin',
	label: 'Administrator',
}, {
	value: 'user',
	label: 'User',
}]

function toDateTime(secs) {
    var t = new Date(0)
    t.setSeconds(secs)
    return t
}
  // Function to add a new user
async  function createUser() {
    if (newUser.trim() !== '' && !users.includes(newUser)) {
        
        await createPupil(newUser, newPassword, newRole)
        await refreshPupils()

        newUser = ''; // Reset the input after adding
        newPassword = '';
        newRole = '';
    }
  }

  // Function to delete the selected user
  async function deleteUser() {

    for (const selectedUser of selectedUsers) {
       await deletePupil(selectedUser[0]);
    }
    await refreshPupils()

  }

  // Function to export pupil chat history
  async function exportUserMessages(user) {
    if (user !== '' && users.includes(user)){
      await exportPupilMessages(user[0])
    }
  }

</script>


<div>
  <h2> User Administration </h2>

</div>

<div class="container">
    <div class="user-select">
      {#each users as user}
        <label> 
          <input type="checkbox" bind:group={selectedUsers} value={user} />
          {user[1]}
        </label>
      {/each}



       
      <input type="text" bind:value={newUser} placeholder="New user name" />
      <input type="text" bind:value={newPassword} placeholder="New user password" />
      {#each options as { value, label }}
        <label >
          <input type="radio" bind:group={newRole} name={label} value={value}/>
          {label}
        </label>
      {/each}

      <div class="button-container">
        <button on:click={createUser}>Create User</button>
        {#if users.length > 0}
            <button on:click={deleteUser} disabled={users.length === 0}>Delete Selected User/s</button>
        {/if}
      </div>

    </div>

    
    <div class="user-content">
        {#if selectedUsers.length > 0}


        <table>
            <thead>
              <tr>
                {#each selectedUsers as user}
                   <th> {user[1]} </th>
                {/each}

              </tr>
            </thead>
            <tbody>
                <tr>
                    {#each selectedUsers as user}
                        <td> {user[0]} </td>
                    {/each}
                </tr>
                <tr>
                    {#each selectedUsers as user}
                        <td> {toDateTime(user[2])} </td>
                    {/each}
                </tr>

                <tr>
                    {#each selectedUsers as user}
                        <td> Tokens Consumed </td>
                    {/each}
                </tr>

                <tr>
                    {#each selectedUsers as user}
                        <td> Assessment </td>
                    {/each}
                </tr>

                <tr>
                  {#each selectedUsers as user}
                    <td>
                      <div class="button-container">
                        <button on:click={exportUserMessages(user)}>Export Chat</button>
                      </div>
                    </td>
                  {/each}
                </tr>

            </tbody>
          </table>
        

        {/if}
    </div>
  </div>



  <style>
    .container {
      display: flex;
      width: 100%;
    }
  
    
    .button-container {
     display: flex; /* Enables flexbox layout */
     justify-content: space-between; /* Spreads buttons across available space */
    margin-top: 10px; /* Top margin for spacing */
  }
    .user-select {
      width: 20%;
      padding: 10px;
    }
    
    .user-content {
      width: 80%;
      padding: 10px;
      background-color: #282727; /* Light gray background for the content area */
    }
    
    label {
      display: block; /* Makes labels stack vertically */
      margin-bottom: 10px; /* Adds space between each label */
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #a7a9a9;
    }

  </style>
   -->

   <script>
    import { listPupils, createPupil, deletePupil, exportPupilMessages, refreshPupils } from "../../dataservices";
    import { universities } from "../../stores/universityStore";
    import { projects } from "../../stores/projectStore";
    import { get } from 'svelte/store';

    let users = $listPupils;

    let selectedUsers = [];
    let newUser = '';
    let newPassword = '';
    let newRole = '';
    let selectedUniversity = '';
    let selectedDepartment = '';
    let selectedProject = '';
    let availableDepartments = [];
    let availableProjects = [];

    const options = [
        { value: 'admin', label: 'Administrator' },
        { value: 'user', label: 'User' }
    ];

    let universityList = get(universities);
    let projectList = get(projects);

    function toDateTime(secs) {
        var t = new Date(0);
        t.setSeconds(secs);
        return t;
    }

    async function createUser() {
        if (newUser.trim() !== '' && !users.includes(newUser)) {
            await createPupil(newUser, newPassword, newRole, selectedUniversity, selectedDepartment, selectedProject);
            await refreshPupils();
            newUser = '';
            newPassword = '';
            newRole = '';
            selectedUniversity = '';
            selectedDepartment = '';
            selectedProject = '';
        }
    }

    async function deleteUser() {
        for (const selectedUser of selectedUsers) {
            await deletePupil(selectedUser[0]);
        }
        await refreshPupils();
    }

    async function exportUserMessages(user) {
        if (user !== '' && users.includes(user)) {
            await exportPupilMessages(user[0]);
        }
    }

    function updateDepartments() {
        const selectedUni = universityList.find(uni => uni.name === selectedUniversity);
        availableDepartments = selectedUni ? selectedUni.departments : [];
        selectedDepartment = '';
        availableProjects = [];
    }

    function updateProjects() {
        const selectedDeptProjects = projectList.filter(proj => proj.department === selectedDepartment);
        availableProjects = selectedDeptProjects;
        selectedProject = '';
    }
</script>

<div>
    <h2>User Administration</h2>
</div>

<div class="container">
    <div class="user-select">
        {#each users as user}
            <label>
                <input type="checkbox" bind:group={selectedUsers} value={user} />
                {user[1]}
            </label>
        {/each}

        <!-- Form to create new user -->
        <input type="text" bind:value={newUser} placeholder="New user name" />
        <input type="text" bind:value={newPassword} placeholder="New user password" />

        {#each options as { value, label }}
            <label>
                <input type="radio" bind:group={newRole} name="role" value={value} />
                {label}
            </label>
        {/each}

        <label>
            University:
            <select bind:value={selectedUniversity} on:change={updateDepartments}>
                <option value="" disabled>Select university</option>
                {#each universityList as university}
                    <option value={university.name}>{university.name}</option>
                {/each}
            </select>
        </label>

        <label>
            Department:
            <select bind:value={selectedDepartment} on:change={updateProjects}>
                <option value="" disabled>Select department</option>
                {#each availableDepartments as department}
                    <option value={department}>{department}</option>
                {/each}
            </select>
        </label>

        <label>
            Project:
            <select bind:value={selectedProject}>
                <option value="" disabled>Select project</option>
                {#each availableProjects as project}
                    <option value={project.name}>{project.name}</option>
                {/each}
            </select>
        </label>

        <div class="button-container">
            <button on:click={createUser}>Create User</button>
            {#if users.length > 0}
                <button on:click={deleteUser} disabled={users.length === 0}>Delete Selected User/s</button>
            {/if}
        </div>
    </div>

    <div class="user-content">
        {#if selectedUsers.length > 0}
            <table>
                <thead>
                    <tr>
                        {#each selectedUsers as user}
                            <th>{user[1]}</th>
                        {/each}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {#each selectedUsers as user}
                            <td>{user[0]}</td>
                        {/each}
                    </tr>
                    <tr>
                        {#each selectedUsers as user}
                            <td>{toDateTime(user[2])}</td>
                        {/each}
                    </tr>
                    <tr>
                        {#each selectedUsers as user}
                            <td>Tokens Consumed</td>
                        {/each}
                    </tr>
                    <tr>
                        {#each selectedUsers as user}
                            <td>Assessment</td>
                        {/each}
                    </tr>
                    <tr>
                        {#each selectedUsers as user}
                            <td>
                                <div class="button-container">
                                    <button on:click={() => exportUserMessages(user)}>Export Chat</button>
                                </div>
                            </td>
                        {/each}
                    </tr>
                    <tr>
                        
                    </tr>
                </tbody>
            </table>
        {/if}
    </div>
</div>

<style>
    .container {
        display: flex;
        width: 100%;
    }
    
    .button-container {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }
    
    .user-select {
        width: 20%;
        padding: 10px;
    }
    
    .user-content {
        width: 80%;
        padding: 10px;
        background-color: #282727;
    }
    
    label {
        display: block;
        margin-bottom: 10px;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        border: 1px solid #ccc;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #a7a9a9;
    }
</style>
