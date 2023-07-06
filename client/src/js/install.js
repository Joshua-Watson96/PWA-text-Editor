const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    //Store the event
    window.defferedPrompt = event;
    //Show the button
    butInstall.classList.toggle("hidden", false)
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.defferedPrompt;
    if(!promptEvent){
        return;
    }
    // show the prompt
    promptEvent.prompt();

    // reset the deffered prompt to null
    window.defferedPrompt = null;
    
    // set the button to hidden
    butInstall.classList.toggle("hidden", true)
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // clear prompt
    window.defferedPrompt = null;
});
