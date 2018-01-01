var actualUrl; //to store the actal url of the website without the timestamp

////////////////// EVENT LISTENERS ////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({
        'active': true,
        'windowId': chrome.windows.WINDOW_ID_CURRENT
    }, function (tabs) {
        var urlArray = tabs[0].url.split("&t");
        var firstUrl = urlArray[0].split("#t");
        actualUrl = firstUrl;
    });
})
document.addEventListener('DOMContentLoaded', function () {
    document.addEventListener("keydown", function (event) {
        if(event.which != 13) {
            return;
        }
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


/////////////////////// FUNCTIONS ///////////////////////////////////////////
function jumpTime() {
    var hour = document.getElementById("hour").value;
    var minute = document.getElementById("minute").value;
    var second = document.getElementById("second").value;

    var time = "#t=";
    if(hour.length != 0) {
        time = time + hour + "h";
    }
    if(minute.length != 0) {
        time = time + minute + "m";
    }
    if(second.length != 0) {
        time = time + second + "s";
    }

    return time;
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
