function processTweets(threshold) {
    [...document.querySelectorAll("article")].forEach(
        (item) => {
            if (item.getAttribute("data-mod-status") != "true") {
                item.setAttribute("data-mod-status", "true");
                var content = item.querySelector('div[lang="en"]>span');
                if (content != null) {
                    fetch('https://api.moderatehatespeech.com/api/v1/twitter/', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                        },
                        body: JSON.stringify({ text: content.innerText })
                    }).then(res => res.json())
                        .then((res) => {
                            if (res["confidence"] > threshold && res["class"] == "flag") {
                                item.setAttribute("hidden", "true");
                                console.log("Hateful tweet detected!");
                            }
                        });
                }
            }

        }
    );
}

chrome.storage.sync.get({
    sensitivity: 'high',
    enable: true
}, function (items) {
    if (items.enable) {
        if (items.sensitivity == "high") {
            setInterval(function() { processTweets(0.6) }, 250);
        }
        else if (items.sensitivity == "medium") {
            setInterval(function() { processTweets(0.75) }, 250);
        }
        else if (items.sensitivity == "low") {
            setInterval(function() { processTweets(0.9) }, 250);
        }
    }
});

