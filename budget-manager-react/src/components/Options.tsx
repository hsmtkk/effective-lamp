import { useState } from "react"

export default function Options() {
    const [limit, setLimit] = useState(0)

    const saveLimitClicked = () => {
        console.log("save limit clicked")
        chrome.storage.local.set({ limit: limit }).then(() => {
            console.log("[option] set limit in local storage")
            console.log(`{limit: ${limit}}`)
        })
    }

    const resetTotalClicked = () => {
        console.log("reset total clicked")
        chrome.storage.local.set({ total: 0 }).then(() => {
            console.log("[option] reset limit as 0 in local storage")
            console.log("{total: 0}")
        })
    }

    return (
        <>
            <h1>Budget Manager Options</h1>
            <label>Limit:
                <input type="text" value={limit} onChange={(e) => { setLimit(parseInt(e.target.value)) }} />
            </label>
            <button onClick={saveLimitClicked}>Save Limit</button>
            <button onClick={resetTotalClicked}>Reset Total</button>
        </>
    )
}