let buttonsConfig = [
    {
        label: "Local",
        protocol: "http",
        params: { "env": "local" }
    },
    {
        label: "Production",
        protocol: "https",
        params: { env: "production" }
    },
    {
        label: "Testing",
        protocol: 'https',
        params: { env: 'qa' }
    }
]
const buttonsConfigUrl = chrome.runtime.getURL('buttonsConfig.json');
fetch(buttonsConfigUrl)
    .then((response) => response.json())
    .then((json) => { buttonsConfig = json.buttonsConfig });

const buttons = document.getElementsByClassName('urlChanger')

const openNewTab = (buttonConfig) => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = new URL(tabs[0].url);
        url.protocol = buttonConfig.protocol + ':';
        for(const [key, val] of Object.entries(buttonConfig.params)){
            url.searchParams.append(key, val)
        }
        chrome.tabs.create({ url: url.toString() });
    });
}

for (let i = 0; i < buttons.length, i < buttonsConfig.length; i++){
    buttons[i].addEventListener('click', () => openNewTab(buttonsConfig[i]));
}
