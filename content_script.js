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
}

clickOnMore();
clickOnTranscript();
chooseLanguages();
