(async () => {
  return;
  function runInCurrentTab({whereToExecute}){
    return window.location.href === whereToExecute
  }
  
  function runScript(script){
    const $scriptDispatcherElement = document.createElement('p');
    $scriptDispatcherElement.style.display = "none";
    $scriptDispatcherElement.setAttribute('onclick', `javascript:(() => {${script}})();`);
    $scriptDispatcherElement.dispatchEvent(new Event('click'));
    $scriptDispatcherElement.remove();
  }

  function getScriptList() {
    return new Promise(resolve => chrome.storage.sync.get(["scriptsList"], scripts => resolve(scripts.scriptList)));
  }

  function getScript() {
    return new Promise(async(resolve, reject) => {
      try {
        const scripts = await getScriptList();
        scripts.scriptsList.forEach(script => {
          if (runInCurrentTab(script.whereToExecute)) {
            resolve(script.content);
          }
        });
      } catch (error) {
        reject(error);
      } finally {
        resolve([]);
      }
    });
  }

  getScript
    .then(script => { if (script) runScript(script); })
    .catch((error) => console.error(error));
})();