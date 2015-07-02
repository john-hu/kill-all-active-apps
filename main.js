(function() {
  function createKillAllButton() {
    var cardsView = document.getElementById('cards-view');

    var button = document.createElement('button');
    // set it as type to prevent form submit.
    button.type = 'button';
    button.textContent = '🈳';
    button.style.background = 'none';
    button.style.border = 'none';
    button.style.outline = 'none';
    button.style.fontSize = '3rem';
    button.style.position = 'absolute';
    button.style.top = '3rem';
    button.style.right = '3rem';

    button.addEventListener('touchstart', function() {
      var taskMgr = window.wrappedJSObject.appWindowManager.taskManager;
      if (taskMgr.cardsList.children.length > 0) {
        for (var appId in taskMgr.cardsByAppID) {
          taskMgr.cardsByAppID[appId].killApp();
        }
        taskMgr.exitToApp();
      }
    }, true);

    window.addEventListener('taskmanager-activated', function() {
      var taskMgr = window.wrappedJSObject.appWindowManager.taskManager;
      button.style.display = taskMgr.cardsList.children.length === 0 ?
                                'none' : 'inline-block';
    });

    cardsView.insertBefore(button, cardsView.firstElementChild);
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
