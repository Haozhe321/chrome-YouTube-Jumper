var searchTerm; //this is the variable to store the string that we want to search
var num;

function clickOnMore() {
    var clickLink = document.getElementById("action-panel-overflow-button");
    clickLink.click();
}

function clickOnTranscript() {
    var clickTranscript = document.getElementsByClassName("yt-ui-menu-item has-icon yt-uix-menu-close-on-select action-panel-trigger action-panel-trigger-transcript")[0];
    clickTranscript.click();
}

function chooseLanguages() {
    var chooseLang = document.getElementsByClassName("yt-uix-button yt-uix-button-default hidden");
    chooseLang[0].click();
    setTimeout(selectEnglish, 500);
}

function selectEnglish() {
    var languageList = document.getElementsByClassName("yt-ui-menu-item yt-uix-menu-close-on-select yt-uix-button-menu-item");
    for(var i = 0; i < languageList.length; i++) {
        if(languageList[i].value == "en: English - .en" ||
            languageList[i].value == "en: English (Automatic Captions) - a.en") {
            languageList[i].click();
            break;
        }
    }
    window.setTimeout(function(){ getListOfOccurances(searchTerm); }, 500);
}

function getListOfOccurances(text) {
    var captionLineList = document.getElementsByClassName("caption-line");
    //captionLineList[5].click(); NOTE: you can click on this itself to move thru the video
    var occurances = []; //occurances contain a list of time that this text occurs
    for(var i = 0; i < captionLineList.length; i++) {
        var time = captionLineList[i].getAttribute("data-time")
        var string = captionLineList[i].getElementsByClassName("caption-line-text")[0].innerHTML;
        if(string.includes(text)) {
            occurances.push(captionLineList[i]);
        }
    }
    num = 0;
    chrome.storage.local.set({
        listOfResults: occurances,
        number: 0
    });

}

function jumpTimeOverloaded(time) {
    return "&t=" + time + "s";
}

chrome.extension.onMessage.addListener(function(message,sender,sendResponse){
  //This is where the stuff you want from the background page will be
  if(message.code != null && message.code != "next"){
      searchTerm = message.code;
      clickOnMore();
      clickOnTranscript();
      chooseLanguages();
  }
});

chrome.extension.onMessage.addListener(function(message,sender,sendResponse){
    if(message.code === "next"){
        chrome.storage.local.get(null, function (items) {
            alert(items.number);
            alert(typeof(items.listOfResults));
            items.listOfResults[items.number].click();
            chrome.storage.local.set({number: items.number + 1});
        });
    }
});
