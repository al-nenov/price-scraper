import { stripFromText } from 'utils/priceStringToNum';
import { getVendor } from 'utils/scraper/utils/getVendor';
import { getXpath } from 'utils/scraper/utils/getXpath';

const puppeteer = require('puppeteer');

export default async function productInfoScraper(req, res) {
    // TODO: Handle validations - no query
  const product = req.query
  const { domain } = getVendor(product.url)
  const selectors = await getXpath(domain)
  const xpath = {
    price: product.xpath || selectors?.price,
    name: product.name || selectors?.name,
    image: product.image || selectors?.image,
    stock: product.stock || selectors?.stock,
  }

  const browser = await puppeteer.launch({
    headless: true // setting this to true will not run the UI
  });

  const page = await browser.newPage();

  if (!product.url) {
    return res.status(403).json({ status: 'No link' })
  }

  try {
    await page.goto(product.url);
  } catch (error) {
    await page.close();
    res.status(403).json({
      status: 'failed',
      error: error.name
    })
    await browser.close()
    throw error;
  }

  const getElText = async (selector) => {
    try {
      const textContent = await page.$x(selector).then(async (el) => await page.evaluate(el => el.textContent, el[0]))
      return textContent
    } catch (e) {
      console.log('Error while getting element ', e)
      return ''
    }
  }

  // const getElHtml = async (selector, type) => {
  //   const [el] = await page.$x(selector)
  //   if (!el) return
  //   const propertyType = await el.getProperty(type)
  //   const image = await propertyType.jsonValue()

  //   return image
  // }

  const price = xpath.price && await getElText(xpath.price)
  const name = xpath.name && await getElText(xpath.name)
  const image = xpath.image && await getElText(xpath.image, 'src')
  // TODO: Pass value for stock

  if (price) {
    const response = {
      price: stripFromText(price),
      name,
      image
    }

    res.status(200).json(response)
  } else {
    res.status(403).json({
      status: 'failed',
      error: 'Couldn\'t retrieve price'
    })
  }

  await browser.close();
  return
}
