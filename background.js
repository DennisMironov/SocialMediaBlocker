// Bug: Hitting save does not apply block right away - Potential fix: sendMessage from popup to background when clicking save and call checkBlockingTimeAndBlock
chrome.alarms.create("timeCheck", { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener(function (alarm) {
    if (alarm.name === "timeCheck") {
        checkBlockingTimeAndBlock();
    }
});

function checkBlockingTimeAndBlock() {
    chrome.storage.sync.get(["startTime", "endTime"], function (result) {
        const startTime = result.startTime || '';
        const endTime = result.endTime || '';

        if (checkBlockingTime(startTime, endTime)) {
            chrome.storage.sync.get(["facebookCheckbox", "twitterCheckbox", "instagramCheckbox"], function (checkboxes) {
                chrome.declarativeNetRequest.updateDynamicRules({
                    removeRuleIds: [1, 2, 3]
                });

                if (checkboxes.facebookCheckbox) {
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
                if (checkboxes.twitterCheckbox) {
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
                if (checkboxes.instagramCheckbox) {
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
            });
        }
        else {
            chrome.declarativeNetRequest.updateDynamicRules({
                removeRuleIds: [1, 2, 3]
            });
        }
    });
}

function checkBlockingTime(startTime, endTime) {
    const currentTime = new Date();
    const startTimeDate = new Date(currentTime.toDateString() + " " + startTime);
    const endTimeDate = new Date(currentTime.toDateString() + " " + endTime);

    return currentTime >= startTimeDate && currentTime <= endTimeDate;
}