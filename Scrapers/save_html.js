const axios = require('../node_modules/axios')
const fs = require('fs');

async function saveToHTML(path, name, url) {
    console.log("Downloading HTML...")
    const resp = await axios.get(url)
    
    const saveHTML = resp.data
    fs.writeFileSync(`${path}${name}.html`, saveHTML, 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })

    console.log("HTML Saved.")
}

module.exports = {
    saveToHTML
}

