document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('button').addEventListener("click", function () {
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

    time = time + hour;
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
