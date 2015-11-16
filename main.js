(function() {
  function createKillAllButton() {
    if (document.documentElement.dataset.killAllButtonInjected) {
      console.log('kill-all-button is already injected');
      return;
    }
    var cardsView = document.getElementById('cards-view');

    var icon = '<svg' +
      '   xmlns="http://www.w3.org/2000/svg"' +
      '   viewBox="0 0 256 256"' +
      '   height="100%"' +
      '   width="100%">' +
      '     <rect' +
      '       style="fill:#ffffff"' +
      '       width="54.468082"' +
      '       height="176.65498"' +
      '       x="0"' +
      '       y="79.345016" />' +
      '    <rect' +
      '       style="fill:#ffffff"' +
      '       width="54.468082"' +
      '       height="176.65498"' +
      '       x="201.53192"' +
      '       y="7.6293945e-06" />' +
      '    <rect' +
      '      style="fill:#ffffff"' +
      '      width="54.468082"' +
      '      height="176.65498"' +
      '      x="99.858162"' +
      '      y="37.42691" />' +
      '  </g>' +
      '</svg>';

    var button = document.createElement('button');
    // set it as type to prevent form submit.
    button.type = 'button';
    button.innerHTML = icon;
    button.style.background = '#0095DD ';
    button.style.border = 'none';
    button.style.borderRadius = '1.5rem';
    button.style.outline = 'none';
    button.style.width = '3rem';
    button.style.height = '3rem';
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
