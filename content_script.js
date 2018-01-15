var searchTerm; //this is the variable to store the string that we want to search

function clickOnMore() {
    var clickLink = document.querySelector('[aria-label="More actions"]');
    clickLink.click();
}

/* the setTimeout function is used so that the functions execute sequentially, only after
the function on the previous line has been completed. Else this creates problems with the clicking
of the UI */
function clickOnTranscript() {
    var clickTranscript = document.getElementsByClassName("style-scope ytd-menu-popup-renderer");
    window.setTimeout(function(){
        clickTranscript.item(2).click();
        window.setTimeout(function() { getListOfOccurances(searchTerm);}, 2000);
    }, 500);
}

function getListOfOccurances(text) {
    var captionLineList = document.getElementsByClassName("cue-group style-scope ytd-transcript-body-renderer");
    //captionLineList[5].click(); NOTE: you can click on this itself to move thru the video
    var occurances = []; //occurances contain a list of time that this text occurs
    for(var i = 0; i < captionLineList.length; i++) {
        var time = captionLineList[i].getElementsByClassName("cue-group-start-offset style-scope ytd-transcript-body-renderer")[0].innerHTML;
        var string = captionLineList[i].getElementsByClassName("cue style-scope ytd-transcript-body-renderer")[0].innerHTML;
        if(string.includes(text)) {
            var splittedString = time.split(":");

            //convert into minutes and push into the array of occurances
            occurances.push(parseInt(splittedString[0])*60 + parseInt(splittedString[1]));
        }
    }

    //store the list of occurances in chrome's local storage so that popup.js can use later for navigating
    chrome.storage.local.set({
        listOfResults: occurances,
        number: 0
    });

    if(occurances.length == 0) {
        alert("word not found");
    }

    //to tell popup.js that we are ready
    chrome.runtime.sendMessage({greeting: "hello"});
}


chrome.extension.onMessage.addListener(function(message,sender,sendResponse){
  if(message.code != null){
      searchTerm = message.code;
      clickOnMore();
      clickOnTranscript();
  }
});
