<template>
    <h1>Budget Manager</h1>
    <h2>Total Spend: {{ total }}</h2>
    <h2>Limit: {{ limit }}</h2>
    <label>Enter Amount
        <input type="text" v-model="amount" />
    </label>
    <button v-on:click="spendClicked">Spend</button>
    <button v-on:click="resetClicked">Reset</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const total = ref(0)
const limit = ref(0)
const amount = defineModel<number>()

interface Budget {
    total: string
}

chrome.storage.local.get(["total"]).then((budget: Budget) => {
    console.log("chrome.storage.local.get")
    console.log("budget")
    console.log(budget)
    total.value = parseInt(budget.total)
})

const spendClicked = () => {
    console.log("spend clicked")
    chrome.storage.local.get(["total"]).then((budget: Budget) => {
        console.log("chrome.storage.local.get")
        console.log("budget")
        console.log(budget)
        let newTotal = 0
        if (budget.total) {
            const t = parseInt(budget.total)
            newTotal += t
        }
        if (amount.value) {
            newTotal += Number(amount.value)
        }
        chrome.storage.local.set({ total: newTotal }).then(() => {
            console.log("chrome.storage.local.set")
            console.log(`{total: ${newTotal}}`)
            total.value = newTotal
            amount.value = 0
        })
    })
}

const resetClicked = () => {
    chrome.storage.local.set({ total: 0 }).then(() => {
        console.log("reset clicked")
        console.log("{total: 0}")
        total.value = 0
        amount.value = 0
    })
}
</script>