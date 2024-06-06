
<script>
    import { use } from "marked";
    import { listPupils, getPupil } from "../dataservices";
    import { selectedPupil } from "../stores/selectedPupil";
    import Logout from "./logout.svelte";
    import PupilInteraction from "../sveltelib/components/pupil/pupilInteraction.svelte";
    import PupilInteractions from "../sveltelib/components/pupil/pupilInteractions.svelte";
    import pic from "../assets/images/Avatar.jpg";
    import pic1 from "../assets/images/illustrator.jpg";
  
    $: users = $listPupils;

    let userRole = (JSON.parse(localStorage.getItem('user')))?.role;
    let loginCheck = (JSON.parse(localStorage.getItem('user')))?.login;
    let curUserName = (JSON.parse(localStorage.getItem('user')))?.name;
    let curUserID = (JSON.parse(localStorage.getItem('user')))?.id;

    async function pupilRetrieve() {
        if (curUserID) {
            try {
                let pupil = await getPupil(curUserID);
                const pupil_arr = [pupil.pupil_id, pupil.pupil_name, pupil.created_at];
                $selectedPupil = pupil_arr;
                console.log("inside pupil retrieve", $selectedPupil, curUserID);
            } catch (error) {
                console.error("Error retrieving pupil:", error);
            }
        } else {
            console.log("Cannot retrieve empty pupil");
        }
    }

    $: if (userRole === "user" && loginCheck) {
        pupilRetrieve();
    }

    console.log("current id", curUserID);
</script>

<main>
    {#if userRole === "admin" && loginCheck}
        <div class="container-admin">
            <header>
                <div class="logo">
                    <img src={pic} alt="Reading Tutor Logo" />
                    <span>Reading Tutor</span>
                </div>
                <Logout />
            </header>

            <div class="main">
                <div class="containervert-sidebar">
                    {#each users as user}
                        <label>
                            <input type="radio" bind:group={$selectedPupil} value={user} />
                            {user[1]}
                        </label>
                    {/each}
                </div>

                <div class="containervert">
                   
                    <div class="pupil-interaction">
                        <PupilInteraction />
                    </div>
                </div>
            </div>
        </div>
    {/if}

    {#if userRole === "user" && loginCheck}
      
        <header>
          
            <div class="logo">           
                <img src={pic} alt="Reading Tutor Logo" />
                <span>Reading Tutor</span>
            </div>
          <div >  <Logout /> </div>
        </header>

        <div class="main">
            <div class="welcome-message">
                <img src={pic1} alt="Illustration" />
                <div>
                    <h1>Reading Tutor</h1>
                    <p>Hi, there! I am your Reading Tutor! I am here to help you read stories, learn new words, and have lots of fun along the way! Let me know when you are ready to start reading.</p>
                </div>
            </div>

            <div class="container-user">
                <div class="containervert">
                    <div class="pupil-interactions">
                        <PupilInteractions />
                    </div>
                    <div class="pupil-interaction">
                        <PupilInteraction />
                    </div>
                </div>
            </div>
        </div>
      
    {/if}
</main>

<style>
    /* Global Styles */
    main {
        font-family: Arial, sans-serif;
        background-image: url('../assets/images/background2.jpeg');
        background-size: cover;
        margin: 0;
        padding: 0;
    }

    /* Header */
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: rgb(255, 255, 255);
        padding: 10px 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        color: black; /* Set text color to black */
    }

    .logo {
        display: flex;
        align-items: center;
    }

    .logo img {
        height: 50px;
        border-radius: 50%;
        margin-right: 10px;
    }

    .logo span {
        font-weight: bold; /* Make the text bold */
        color: black; /* Ensure the text color is black */
        font-size: x-large;
    }
    /* Welcome Message */
    .welcome-message {
        display: flex;
        align-items: center;
        background-color: #4a90e2;
        color: white;
        border-radius: 20px;
        padding: 20px;
        margin: 20px;
    }

    .welcome-message img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        margin-right: 20px;
    }

    .welcome-message h1 {
        margin: 0;
        font-size: 3em;
    }

    .welcome-message p {
        margin: 5px 0 0 0;
        font-size: x-large;
    }

  

    /* Admin and User Containers */
    .container-admin, .container-user {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: calc(100vh - 62px);
        overflow: hidden;
    }

    .containervert-sidebar {
        display: flex;
        flex-direction: column;
        width: 10%;
        background: #ffffff;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
        padding: 10px;
    }

    .containervert-sidebar label {
        margin-bottom: 10px;
    }

    .containervert-sidebar input[type="radio"] {
        margin-right: 10px;
    }

    .containervert {
        display: flex;
        flex: 1;
        flex-direction: row-reverse;
        overflow: hidden;
        padding: 20px;
    }

    .pupil-interactions {
        flex: 2;
        margin-right: 20px;
    }

    .pupil-interaction {
        flex: 1;
    }
</style>
