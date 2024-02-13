console.log("background")

const props: chrome.contextMenus.CreateProperties = {
    id: "spendMoney",
    title: "SpendMoney",
    contexts: ["selection"],
}

chrome.contextMenus.create(props)

const dataClicked = (info: chrome.contextMenus.OnClickData) => {
    if (info.menuItemId === "spendMoney" && info.selectionText) {
        chrome.storage.local.get(["total", "limit"]).then((result) => {
            let newTotal = 0
            if (result.total) {
                newTotal += parseInt(result.total)
            }
            newTotal += parseInt(info.selectionText!)
            chrome.storage.local.set({ total: newTotal }).then((_result) => {
                if (newTotal >= result.limit) {
                    const notifyOptions = {
                        type: ("basic" as chrome.notifications.TemplateType),
                        iconUrl: "icon48.png",
                        title: "Limit reached!",
                        message: "Uh oh! Looks like you've reached your limit!",
                    }
                    chrome.notifications.create("limitNotification", notifyOptions)
                }
            })
        })
    }
}

chrome.contextMenus.onClicked.addListener(dataClicked)

chrome.storage.onChanged.addListener((changes: object, _areaName: string) => {
    chrome.browserAction.setBadgeText({ text: changes.total.newValue.toString() })
})
