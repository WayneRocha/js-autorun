(async() => {
  function runInCurrentTab(where) {
    return where.some(url => {
      return window.location.href === url || window.location.host === url || window.location.hostname === url || window.location.origin === url;
    });
  }

  function runScript(script) {
    const $scriptDispatcherElement = document.createElement('p');
    $scriptDispatcherElement.style.display = "none";
    $scriptDispatcherElement.setAttribute('onclick', `javascript:(() => {${script}})();`);
    $scriptDispatcherElement.dispatchEvent(new Event('click'));
  }

  function getScriptList() {
    return new Promise(resolve => chrome.storage.local.get(["scriptsList"], (result) => resolve(result.scriptsList)));
  }

  function getScript() {
    return new Promise(async (resolve, reject) => {
      try {
        const scripts = await getScriptList();
        scripts.forEach(script => {
          if (runInCurrentTab(script.where)) {
            resolve(script.content);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  const scriptToRun = await getScript();
  if (scriptToRun) {
    setTimeout(() => runScript(scriptToRun), scriptToRun.timeOut * 1000);
  }
})();