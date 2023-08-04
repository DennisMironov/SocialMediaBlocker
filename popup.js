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
        startTimeInput: startTimeInput.value,
        endTimeInput: endTimeInput.value,
    };

    chrome.storage.sync.set(checkedBoxes, function () {
        console.log('Checked boxes and time data saved:', checkedBoxes);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.sync.get(['facebookCheckbox', 'twitterCheckbox', 'instagramCheckbox', 'startTimeInput', 'endTimeInput'], function (result) {
        const facebookCheckbox = document.getElementById('facebookCheckbox');
        const twitterCheckbox = document.getElementById('twitterCheckbox');
        const instagramCheckbox = document.getElementById('instagramCheckbox');
        const startTimeInput = document.getElementById('startTime');
        const endTimeInput = document.getElementById('endTime');

        facebookCheckbox.checked = result.facebookCheckbox || false;
        twitterCheckbox.checked = result.twitterCheckbox || false;
        instagramCheckbox.checked = result.instagramCheckbox || false;
        startTimeInput.value = result.startTimeInput || '';
        endTimeInput.value = result.endTimeInput || '';

        console.log('Retrieved data:', result);
    });
});

document.getElementById('saveBtn').addEventListener('click', saveCheckedBoxes);