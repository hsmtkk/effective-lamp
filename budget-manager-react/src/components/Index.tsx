import { useState } from "react"

export default function Index() {
    const [total, setTotal] = useState(0)
    const [limit, setLimit] = useState(0)
    const [amount, setAmount] = useState(0)

    chrome.storage.local.get(["total"]).then((result) => {
        console.log("chrome.storage.local.get")
        setTotal(parseInt(result.total))
    })

    chrome.storage.local.get(["limit"]).then((result) => {
        console.log("chrome.storage.local.get")
        setLimit(parseInt(result.limit))
    })


    const spendClicked = () => {
        console.log("spend clicked")
        chrome.storage.local.get(["total"]).then((result) => {
            let newTotal = 0
            if (result.total) {
                newTotal += parseInt(result.total)
            }
            newTotal += Number(amount)
            chrome.storage.local.set({ total: newTotal }).then(() => {
                console.log("chrome.storage.local.set")
                console.log(`{total: ${newTotal}}`)

                const notifyOptions = {
                    type: ("basic" as chrome.notifications.TemplateType),
                    title: "Limit reached",
                    message: "Uh oh! Looks like you've reached your limit!",
                    iconUrl: "icon48.png",
                }
                chrome.notifications.create(notifyOptions)

                setTotal(newTotal)
                setAmount(0)
            })
        })
    }

    return (
        <>
            <h1>Budget Manager</h1>
            <h2>Total Spend: {total}</h2>
            <h2>Limit: {limit}</h2>
            <label>Enter Amount:
                <input type="text" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} />
            </label>
            <div>
                <button onClick={spendClicked}>Spend</button>
            </div>
        </>
    )
}