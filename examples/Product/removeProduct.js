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
    return res.data.products
  } catch (error) {
    console.log(error)
  }
}

const removeProduct = async () => {
  try {
    const products = await getProducts()

    const itemId = products[0].item_id
    const skuId = products[0].skus[0].SkuId

    const res = await aLazadaAPI.removeProduct({
      seller_sku_list: `["SkuId_${itemId}_${skuId}"]`,
    })
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

removeProduct()
