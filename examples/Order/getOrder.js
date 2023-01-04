require('dotenv').config()

const appKey = process.env.LAZADA_APP_KEY
const appSecret = process.env.LAZADA_APP_SECRET
const countryCode = process.env.LAZADA_APP_COUNTRY
const accessToken = process.env.LAZADA_APP_ACCESS_TOKEN

const LazadaAPI = require('../../lib')
const fs = require('fs')

const aLazadaAPI = new LazadaAPI(appKey, appSecret, countryCode, accessToken)

const getOrders = async () => {
  try {
    const res = await aLazadaAPI.getOrders({
      sort_by: 'created_at',
    })
    console.log(res.data.orders)
    return res
  } catch (error) {
    console.log(error)
  }
}

getOrders()
