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


document.getElementById('edit').addEventListener("change", function(){

  if(document.getElementById('edit').checked){
    var elems = document.getElementsByClassName('editSettings');
    for(var i = 0; i < elems.length; i++){
      elems[i].style.display = "inline";
    }
  }
  else{
    var elems = document.getElementsByClassName('editSettings');
    for(var i = 0; i < elems.length; i++){
      elems[i].style.display = "none";
    }
  }
})

document.getElementById('submit').addEventListener('click', function(){
  var labels = document.getElementsByClassName('labels');
  var protocols = document.getElementsByClassName('protocols');
  var params = document.getElementsByClassName('params');

  for(var i = 0; i < labels.length; i++){
    if(labels[i].value != ""){
      buttonsConfig[i].label = labels[i].value;
    }
    if(protocols[i].value != ""){
      buttonsConfig[i].protocol = protocols[i].value;
    }
    if(params[i].value != ""){
      buttonsConfig[i].params = params[i].value;
    }
  }
  console.log(buttonsConfig[0].params);
  console.log(buttonsConfig[1].params);
  console.log(buttonsConfig[2].params);

  var elems = document.getElementsByClassName('editSettings');
  for(var i = 0; i < elems.length; i++){
    elems[i].style.display = "none";
  }
  document.getElementById('edit').checked = false;
  alert("Save Succuessfully!")
})





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
