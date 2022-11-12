function save_options() {
    var sensitivity = document.getElementById('sensitivity').value;
    var enable = document.getElementById('enable').checked;
    chrome.storage.sync.set({
        sensitivity: sensitivity,
        enable: enable
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        sensitivity: 'high',
        enable: true
    }, function (items) {
        document.getElementById('sensitivity').value = items.sensitivity;
        document.getElementById('enable').checked = items.enable;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
