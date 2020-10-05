chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    const url = tabs[0].url + '&isqa=true';
    chrome.tabs.create({ url });
});
