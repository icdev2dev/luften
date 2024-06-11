<script>
    import { use } from "marked";
    import { listPupils, getPupil } from "../dataservices";
    import { selectedPupil } from "../stores/selectedPupil";
    import Logout from "./logout.svelte";
    import PupilInteraction from "../sveltelib/components/pupil/pupilInteraction.svelte";
    import PupilInteractions from "../sveltelib/components/pupil/pupilInteractions.svelte";

    $: users = $listPupils;

    let userRole = (JSON.parse(localStorage.getItem('user')))?.role;
    let loginCheck = (JSON.parse(localStorage.getItem('user')))?.login;
    let curUserName = (JSON.parse(localStorage.getItem('user')))?.name;
    let curUserID = (JSON.parse(localStorage.getItem('user')))?.id;

    async function pupilRetrieve() {
        if (curUserID !== "") {
            let pupil = await getPupil(curUserID);
            const pupil_arr = [pupil.pupil_id, pupil.pupil_name, pupil.created_at];
            $selectedPupil = pupil_arr;
            console.log("inside pupil retrieve", $selectedPupil, curUserID);
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
    {#if userRole == "admin" && loginCheck}
        <div class="container-admin">
            <header>
                <div class="logo">
                    <img src="../assets/images/Avatar.jpg" alt="Reading Tutor Logo" />
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

    {#if userRole == "user" && loginCheck}
        <header>
            <div class="logo">
                <img src="../assets/images/Avatar.jpg" alt="Reading Tutor Logo" />
                <span>Reading Tutor</span>
            </div>
            <Logout />
        </header>

        <div class="main">
            <div class="welcome-message">
                <img src="../assets/images/illustrator.jpg" alt="Illustration" />
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
    body {
        font-family: Arial, sans-serif;
        background-color: #f0f0f0;
        background-image: url('../assets/images/background.jpg');
        background-size: cover;
        margin: 0;
        padding: 0;
    }

    /* Header */
    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        padding: 10px 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .logo {
        display: flex;
        align-items: center;
    }

    .logo img {
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
    }

    header .logout-button {
        background-color: #4a90e2;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        cursor: pointer;
    }

    header .logout-button:hover {
        background-color: #357ABD;
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
        width: 100px;
        height: 100px;
        border-radius: 50%;
        margin-right: 20px;
    }

    .welcome-message h1 {
        margin: 0;
        font-size: 2em;
    }

    .welcome-message p {
        margin: 5px 0 0 0;
    }

    /* Chat Box */
    .chat-box {
        display: flex;
        flex-direction: column;
        height: 80vh;
        margin: 20px;
        padding: 20px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        overflow-y: auto;
    }

    .chat-box .message {
        display: flex;
        align-items: center;
        margin-bottom: 15px;
    }

    .chat-box .message img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
    }

    .chat-box .message .text {
        background-color: #e0e0e0;
        padding: 10px 15px;
        border-radius: 20px;
    }

    .chat-box .message.user .text {
        background-color: #4a90e2;
        color: white;
        align-self: flex-end;
    }

    /* Input Box */
    .input-box {
        display: flex;
        align-items: center;
        padding: 10px 20px;
        background-color: white;
        border-top: 1px solid #e0e0e0;
    }

    .input-box input {
        flex: 1;
        padding: 10px;
        border: 1px solid #e0e0e0;
        border-radius: 20px;
        margin-right: 10px;
    }

    .input-box button {
        background-color: #4a90e2;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 20px;
        cursor: pointer;
    }

    .input-box button:hover {
        background-color: #357ABD;
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
        flex-direction: row;
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
