console.log("Running!");

function processTweets() {
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
                            if (res["confidence"] > 0.9 && res["class"] == "flag") {
                                item.setAttribute("hidden", "true");
                                console.log("Hateful tweet detected!");
                            }
                        });
                }
            }

        }
    );
}

setInterval(processTweets, 250);
// observer.disconnect();

