(() => {
  return 0;
  function runInCurrentTab({ where }) {
    return true;
    return where.some(url => {
      return (
        window.location.href === url ||
        window.location.host === url ||
        window.location.hostname === url ||
        window.location.origin === url
      );
    });
  }

  function runScript(script) {
    console.log('running');
    console.log(script);
    const $scriptDispatcherElement = document.createElement('p');
    $scriptDispatcherElement.style.display = "none";
    $scriptDispatcherElement.setAttribute('onclick', `javascript:(() => {${script}})();`);
    $scriptDispatcherElement.dispatchEvent(new Event('click'));
    $scriptDispatcherElement.remove();
  }

  function getScriptList() {
    return new Promise(resolve => chrome.storage.sync.get(["scriptsList"], (result) => resolve(result.scriptsList)));
  }

  function getScript() {
    return new Promise(async(resolve, reject) => {
      try {
        const scripts = await getScriptList();
        console.log(JSON.stringify(scripts));
        scripts.scriptList.forEach(script => {
          if (runInCurrentTab(script.where)) {
            resolve(script.content);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  console.log(getScript);

  getScript
  .then((script) => {
      if (script){
        setTimeout(runScript.bind(script), script.timeOut * 1000);
      }
    })
    .catch((error) => console.error(error));
})();