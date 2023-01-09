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
      created_after: '2018-02-09T22:44:30+08:00', // new Date().toISOString() => date
      update_after: '2018-02-09T22:44:30+08:00',
    })
    console.log(res.data.orders)
    return res
  } catch (error) {
    console.log(error)
  }
}

getOrders()
