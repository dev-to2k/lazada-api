require('dotenv').config()

const appKey = process.env.LAZADA_APP_KEY
const appSecret = process.env.LAZADA_APP_SECRET
const countryCode = process.env.LAZADA_APP_COUNTRY
const accessToken = process.env.LAZADA_APP_ACCESS_TOKEN

const LazadaAPI = require('../../lib')
const fs = require('fs')

const aLazadaAPI = new LazadaAPI(appKey, appSecret, countryCode, accessToken)

const updateStatus = async () => {
  try {
    const res = await aLazadaAPI.setStatusToSOFDelivered({
      order_item_ids: `[400646370212830]`,
    })
    console.log(res)
    return res
  } catch (error) {
    console.log(error)
  }
}

updateStatus()
