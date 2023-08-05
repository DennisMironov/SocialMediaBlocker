function checkBlockingTime(startTime, endTime) {
    const currentTime = new Date();
    const startTimeDate = new Date(currentTime.toDateString() + " " + startTime);
    const endTimeDate = new Date(currentTime.toDateString() + " " + endTime);

    return currentTime >= startTimeDate && currentTime <= endTimeDate;
}

function blockRequest(details) {
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.action === 'saveSettings') {
            const { startTime, endTime } = request.settings;

            if (checkBlockingTime(startTime, endTime) && (details.url.includes('facebook.com') || details.url.includes('twitter.com') || details.url.includes('instagram.com'))) {
                sendResponse({ blocked: true });
                return { cancel: true };
            }
        }
    });
}

chrome.webRequest.onBeforeRequest.addListener(
    blockRequest,
    { urls: ['<all_urls>'] },
    ['blocking']
);