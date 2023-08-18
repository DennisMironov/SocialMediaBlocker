function saveCheckedBoxes() {
    const facebookCheckbox = document.getElementById('facebookCheckbox');
    const twitterCheckbox = document.getElementById('twitterCheckbox');
    const instagramCheckbox = document.getElementById('instagramCheckbox');
    const tiktokCheckbox = document.getElementById('tiktokCheckbox');
    const redditCheckbox = document.getElementById('redditCheckbox');
    const youtubeCheckbox = document.getElementById('youtubeCheckbox');
    const startTimeInput = document.getElementById('startTime');
    const endTimeInput = document.getElementById('endTime');

    const checkedBoxes = {
        facebookCheckbox: facebookCheckbox.checked,
        twitterCheckbox: twitterCheckbox.checked,
        instagramCheckbox: instagramCheckbox.checked,
        tiktokCheckbox: tiktokCheckbox.checked,
        redditCheckbox: redditCheckbox.checked,
        youtubeCheckbox: youtubeCheckbox.checked,
        startTime: startTimeInput.value,
        endTime: endTimeInput.value,
    };

    chrome.storage.sync.set(checkedBoxes, function () {
        console.log('Checked boxes and time data saved:', checkedBoxes);
    });

    chrome.runtime.sendMessage({ action: "saveSettings" }, function (response) {
        console.log("Settings applied");
    });

    alert("Settings saved and applied.");
}

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(['facebookCheckbox', 'twitterCheckbox', 'instagramCheckbox', 'tiktokCheckbox', 'redditCheckbox', 'youtubeCheckbox', 'startTime', 'endTime'], function (result) {
        const facebookCheckbox = document.getElementById('facebookCheckbox');
        const twitterCheckbox = document.getElementById('twitterCheckbox');
        const instagramCheckbox = document.getElementById('instagramCheckbox');
        const tiktokCheckbox = document.getElementById('tiktokCheckbox');
        const redditCheckbox = document.getElementById('redditCheckbox');
        const youtubeCheckbox = document.getElementById('youtubeCheckbox');
        const startTimeInput = document.getElementById('startTime');
        const endTimeInput = document.getElementById('endTime');

        facebookCheckbox.checked = result.facebookCheckbox || false;
        twitterCheckbox.checked = result.twitterCheckbox || false;
        instagramCheckbox.checked = result.instagramCheckbox || false;
        tiktokCheckbox.checked = result.tiktokCheckbox || false;
        redditCheckbox.checked = result.redditCheckbox || false;
        youtubeCheckbox.checked = result.youtubeCheckbox || false;
        startTimeInput.value = result.startTime || '';
        endTimeInput.value = result.endTime || '';

        console.log('Retrieved data:', result);
    });
});

document.getElementById('saveBtn').addEventListener('click', saveCheckedBoxes);