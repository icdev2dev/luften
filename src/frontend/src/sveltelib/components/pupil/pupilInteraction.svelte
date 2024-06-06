<script>
  import { selectedPupil, refreshMessagesTrigger } from "../../../stores/selectedPupil";
  import { createPupilMessage, reading_tutor, createPupilRun } from "../../../dataservices";
  import socketStore from "../../../stores/socket";
  import pic3 from "../../../assets/images/Iconsax.png";
  import pic4 from "../../../assets/images/Frame 6.png";
  import PupilInteractions from "../pupil/pupilInteractions.svelte";

  let content1 = '';
  let sendMsg = '';
  let socket;
  let messages = '';

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

  function handleChangeSendMessage(event) {
    sendMsg = event.target.value;
  }

  function handleSendMessage() {
    console.log("Message sent:", sendMsg);
    sendMsg = ''; // Clear the input after sending
  }
</script>

<div class="chat-box">
  <div class="messages">
    {#each messages as message}
      <div class="message {message.user}">
        <img src={pic4} alt="User Image">
        <div class="text">{message.text}</div>
        <div class="pupil-interactions">
          <PupilInteractions />
      </div>
      </div>
    {/each}
  </div>

  <div class="messageFooterWrapper">
    <div class="leftMessageFooter">
      <input
        class="messageInput mr-1"
        type="text"
        placeholder="Type your message here..."
        name="sendMessage"
        bind:value={sendMsg}
        autocomplete="off"
        on:input={handleChangeSendMessage}
      />
    </div>
    <div class="rightMessageFooter">
      <img src={pic3} style="cursor: pointer;" alt="img" class="send-icon" on:click={handleSendMessage} />
    </div>
  </div>
  
  <div>
    {#if userRole == "admin"}
      <button on:click={performAction2}>Create Run</button>
    {/if}
  </div>
</div>

<style>
  .chat-box {
    display: flex;
    flex-direction: column;
    width: 100vh;
   padding: 20px;
    margin-right: auto;
    margin-top: 75vh;
    margin-bottom: 75vh;
    margin-right: auto;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
  }

  .messages {
    flex: 1;
    overflow-y: auto;
  }

  .message {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }

  .message img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  .message .text {
    background-color: #e0e0e0;
    padding: 10px 15px;
    border-radius: 20px;
    color: black; /* Set text color to black */
  }

  .message.user .text {
    background-color: #4a90e2;
    color: white;
    align-self: flex-end;
  }

  .messageFooterWrapper {
    display: flex;
    align-items: center;
    padding: 20px; /* Increased padding to make the element larger */
    border-top: 1px solid #e0e0e0;
    height: 60px; /* Optionally set a specific height */
}


  .leftMessageFooter {
    flex: 1;
  }

  .messageInput {
    border: 0;
    flex: 1;
    font-weight: var(--font-bold);
    font-size: var(--font14);
    line-height: 1.2;
    color: var(--primary-font-color);
    width: 100%;
    padding: 10px;
    border-radius: 20px;
  }

  .rightMessageFooter {
    display: flex;
    align-items: center;
  }

  .send-icon {
    position: absolute;
    width: 28px;
    cursor: pointer;
    border: none;
    outline: none;
    margin: -18px;
  }

  textarea {
    width: 100%;
    height: 200px;
  }

  .admin-button {
    margin-top: 10px;
    background-color: #4a90e2;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
    align-self: flex-start;
  }

  .admin-button:hover {
    background-color: #357ABD;
  }
</style>
