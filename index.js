hljs.highlightAll();
const scriptsList = [
    {
        "id": Math.random().toString().replace(".", ""),
        "run": true,
        "name": "Welcome to JS Autorun",
        "content": "console.log('JS Autorun is running');",
        "where": ["https://google.com/", "chrome://extensions/"],
        "timeOut": 0
    },
    {
        "id": Math.random().toString().replace(".", ""),
        "run": true,
        "name": "Hello world",
        "content": "console.log('hello wolrd');",
        "where": ["https://github.com/waynerocha/", "chrome://extensions/"],
        "timeOut": 3
    }
];
function setScripts(scripts){
    chrome.storage.sync.set({"scriptsList": scriptsList});
}

function runInCurrentTab({where}){
    return true;
    return where.some(url => {
        const anyMatch = [
            window.location.href === url,
            window.location.host === url,
            window.location.hostname === url,
            window.location.origin === url
        ].some(urlMatch => urlMatch );
        return anyMatch;
    });
}

function renderScriptsList(scriptsList){
    scriptsList.forEach(script => {
        document.querySelector('.script-items-list').innerHTML += `
        <li class="menu-item" data-script-id="${script.id}">
        <p>${script.name}</p>
        <div class="switch"></div>
        </li>
        `;
        if (runInCurrentTab(script)){
            document.querySelector('.menu-items-list').innerHTML += `
            <li class="menu-item" data-script-id="${script.id}">
                <p>${script.name}</p>
                <div class="switch"></div>
            </li>
            `
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

function renderScriptDetails(scriptId){
    chrome.storage.sync.get(["scriptsList"], (result) => {
        const { name, content, where, timeOut } = result.scriptsList.find(script => script.id === scriptId);
        document.querySelector("body > main > div > h1").textContent = name;
        document.querySelector("pre code").innerHTML = content;
        document.querySelector("body > main > div > input[type=text]").value = where[0];
        document.querySelector("#dispatch-after-seconds").value = timeOut;
        hljs.highlightAll();
    });
}

setScripts(scriptsList);
renderScriptsList(scriptsList);