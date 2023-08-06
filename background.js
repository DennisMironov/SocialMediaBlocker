const blockRuleId = 1;

chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: [blockRuleId],
        addRules: [
            {
                id: blockRuleId,
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
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "saveSettings") {
        const { startTime, endTime } = request.settings;

        if (checkBlockingTime(startTime, endTime)) {
            chrome.declarativeNetRequest.updateDynamicRules({
                removeRuleIds: [blockRuleId],
                addRules: [
                    {
                        id: blockRuleId,
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

            sendResponse({ blocked: true });
            return;
        }

        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: [blockRuleId]
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