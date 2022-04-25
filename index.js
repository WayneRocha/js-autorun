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

    chrome.storage.sync.set(Object.freeze(scriptsList));
})();