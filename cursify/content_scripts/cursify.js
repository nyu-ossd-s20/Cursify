(function() {
  /**
   * Check and set a global guard variable.
   * If this content script is injected into the same page again,
   * it will do nothing next time.
   */
   
  var images = [
  'http://www.simpleimageresizer.com/_uploads/photos/3220be14/li_22x22.png',
  'http://www.simpleimageresizer.com/_uploads/photos/3220be14/ryan_22x22.png',
  'http://www.simpleimageresizer.com/_uploads/photos/3220be14/selam_22x22.png'];
	
  var x = 0;
   
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
	x = emojiURL;
    document.body.style.cursor = 'url("' + images[x] + '"), default';
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