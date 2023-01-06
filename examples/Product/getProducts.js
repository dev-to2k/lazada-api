require('dotenv').config()

const appKey = process.env.LAZADA_APP_KEY
const appSecret = process.env.LAZADA_APP_SECRET
const countryCode = process.env.LAZADA_APP_COUNTRY
const accessToken = process.env.LAZADA_APP_ACCESS_TOKEN

const LazadaAPI = require('../../lib')

const aLazadaAPI = new LazadaAPI(appKey, appSecret, countryCode, accessToken)

const getProducts = async () => {
  try {
    const res = await aLazadaAPI.getProducts({
      filter: 'all',
    })
    console.log(res.data.products)
    return res
  } catch (error) {
    console.log(error)
  }
}

getProducts()
