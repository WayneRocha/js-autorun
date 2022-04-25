(() => {
  const getScript = new Promise((resolve, reject) => {
    chrome.storage.sync.get(["scriptsList"], scripts => {
      try {
        scripts.scriptsList.forEach(script => {
          if (window.location.href === script.whereToExecute) resolve(script.content);
        });
        resolve([]);
      } catch (error) {
        reject(error);
      }
    });
  });

  getScript
    .then(script => {
      if (script) {
        const $scriptDispatcherElement = document.createElement('p');
        $scriptDispatcherElement.setAttribute('onclick', `javascript:(() => {${script}})();`);
        $scriptDispatcherElement.dispatchEvent(new Event('click'));
        $scriptDispatcherElement.remove();
      }
    })
    .catch((error) => console.error(error));
})();