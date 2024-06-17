<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { selectedPupil} from "../../../stores/selectedPupil";
    import {  getPupilMessages } from "../../../dataservices";
    import { marked } from "marked";

    import socketStore from "../../../stores/socket";
    
    let socket;

    let pupilMessages = []
    let container; // DOM reference for the messages container
    let previousMessageCount = 0; // to track if new messages have been added

    let userRole = (JSON.parse(localStorage.getItem('user')))?.role;

    const currentStreamingMessage = writable("")

    let isStreaming = false;


    $: $selectedPupil,  loadMessages();

    async function loadMessages() {

        console.log("IN LOAD MESSAGE")

        if ($selectedPupil) {
            try {
                const messages = await getPupilMessages($selectedPupil[0], 'asc');
                pupilMessages = messages;
                if (pupilMessages.length !== previousMessageCount) {
                    previousMessageCount = pupilMessages.length;
                    
                    scrollToBottom();
                }

            } catch (error) {
                console.error(error);
            }
        }
    }

    function scrollToBottom() {

        if (container) {

            setTimeout(() => {
                container.scrollTop = container.scrollHeight;
            }, 100)
        }
    }



    socketStore.subscribe(value => {
      socket = value;
    });

 


    $: if (socket) {
      socket.on('stream_tutor_response', async (data) => {

            switch (data.type) {
                case 'beginStream': {
                    isStreaming = true;
                    console.log("in beginStream")
                    currentStreamingMessage.set('') ;
                }
                case 'endStream': {
                    isStreaming = false;
                    currentStreamingMessage.set('') ;  // Reset current streaming message
                    const res = await loadMessages()    
                }
                case 'InStream': {
                    if (data.content != null) {
                        console.log("instream : " + data.content)
                        currentStreamingMessage.update(content => content + data.content);
                    }
                }
            }

      })
    }




    function displayPupilMessage_stream(data) {
        return marked(data)
    }

    function displayPupilMessage_user(pupilMessage) {

        console.log("pupil" + pupilMessage)

        if (pupilMessage[2] == 'user') {
            // return marked (" **"+$selectedPupil[1] + "**" + "\n\n" + pupilMessage[1][0]['text']['value'])
            return marked(pupilMessage[1][0]['text']['value'])
        }
        else {
            if ( pupilMessage[2] != null){
            //   return marked (" **Reading Tutor**" + "\n\n" + pupilMessage[1][0]['text']['value'])
                return marked(pupilMessage[1][0]['text']['value'])
            }
        }
    }

    function displayPupilMessage(pupilMessage) {

        console.log("pupil" + pupilMessage)

        if (pupilMessage[2] == 'user') {
            return marked (" **"+$selectedPupil[1] + "**" + "\n\n" + pupilMessage[1][0]['text']['value'])
            //return marked(pupilMessage[1][0]['text']['value'])
        }
        else {
            if ( pupilMessage[2] != null){
               return marked (" **Reading Tutor**" + "\n\n" + pupilMessage[1][0]['text']['value'])
            //return marked(pupilMessage[1][0]['text']['value'])
            }
        }
    }

    onMount(() => {
        scrollToBottom(); // Ensure we scroll to bottom on initial mount
    });

</script>

{#if userRole == "user"}
<div bind:this={container} class="messages-container">

    {#if pupilMessages.length > 0}
    
        {#each pupilMessages as pupilMessage }
            {#if pupilMessage[2]=="user"}
            <div class="user-message">
                {@html displayPupilMessage_user(pupilMessage)}
            </div>
            {/if}

            {#if pupilMessage[2]=="assistant"}
            <div class="assistant-message">
                {@html displayPupilMessage_user(pupilMessage)}
            </div>
            {/if}
        {/each}

    {/if}
    {#if isStreaming}
        <div class="streaming-message">
            {@html displayPupilMessage_stream($currentStreamingMessage)}
        </div>
    {/if}

</div>
{/if}

{#if userRole == "admin"}
<div bind:this={container} class="messages-container">

    {#if pupilMessages.length > 0}
    
        {#each pupilMessages as pupilMessage }
            <div>
                {@html displayPupilMessage(pupilMessage)}
            </div>
        {/each}

    {/if}
    {#if isStreaming}
        <div class="streaming-message">
            {@html displayPupilMessage_stream($currentStreamingMessage)}
        </div>
    {/if}

</div>
{/if}


<style>
    .messages-container {
        overflow-y: auto; /* Allows scrolling */
        /* max-height: 550px; Adjust max-height as necessary */
        height: 600px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 2.5%;
    }

    .user-message{
        background-color: #4f8df5;
        color: #fff;
        align-self: flex-start;
        text-align: right;
        max-width: 45%;
        padding: 7px;
        border-radius: 15px 15px 15px 0;
        
    }

    .assistant-message{
        background-color: #fff;
        color: #000;
        border: 1px solid #ddd;
        align-self: flex-end;
        max-width: 45%;
        padding: 7px;
        border-radius: 15px 15px 0 15px;
    }
</style>