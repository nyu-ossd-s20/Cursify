/**
 * CSS to hide everything on the page,
 * except for elements that have the "emoji-image" class.
 */
const hidePage = `body > :not(.emoji-image) {
                    display: none;
                  }`;

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => {

    /**
     * Given the name of a beast, get the URL to the corresponding image.
     */
    function emojiNameToURL(emojiName) {
      switch (emojiName) {
        case "🔨":
          return 0;
        case "😐":
          return 1;
        case "🤯":
          return 2;
      }
    }

    /**
     * Insert the page-hiding CSS into the active tab,
     * then get the beast URL and
     * send a "emoji" message to the content script in the active tab.
     */
    function emoji(tabs) {
        let url = emojiNameToURL(e.target.textContent);
        browser.tabs.sendMessage(tabs[0].id, {
          command: "emoji",
          emojiURL: url
        });
    }

    /**
     * Remove the page-hiding CSS from the active tab,
     * send a "reset" message to the content script in the active tab.
     */
    function reset(tabs) {
      browser.tabs.removeCSS({code: hidePage}).then(() => {
        browser.tabs.sendMessage(tabs[0].id, {
          command: "reset",
        });
      });
    }

    /**
     * Just log the error to the console.
     */
    function reportError(error) {
      console.error(`Could not emotify: ${error}`);
    }

    /**
     * Get the active tab,
     * then call "emoji()" or "reset()" as appropriate.
     */
    if (e.target.classList.contains("emoji")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(emoji)
        .catch(reportError);
    }
    else if (e.target.classList.contains("reset")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(reset)
        .catch(reportError);
    }
  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute emoji content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs.executeScript({file: "/content_scripts/cursify.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);