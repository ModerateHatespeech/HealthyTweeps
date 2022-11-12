console.log("Running!");

var targetNode = document.querySelector('div[aria-label="Timeline: Your Home Timeline"] > div');

const config = { attributes: false, childList: true, subtree: false };

const callback = (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === 'childList') {
            [...document.querySelectorAll("article")].forEach(
                (item) => {
                    if (!item.getAttribute("data-mod-status") == "true") {

                        var content = item.querySelector('div[lang="en"]>span').innerText;
                        fetch('https://api.moderatehatespeech.com/api/v1/twitter/', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json, text/plain, */*',
                            },
                            body: JSON.stringify({ text: content })
                        }).then(res => res.json())
                        .then((res) => {
                            if (res["conf"] > 0.9 && res["class"] == "flag") {
                                item.classList.add("mod-hidden");
                            }
                            console.log("Hateful tweet detected!");
                            item.setAttribute("data-mod-status", "true");
                        });
                    }

                }
            );
        }
    }
};

const observer = new MutationObserver(callback);
observer.observe(targetNode1, config);

// observer.disconnect();