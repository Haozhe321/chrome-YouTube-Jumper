var searchTerm; //this is the variable to store the string that we want to search
var num;

function clickOnMore() {
    var clickLink = document.querySelector('[aria-label="More actions"]');
    clickLink.click();
}

function clickOnTranscript() {
    var clickTranscript = document.getElementsByClassName("style-scope ytd-menu-popup-renderer");
    window.setTimeout(function(){
        clickTranscript.item(2).click();
        window.setTimeout(function() { getListOfOccurances(searchTerm);}, 2000);
    }, 500);
}

// function chooseLanguages() {
//     var chooseLang = document.getElementsByClassName("yt-uix-button yt-uix-button-default hidden");
//     chooseLang[0].click();
//     setTimeout(selectEnglish, 500);
// }
//
// function selectEnglish() {
//     var languageList = document.getElementsByClassName("yt-ui-menu-item yt-uix-menu-close-on-select yt-uix-button-menu-item");
//     for(var i = 0; i < languageList.length; i++) {
//         if(languageList[i].value == "en: English - .en" ||
//             languageList[i].value == "en: English (Automatic Captions) - a.en") {
//             languageList[i].click();
//             break;
//         }
//     }
//     window.setTimeout(function(){ getListOfOccurances(searchTerm); }, 500);
// }

function getListOfOccurances(text) {
    var captionLineList = document.getElementsByClassName("cue-group style-scope ytd-transcript-body-renderer");
    //captionLineList[5].click(); NOTE: you can click on this itself to move thru the video
    var occurances = []; //occurances contain a list of time that this text occurs
    for(var i = 0; i < captionLineList.length; i++) {
        var time = captionLineList[i].getElementsByClassName("cue-group-start-offset style-scope ytd-transcript-body-renderer")[0].innerHTML;
        var string = captionLineList[i].getElementsByClassName("cue style-scope ytd-transcript-body-renderer")[0].innerHTML;
        if(string.includes(text)) {
            var splittedString = time.split(":");

            occurances.push(parseInt(splittedString[0])*60 + parseInt(splittedString[1]));
        }
    }
    num = 0;
    chrome.storage.local.set({
        listOfResults: occurances,
        number: 0
    });

    if(occurances.length == 0) {
        alert("word not found");
    }
    console.log(occurances[0]);
    //TODO: Update the buttons css when the results are ready
    chrome.runtime.sendMessage({greeting: "hello"});
}

function jumpTimeOverloaded(time) {
    return "&t=" + time + "s";
}

chrome.extension.onMessage.addListener(function(message,sender,sendResponse){
  if(message.code != null){
      searchTerm = message.code;
      clickOnMore();
      clickOnTranscript();
  }
});
