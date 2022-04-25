function renderScripts(scripts, $el) {
    scripts.forEach(script => {
        $el.innerHTML += `
        <div class="m-4">
      <div class="input-group">
        <span class="input-group-text">url</span>
        <input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value="${script.whereToExecute}">
      </div>
      <div class="input-group">
        <span class="input-group-text">code</span>
        <textarea class="form-control" aria-label="code">${script.content}</textarea>
      </div>
    </div>
        `;
    });
}
(() => {
    const scriptsList = {
        "scriptsList": [
            {
                whereToExecute: 'https://github.com/WayneRocha/js-autorun',
                content: 'console.log("running script")'
            },
            {
                whereToExecute: 'https://context.reverso.net/traducao/portugues-espanhol/programador',
                content: `const blockedElements = document.querySelectorAll('.blocked');const bannerElement = document.querySelector('#blocked-results-banner');blockedElements.forEach(element => element.classList.remove('blocked'));bannerElement.remove();`
            }
        ]
    };

    chrome.storage.sync.set(scriptsList);
    renderScripts(scriptsList.scriptsList, document.getElementById('scripts'));
})();