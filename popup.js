function saveCheckedBoxes() {
    const facebookCheckbox = document.getElementById('facebookCheckbox');
    const twitterCheckbox = document.getElementById('twitterCheckbox');
    const instagramCheckbox = document.getElementById('instagramCheckbox');
    const startTimeInput = document.getElementById('startTime');
    const endTimeInput = document.getElementById('endTime');

    const checkedBoxes = {
        facebookCheckbox: facebookCheckbox.checked,
        twitterCheckbox: twitterCheckbox.checked,
        instagramCheckbox: instagramCheckbox.checked,
        startTime: startTimeInput.value,
        endTime: endTimeInput.value,
    };

    chrome.runtime.sendMessage({ action: 'saveSettings', settings: checkedBoxes }, function (response) {
        console.log('Settings saved in background script:', response);
    });

    chrome.storage.sync.set(checkedBoxes, function () {
        console.log('Checked boxes and time data saved:', checkedBoxes);
    });

    alert("Settings saved and applied.");
}

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(['facebookCheckbox', 'twitterCheckbox', 'instagramCheckbox', 'startTime', 'endTime'], function (result) {
        const facebookCheckbox = document.getElementById('facebookCheckbox');
        const twitterCheckbox = document.getElementById('twitterCheckbox');
        const instagramCheckbox = document.getElementById('instagramCheckbox');
        const startTimeInput = document.getElementById('startTime');
        const endTimeInput = document.getElementById('endTime');

        facebookCheckbox.checked = result.facebookCheckbox || false;
        twitterCheckbox.checked = result.twitterCheckbox || false;
        instagramCheckbox.checked = result.instagramCheckbox || false;
        startTimeInput.value = result.startTime || '';
        endTimeInput.value = result.endTime || '';

        console.log('Retrieved data:', result);
    });
});

document.getElementById('saveBtn').addEventListener('click', saveCheckedBoxes);