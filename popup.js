var actualUrl;
function getActualUrl() {
    chrome.tabs.query({
        'active': true,
        'windowId': chrome.windows.WINDOW_ID_CURRENT
    }, function (tabs) {
        var urlArray = tabs[0].url.split("&t");
        var firstUrl = urlArray[0].split("#t");
        actualUrl = firstUrl;
    });
}
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
    var textArea = document.createElement("textarea");
    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = 'transparent';


    textArea.value = actualUrl;

    document.body.appendChild(textArea);

    textArea.select();

    try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);
    } catch (err) {
    console.log('Oops, unable to copy');
    }

    document.body.removeChild(textArea);
}
