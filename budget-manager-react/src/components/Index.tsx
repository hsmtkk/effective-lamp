import { useState } from "react"

export default function Index() {
    const [total, setTotal] = useState(0)
    const [limit, setLimit] = useState(0)
    const [amount, setAmount] = useState(0)

    chrome.storage.local.get(["total", "limit"]).then((result) => {
        console.log("[index] get total & limit from local storage")
        setTotal(parseInt(result.total))
        setLimit(parseInt(result.limit))
    })

    const spendClicked = () => {
        console.log("spend clicked")
        let newTotal = 0
        if (total) {
            newTotal += Number(total)
        }
        newTotal += Number(amount)
        chrome.storage.local.set({ total: newTotal }).then(() => {
            console.log("[index] set total in local storage")
            console.log(`{total: ${newTotal}}`)
        })

        if (newTotal >= limit) {
            const notifyOptions = {
                type: ("basic" as chrome.notifications.TemplateType),
                title: "Limit reached",
                message: "Uh oh! Looks like you've reached your limit!",
                iconUrl: "icon48.png",
            }
            chrome.notifications.create(notifyOptions)
        }

        setTotal(newTotal)
        setAmount(0)
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