const fs = require("fs")
const cheerio = require('../node_modules/cheerio')
const {saveToHTML} = require('./save_html')

async function getNFTVolume() {
    const $ = cheerio.load(fs.readFileSync('./Scrapers/HTMLs/NFT.html'))
    let NFTobj = []
    
    console.log("HTML loaded. Parsing...")
    
    $('.table.table-hover.js-top-by-sales-table-24h.summary-sales-table tbody tr').each(function() {
        let ranking = '', collection = '', chain = '', sale = '', change24h = '', buyer = '', txn = ''

        $(this).find('td').each(function(i) {
            switch(i) {
                case 0:
                    ranking = $(this).text()
                    break
                case 1:
                    collection = $(this).find('.summary-sales-table__column-product-name').text()
                    break
                case 2:
                    chain = $(this).find('img').attr('title') ? $(this).find('img').attr('title') : $(this).find('img').attr('data-original-title')
                    if (chain === undefined || chain.length == 0) chain = 'NaN'
                    break
                case 3:
                    sale = $(this).find('span a span').text().replace(/[^\d.-]/g, '');
                    break
                case 4:
                    change24h = $(this).find('span').text().trim()
                    const sign = $(this).find('span span').attr('class')
                    if (sign == 'caret') change24h = '-' + change24h
                    break
                case 5:
                    buyer = $(this).text()
                    break
                case 6:
                    txn = $(this).find('a').text().trim()
            }
        })
        
        NFTobj.push({
            ranking,
            collection,
            chain,
            sale,
            change24h,
            buyer,
            txn
        })

    })
    
    console.log("Object for top 50 NFT by volume generated.")
    return NFTobj.slice(0,50)
}

function saveToJSON(path, name, obj) {
    const saveJson = JSON.stringify(obj, null, 4)
    fs.writeFileSync(`${path}${name}.json`, saveJson, 'utf8', (err) => {
        if (err) {
            console.log(err)
        }
    })
    console.log('JSON object ready to view.')
}

const url = "https://cryptoslam.io/"

async function getResult() {
    await saveToHTML('./Scrapers/HTMLs/', "NFT", url)
    const result = await getNFTVolume()
    saveToJSON('./Results/', 'top50', result)

    console.log("Printing top 5 for preview...")
    for(let i = 0; i < 5; i++) console.log(result[i])
}

// main
getResult()