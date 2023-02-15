require('dotenv').config()

const appKey = process.env.LAZADA_APP_KEY
const appSecret = process.env.LAZADA_APP_SECRET
const countryCode = process.env.LAZADA_APP_COUNTRY
const accessToken = process.env.LAZADA_APP_ACCESS_TOKEN

const LazadaAPI = require('../../lib')

const aLazadaAPI = new LazadaAPI(appKey, appSecret, countryCode, accessToken)

const getProducts = async () => {
  try {
    const res = await aLazadaAPI.getProductItem({
      item_id: 2171151308,
      //   seller_sku: 'product-item 2023',
    })
    console.log(res)
    return res
  } catch (error) {
    console.log(error)
  }
}

getProducts()
