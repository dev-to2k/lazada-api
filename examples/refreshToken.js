require('dotenv').config()
const appKey = process.env.LAZADA_APP_KEY
const appSecret = process.env.LAZADA_APP_SECRET
const countryCode = process.env.LAZADA_APP_COUNTRY
// const accessToken = process.env.LAZADA_APP_ACCESS_TOKEN

const LazadaAPI = require('../lib') // require transpiled js code
/**
 * LazadaAPI's constructor
 * @param {string} appKey
 * @param {string} appSecret
 * @param {Venture} countryCode @ref: 'src/LazadaClient/constants.js'
 * | 'SINGAPORE'
 * | 'THAILAND'
 * | 'MALAYSIA'
 * | 'VIETNAM'
 * | 'PHILIPPINES'
 * | 'INDONESIA'
 * @param {?string} accessToken
 */
const aLazadaAPI = new LazadaAPI(appKey, appSecret, countryCode)

const refreshToken = async () => {
  try {
    const res = await aLazadaAPI.refreshAccessToken({
      refresh_token: process.env.LAZADA_REFRESH_TOKEN,
    })
    console.log(res)
    return res
  } catch (error) {
    console.log(error)
  }
}

refreshToken()
