<script>
  import { selectedPupil, refreshMessagesTrigger } from "../../../stores/selectedPupil";
  import { createPupilMessage , reading_tutor, createPupilRun } from "../../../dataservices";
  import socketStore from "../../../stores/socket";
  import pic3 from "../../../assets/images/Iconsax.png";

  let content1 = '';  
  let socket;

  socketStore.subscribe(value => {
    socket = value;
  });

  let userRole = (JSON.parse(localStorage.getItem('user')))?.role;

  async function performAction() {
    try {
      socket.emit("request_response", {
        'cmd': 'create_pupil_message',
        'respondAt': 'stream_tutor_response',
        'pupil_id': $selectedPupil[0],
        'assistant_id': $reading_tutor.assistant_id,
        'content': content1,
      });

      // Clear the textarea after submission
      content1 = '';
    } catch (error) {
      console.log(error);
    }
  }

  async function performAction2() {
    try {
      let result = await createPupilRun($selectedPupil[0], $reading_tutor.assistant_id);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
</script>

{#if userRole == "admin"}
Pupil Interaction
<textarea bind:value={content1}></textarea>

<button on:click={performAction}> Submit</button>

<button on:click={performAction2}> Create Run </button>
{/if}

{#if userRole == "user"}

  <div class="user-interaction">

    <div class="user-text">
      <!-- <textarea bind:value={content1}></textarea> -->
      <input class="user-textarea" type="text" placeholder="Type your message here ..." bind:value={content1}/>
    </div>
    
    <div class="user-submit">
      <!-- <button on:click={performAction}> Submit</button> -->
      <img src={pic3} alt="submit" class="send-icon" on:click={performAction} />
    </div>

  </div>
  
{/if}

<style>
  textarea {
    width: 100%;
    height: 200px;
  }

  .user-interaction{
    display: flex;
    align-items: center;
    /* padding: 10px; */
    margin: 1.5%;
  }

  .user-text{
    flex: 1;
    width: 100%;
  }

  .user-textarea{
    height: 40px;
    border: 0;
    flex: 1;
    font-weight: var(--font-bold);
    font-size: var(--font14);
    line-height: 1.2;
    color: white;
    width: 100%;
    padding: 10px;
    border-radius: 20px;
    border-top: 1px solid #e0e0e000;
    background-color: rgba(40, 38, 38, 0.993);
  }
  
  .send-icon {
    position: absolute;
    width: 28px;
    height: 30px;
    cursor: pointer;
    border: none;
    outline: none;
    margin: -20px;
    
  }

</style>
