import { useState } from "react"

interface Budget {
    total: string
}

export default function Popup() {
    const [total, setTotal] = useState(0)
    const [limit, setLimit] = useState(0)
    const [amount, setAmount] = useState(0)

    chrome.storage.local.get(["total"]).then((budget: Budget) => {
        console.log("chrome.storage.local.get")
        setTotal(parseInt(budget.total))
    })

    const spendClicked = () => {
        console.log("spend clicked")
        chrome.storage.local.get(["total"]).then((budget: Budget) => {
            let newTotal = 0
            if (budget.total) {
                newTotal += parseInt(budget.total)
            }
            newTotal += Number(amount)
            chrome.storage.local.set({ total: newTotal }).then(() => {
                console.log("chrome.storage.local.set")
                console.log(`{total: ${newTotal}}`)
                setTotal(newTotal)
                setAmount(0)
            })
        })
    }

    const resetClicked = () => {
        console.log("reset clicked")
        chrome.storage.local.set({ total: 0 }).then(() => {
            console.log("chrome.storage.local.set")
            console.log("{total: 0}")
            setTotal(0)
            setAmount(0)
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
                <button onClick={resetClicked}>Reset</button>
            </div>
        </>
    )
}