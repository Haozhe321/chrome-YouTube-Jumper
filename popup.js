var actualUrl; //to store the actal url of the website without the timestamp

////////////////// EVENT LISTENERS ////////////////////////////////////////////
//record actual url when it is loaded
document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({
        'active': true,
        'windowId': chrome.windows.WINDOW_ID_CURRENT
    }, function (tabs) {
        var urlArray = tabs[0].url.split("&t");
        var firstUrl = urlArray[0].split("#t");
        actualUrl = firstUrl[0];
    });
})

//eventlistener for Ctrl-c
document.addEventListener("keydown", function(event) {
    if (event.keyCode == 67 && (event.ctrlKey || event.metaKey)) {
        copyURLToClipboard();
    }
});

//eventlistener for Enter to submit form
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener("keydown", function (event) {
        if(event.which != 13) {
            return;
        }
        console.log(event.which);
        chrome.tabs.query({
            'active': true,
            'windowId': chrome.windows.WINDOW_ID_CURRENT
        }, function (tabs) {
            var urlArray = tabs[0].url.split("&t");
            var firstUrl = urlArray[0].split("#t");
            chrome.tabs.update({
                url: firstUrl + jumpTime()
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function(){
    var copyUrl = document.getElementById("copy-url");
    copyUrl.addEventListener('click', function(event) {
      copyURLToClipboard();
    });
});

document.addEventListener('DOMContentLoaded', function(){
    var copyUrl = document.getElementById("next-search");
    copyUrl.addEventListener('click', function(event) {
      clickNext();
    });
});

document.addEventListener('DOMContentLoaded', function(){
    var clickSearch = document.getElementById("submit-text-search");
    clickSearch.addEventListener('click', function(events) {
        var searchText = document.getElementById("text-search").value;
        injectTheScript(searchText);}
    );
});
/////////////////////// FUNCTIONS ///////////////////////////////////////////
function jumpTime() {
    var hour = document.getElementById("hour").value;
    var minute = document.getElementById("minute").value;
    var second = document.getElementById("second").value;

    var time = 0;
    var outputTime = "";
    if(hour.length != 0) {
        time = time + parseInt(hour)*3600;
    }
    if(minute.length != 0) {
        time = time + parseInt(minute)*60;
    }
    if(second.length != 0) {
        time = time + parseInt(second);
    }
    outputTime = "&t=" + time + "s";

    return outputTime;
}

function jumpTimeOverloaded(time) {
    return "&t=" + time + "s";
}

function copyURLToClipboard() {
    //create a temporary element to store the url. after copying, the element will be deleted
    var textArea = document.createElement("textarea");
    textArea.value = actualUrl;
    document.body.appendChild(textArea);
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
    } catch (err) {
        console.log('Unable to copy');
    }

    document.body.removeChild(textArea); //remove this element after copying
}

function injectTheScript(text) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // query the active tab, which will be only one tab
        //and inject the script in it
        chrome.tabs.executeScript(tabs[0].id, {file: "content_script.js"}, function(){
            chrome.tabs.sendMessage(tabs[0].id,{
                code: text
            });
        });
    });
}

function clickNext() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // query the active tab, which will be only one tab
        //and inject the script in it
        chrome.tabs.executeScript(tabs[0].id, {file: "content_script.js"}, function(){
            chrome.tabs.sendMessage(tabs[0].id,{
                code: "next"
            });
        });
    });
}
