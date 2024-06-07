<script>
    import { use } from "marked";
    import { listPupils, getPupil } from "../dataservices";
    import { selectedPupil} from "../stores/selectedPupil";
    import Logout from "./logout.svelte";
    import pic from "../assets/images/Avatar.jpg";
    import pic1 from "../assets/images/illustrator.jpg";

    import PupilInteraction from "../sveltelib/components/pupil/pupilInteraction.svelte";
    import PupilInteractions from "../sveltelib/components/pupil/pupilInteractions.svelte";
    $: users = $listPupils

    let userRole = (JSON.parse(localStorage.getItem('user')))?.role
    let loginCheck = (JSON.parse(localStorage.getItem('user')))?.login
    let curUserName = (JSON.parse(localStorage.getItem('user')))?.name
    let curUserID = (JSON.parse(localStorage.getItem('user')))?.id

    async function pupilRetrieve(){
        if(curUserID !== ""){
            let pupil = await getPupil(curUserID)
            const pupil_arr = [pupil.pupil_id, pupil.pupil_name, pupil.created_at]
            $selectedPupil = pupil_arr
            console.log("inside pupil retrieve", $selectedPupil, curUserID)
        }
        else{
            console.log("Can not retrieve empty pupil")
        }
    }

    $: if (userRole === "user" && loginCheck) {
        pupilRetrieve();
    }

    console.log("current id", curUserID)

</script>




{#if userRole == "admin" && loginCheck}
    <div class="container-admin"> 


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
                <PupilInteractions></PupilInteractions>
            </div>
            <div class="pupil-interaction">
            <PupilInteraction></PupilInteraction>
            </div>
        </div>
    </div>
{/if}

{#if userRole == "user" && loginCheck}
    <!-- <ul>
        <li><Logout /></li>
    </ul> -->
    <header>
        <div class="logo">           
            <img src={pic} alt="Reading Tutor Logo" />
            <span>Reading Tutor</span>
        </div>
      <div >  <Logout /> </div>
    </header>

    <div class="container-user">

        <div class="welcome-message">
                <img src={pic1} alt="Illustration" />
                <div>
                    <h1>Reading Tutor</h1>
                    <p>Hi, there! I am your Reading Tutor! I am here to help you read stories, learn new words, and have lots of fun along the way! Let me know when you are ready to start reading.</p>
                </div>
        </div>

        <div class="user-pupil-messages">
            <div class="pupil-interactions">
                <PupilInteractions />
            </div>
            <div class="pupil-interaction">
                <PupilInteraction />
            </div>
        </div>

    </div>

    <!-- <div class="container-user">

        <div class="containervert">
            <div class="pupil-interactions">
                <PupilInteractions></PupilInteractions>
            </div>
            <div class="pupil-interaction">
            <PupilInteraction></PupilInteraction>
            </div>
        </div>
    </div> -->
{/if}

<style>
    .container-admin {
      display: flex;
      flex-direction: row; /* Horizontal layout by default */
      width: 1500px;
    }

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

    .container-user {
        display: flex;
        flex-direction: column; /* Horizontal layout by default */
        width: 1500px;
        background-image: url('../assets/images/background2.jpeg');
        background-size: cover;
    }

    .welcome-message {
        display: flex;
        align-items: center;
        background-color: #4a90e2;
        color: white;
        border-radius: 200px;
        padding: 70px;
        margin: 29px;
        position: relative;
        text-align: left;
    }

    .welcome-message img {
        width: 300px;
        height: 300px;
        top: -10px;
        border-radius: 60%;
        position: absolute;
        left: -15px;
        box-shadow: 10px 0px 10px 0px rgba(0, 0, 0, 0.75);
        /* margin-right: 20px; */
    }

    .welcome-message h1 {
        margin: 0;
        font-size: 3em;
        padding-left: 17.5%;
    }

    .welcome-message p {
        margin: 5px 5px 5px 5px;
        padding-left: 17.5%;
        font-size: x-large;
    }

    .containervert-sidebar {
      display: flex;
      flex-direction: column; /* Horizontal layout by default */
      width: 10%;
    }

    .containervert {
      display: flex;
      height: 100vh;
      flex-direction: row; /* Horizontal layout by default */
      overflow: hidden; /* Ensures no overflow from child components */
      width: 87%;
    }

    .user-pupil-messages{
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }

 /* Specific to the component containing the messages */
    .pupil-interactions {
    
        flex: 1; /* Allows this component to grow and fill the space but not beyond */
        width: 95%;
        margin-right: 2.5%;
        margin-left: 2.5%;
    }

    /* Container for the input area should not grow */
    .pupil-interaction {
        width: 96%;
        margin-right: 2%;
        margin-left: 2%;
        flex: 0 1 auto; /* Does not grow, but can shrink to fit content */
    }

</style>