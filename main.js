(function() {
  function createKillAllButton() {
    if (document.documentElement.dataset.killAllButtonInjected) {
      console.log('kill-all-button is already injected');
      return;
    }
    var cardsView = document.getElementById('cards-view');

    var button = document.createElement('button');
    // set it as type to prevent form submit.
    button.type = 'button';
    button.textContent = '🈳';
    button.style.background = 'none';
    button.style.border = 'none';
    button.style.outline = 'none';
    button.style.fontSize = '3rem';
    button.style.position = 'fixed';
    button.style.top = '3rem';
    button.style.right = '3rem';
    button.style.zIndex = '9999999';
    button.addEventListener('touchstart', function(e) {
      var taskMgr = window.wrappedJSObject.appWindowManager.taskManager;
      if (taskMgr.cardsList.children.length > 0) {
        var cards = Array.from(taskMgr.cardsList.children).map(function(e) {
          return taskMgr.getCardForElement(e);
        });
        cards.forEach(function(card) {
          if (card.app.killable()) {
            card.killApp();
          }
        });
        taskMgr.exitToApp();
      }
    }, true);

    window.addEventListener('cardviewshown', function() {
      var taskMgr = window.wrappedJSObject.appWindowManager.taskManager;
      button.style.display = taskMgr.cardsList.children.length === 0 ?
                                'none' : 'inline-block';
    });

    cardsView.insertBefore(button, cardsView.firstElementChild);
    document.documentElement.dataset.killAllButtonInjected = true;
  }

  if (document.readyState !== 'loading') {
    createKillAllButton();
  } else {
    document.addEventListener('readystatechange',
      function readyStateChange() {
        if (document.readyState == 'interactive') {
          document.removeEventListener('readystatechange',
            readyStateChange);
          createKillAllButton();
        }
      });
  }
})();
