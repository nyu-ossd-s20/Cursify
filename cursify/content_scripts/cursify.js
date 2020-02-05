(function() {

   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;
  /**
  * Given a URL to a beast image, remove all existing beasts, then
   * create and style an IMG node pointing to
   * that image, then insert the node into the document.
  function insertBeast(cursorURL) {
    removeCurrentCursor();
    document.body.style('cursor:',cursorURL);
  }

   * Remove every beast from the page.
   
  function removeCurrentCursor() {
    document.body.style('cursor: default');

  }

  
   * Listen for messages from the background script.
   * Call "beastify()" or "reset()".

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "cursify") {
      insertBeast(message.cursorURL);
    } else if (message.command === "reset") {
      removeCurrentCursor();
    }
  });
**/
})();
