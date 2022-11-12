console.log("Running!");

window.onload = function () {
    [...document.querySelectorAll("article")].forEach(
        (item) => {
            var content = item.querySelector('div[lang="en"]>span').innerText;
            fetch('https://api.moderatehatespeech.com/api/v1/moderate/', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: "test", text: content })
            }).then(res => res.json())
                .then(res => console.log(res));

        }
    );
}