(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */   
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  /**
   * Given a URL to a emoji image, remove all existing emojis, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
   */
  function insertEmoji(emojiURL) {
    document.body.style.cursor = 'url("' + emojiURL + '"), default';
  }

  /**
   * Remove every beast from the page.
   */
  function removeExistingEmojis() {
    document.body.style.cursor = "auto";
  }

  /**
   * Listen for messages from the background script.
   * Call "emoji()" or "reset()".
  */
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "emoji") {
      insertEmoji(message.emojiURL);
    } else if (message.command === "reset") {
      removeExistingEmojis();
    }
  });

})();