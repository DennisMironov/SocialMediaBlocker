// Bug: Still blocked after end time, need to hit 'save' for it to become unblocked. Vice versa also applies, i.e. doesn't block after reaching start time, need to hit save during blocking period.
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "saveSettings") {
        const { facebookCheckbox, twitterCheckbox, instagramCheckbox, startTime, endTime } = request.settings;

        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: [1, 2, 3]
        });

        if (checkBlockingTime(startTime, endTime)) {
            if (facebookCheckbox) {
                chrome.declarativeNetRequest.updateDynamicRules({
                    addRules: [
                        {
                            id: 1,
                            priority: 1,
                            action: {
                                type: "block"
                            },
                            condition: {
                                urlFilter: "||facebook.com/",
                                resourceTypes: ["main_frame"]
                            }
                        }
                    ]
                });
            }
            if (twitterCheckbox) {
                chrome.declarativeNetRequest.updateDynamicRules({
                    addRules: [
                        {
                            id: 2,
                            priority: 1,
                            action: {
                                type: "block"
                            },
                            condition: {
                                urlFilter: "||twitter.com/",
                                resourceTypes: ["main_frame"]
                            }
                        }
                    ]
                });
            }
            if (instagramCheckbox) {
                chrome.declarativeNetRequest.updateDynamicRules({
                    addRules: [
                        {
                            id: 3,
                            priority: 1,
                            action: {
                                type: "block"
                            },
                            condition: {
                                urlFilter: "||instagram.com/",
                                resourceTypes: ["main_frame"]
                            }
                        }
                    ]
                });
            }

            sendResponse({ blocked: true });
            return;
        }

        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: [1, 2, 3]
        });

        sendResponse({ blocked: false });
    }
});

function checkBlockingTime(startTime, endTime) {
    const currentTime = new Date();
    const startTimeDate = new Date(currentTime.toDateString() + " " + startTime);
    const endTimeDate = new Date(currentTime.toDateString() + " " + endTime);

    return currentTime >= startTimeDate && currentTime <= endTimeDate;
}