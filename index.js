const puppeteer = require('puppeteer')
const args = require('args')
    .option('url', 'target url', 'https://google.com')
    .option('depth', 'select depth', 2)
const flags = args.parse(process.argv)

const scrape = async(flags) => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()

    await page.goto(flags.url)
    await page.click('a')
    await page.waitFor(1000)

    const result = await page.evaluate(() => {
        let href = document.querySelectorAll('a')

        return {
            href
        }

    });

    browser.close()
    return result
};

scrape(flags).then((value) => {
    console.log(value) // Success!
})