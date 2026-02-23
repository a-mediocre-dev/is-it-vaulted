document.addEventListener('DOMContentLoaded', function() {
    const errorDiv = document.querySelector("#error-text")
    const vaultedDiv = document.querySelector("#vaulted-status")
    const relicDiv = document.querySelector("#relic-info")
    const button = document.getElementById("submit")

    function check_vaulted_status(era, relic) {
        const url = `https://api.warframestat.us/items/${era}%20${relic}%20intact`
        fetch(url)
        .then(function(response) {
            return response.json()
        }).then(function(json){ 
            if (json.hasOwnProperty("error")) {
                errorDiv.innerHTML = "Invalid relic"
            } else {
                if (json.hasOwnProperty("drops")) {
                    vaultedDiv.innerHTML = "<br><h3 class='is-not-vaulted'>This relic is not vaulted</h3>"
                } else {
                    vaultedDiv.innerHTML = "<br><h3 class='is-vaulted'>This relic is vaulted</h3>"
                }
            }
        })
    }

    function get_relic_data(era, relic) {
        const url = `https://drops.warframestat.us/data/relics/${era}/${relic}.json`
        fetch(url)
        .then(function(response) {
            return response.json()
        }).then(function(json) {
            let html = "<div id=relic-data>"
            let table = "<table>"
            table += "<tr><th>Item Name</th><th>Drop Chance</th></tr>"
            json.rewards.Intact.forEach(function(reward) {

                let wikiUrl = ""

                if (reward.itemName.includes("Forma")) {
                    wikiUrl = "https://wiki.warframe.com/w/Forma"
                } else {
                    const wikiName = reward.itemName.split(" Prime")[0] + "_Prime"
                    wikiUrl = `https://wiki.warframe.com/w/${wikiName.replace(" ", "_")}`
                }


                table += "<tr>"
                table += `<td><span class="item-name"><a href="${wikiUrl}" target="_blank">${reward.itemName}</a></span></td>`
                table += `<td><span class="item-chance"> ${reward.chance}%</span></td>`
                table += "</tr>"
            })
            table += "</table>"
            html += table
            html += "</div>"
            relicDiv.innerHTML = html
        })
            
    }
        button.addEventListener("click", function() {
            const era = document.getElementById("era").value
            const relic = document.getElementById("relic").value
            errorDiv.innerHTML = ""
            check_vaulted_status(era, relic)
            get_relic_data(era, relic)
        })

})
