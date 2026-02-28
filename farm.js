function createFarmEntry(resourceName, current, target) {
    const tr = document.createElement("tr")
    tr.classList.add("farm-entry", "not-at-target")

    const resourceTd = document.createElement("td")
    resourceTd.className = "resource-td"
    const resourceSpan = document.createElement("span")
    resourceSpan.className = "resource-name"
    resourceSpan.textContent = resourceName
    resourceTd.appendChild(resourceSpan)

    const currentTd = document.createElement("td")
    currentTd.className = "current-td"
    const currentSpan = document.createElement("span")
    currentSpan.className = "current-amount"
    currentSpan.textContent = current
    currentTd.appendChild(currentSpan)

    const targetTd = document.createElement("td")
    targetTd.className = "target-td"
    const targetSpan = document.createElement("span")
    targetSpan.className = "target-amount"
    targetSpan.textContent = target
    targetTd.appendChild(targetSpan)

    const incrementTd = document.createElement("td")
    incrementTd.className = "increment-td"
    const incrementButton = document.createElement("button")
    incrementButton.className = "increment"
    incrementButton.textContent = "+"
    incrementTd.appendChild(incrementButton)

    const decrementTd = document.createElement("td")
    decrementTd.className = "decrement-td"
    const decrementButton = document.createElement("button")
    decrementButton.className = "decrement"
    decrementButton.textContent = "-"
    decrementTd.appendChild(decrementButton)

    const removeTd = document.createElement("td")
    removeTd.className = "remove-td"
    const removeButton = document.createElement("button")
    removeButton.className = "remove"
    removeButton.textContent = "X"
    removeTd.appendChild(removeButton)

    tr.appendChild(resourceTd)
    tr.appendChild(currentTd)
    tr.appendChild(targetTd)
    tr.appendChild(incrementTd)
    tr.appendChild(decrementTd)
    tr.appendChild(removeTd)

    return tr
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("farm.js loaded")
    const farmTable = document.querySelector("#farm-table")
    const addTracker = document.querySelector("#add-tracker")

    addTracker.addEventListener('click', () => {
        const resourceName = document.querySelector("#resource-name").value
        const target = parseInt(document.querySelector("#target").value)
        console.log(resourceName)
        console.log(target)

        farmTable.appendChild(createFarmEntry(resourceName, 0, target))
    })


    farmTable.addEventListener('click', function(event) {

        const steps = parseInt(document.querySelector("#steps").value)
        let parentRow = event.target.closest("tr")
        let currentSpan = parentRow.querySelector(".current-amount")
        const targetSpan = parentRow.querySelector(".target-amount")
        if (!currentSpan || !targetSpan) return
        let current = parseInt(currentSpan.textContent)
        const target = parseInt(targetSpan.textContent)

        if (event.target.className === "decrement") {
            let newValue = current - steps
            if (newValue > 0) {
                currentSpan.textContent = current - steps
            } else {
                currentSpan.textContent = 0
            }
            if (newValue < target) {
                parentRow.classList.add("not-at-target")
                parentRow.classList.remove("at-target")
            }
        }

        if (event.target.className === "increment") {
            currentSpan.textContent = current + steps
            if (current + steps >= target && parentRow.classList.contains("not-at-target")) {
                parentRow.classList.remove("not-at-target")
                parentRow.classList.add("at-target")
            }
        }

        if (event.target.className === "remove") {
            console.log("TIME TO REMOVE")
            parentRow.remove()
        }
    })
})
