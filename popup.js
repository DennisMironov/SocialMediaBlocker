function saveCheckedBoxes() {
    const facebookCheckbox = document.getElementById('facebookCheckbox');
    const twitterCheckbox = document.getElementById('twitterCheckbox');
    const instagramCheckbox = document.getElementById('instagramCheckbox');

    const checkedBoxes = [];

    if (facebookCheckbox.checked) {
        checkedBoxes.push('Facebook');
    }
    if (twitterCheckbox.checked) {
        checkedBoxes.push('Twitter');
    }
    if (instagramCheckbox.checked) {
        checkedBoxes.push('Instagram');
    }

    console.log('Chosen options:', checkedBoxes);
}

document.getElementById('saveBtn').addEventListener('click', saveCheckedBoxes);