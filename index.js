(async () => {
    const currentUrl = await (async() => {
        const url = await new Promise(resolve => {
            chrome.tabs.query({ currentWindow: true, active: true }, (foundTabs) => { if (foundTabs.length > 0) resolve(foundTabs[0].url || "") });
        });
        return new URL(url);
    })();

    const scriptsList = [
        {
            "id": Math.random().toString().replace(".", ""),
            "run": true,
            "name": "Welcome to JS Autorun",
            "content": "alert('JS Autorun is running');",
            "where": ["https://www.youtube.com/watch?v=vJfpSLLyE1g"],
            "timeOut": 0
        },
        {
            "id": Math.random().toString().replace(".", ""),
            "run": true,
            "name": "Hello world",
            "content": "alert('hello wolrd');",
            "where": ["https://context.reverso.net/traducao/espanhol-portugues/ni%C3%B1a"],
            "timeOut": 3
        }
    ];

    function setScripts(scripts) {
        chrome.storage.sync.set({ "scriptsList": scripts });
    }

    function runInCurrentTab({ where }) {
        return where.some(url => {
            return currentUrl.href === url || currentUrl.host === url || currentUrl.hostname === url || currentUrl.origin === url;
        });
    }

    function renderScriptsList(scriptsList) {
        scriptsList.forEach(async(script) => {
            document.querySelector('.script-items-list').innerHTML += `
            <li class="menu-item" data-script-id="${script.id}">
            <p>${script.name}</p>
            <div class="switch"></div>
            </li>
            `;

            if (runInCurrentTab(script)) {
                document.querySelector('.menu-items-list').innerHTML += `
                <li class="menu-item" data-script-id="${script.id}">
                    <p>${script.name}</p>
                    <div class="switch"></div>
                </li>
                `;
            }
        });

        const $menuItems = [...document.querySelectorAll('.menu-item')];
        $menuItems.forEach($item => {
            $item.addEventListener('click', (e) => {
                $menuItems.forEach($item => $item.classList.remove("active"));
                e.target.classList.add("active");
                const scriptId = e.target.getAttribute("data-script-id");
                renderScriptDetails(scriptId);
            });
        });
        renderScriptDetails(scriptsList[0].id);
    }

    function renderScriptDetails(scriptId) {
        chrome.storage.sync.get(["scriptsList"], (result) => {
            const { name, content, where, timeOut } = result.scriptsList.find(script => script.id == scriptId);
            if (!result.scriptsList) return;

            document.querySelector("body > main > div > h1").textContent = name;
            document.querySelector("pre code").innerHTML = content;
            document.querySelector("body > main > div > input[type=text]").value = where[0];
            document.querySelector("#dispatch-after-seconds").value = timeOut;

            document.querySelector("pre code").setAttribute('data-script-id', scriptId);
            document.querySelector("body > main > div > h1").setAttribute('data-script-id', scriptId);
            document.querySelector("body > main > div > input[type=text]").setAttribute('data-script-id', scriptId);
            document.querySelector("#dispatch-after-seconds").setAttribute('data-script-id', scriptId);

            hljs.highlightAll();
        });
    }

    setScripts(scriptsList);
    renderScriptsList(scriptsList);
})();

//encodeURI('')