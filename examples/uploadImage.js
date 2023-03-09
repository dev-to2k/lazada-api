require('dotenv').config()
const appKey = process.env.LAZADA_APP_KEY
const appSecret = process.env.LAZADA_APP_SECRET
const countryCode = process.env.LAZADA_APP_COUNTRY
const accessToken = process.env.LAZADA_APP_ACCESS_TOKEN

const LazadaAPI = require('../lib') // require transpiled js code
const aLazadaAPI = new LazadaAPI(appKey, appSecret, countryCode, accessToken)

const fs = require('fs')
const path = require('path')

const imagePath = path.join(
  'C:',
  'Users',
  'Trung',
  'Desktop',
  'img',
  '76720767_268545654101201_8598966302633099264_n.jpg',
)
// const imageBuffer = fs.readFileSync(imagePath)
// const imageBytes = new Uint8Array(imageBuffer)

const file = fs.createReadStream(imagePath)

// mảng chứa dữ liệu ảnh đã được đọc
let imageData = []

file.on('data', (chunk) => {
  imageData.push(chunk)
})

file.on('end', () => {
  const byteData = Buffer.concat(imageData)

  console.log('Đã đọc và xử lý xong dữ liệu ảnh.')
  aLazadaAPI
    .uploadImage({
      image: byteData,
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => console.log(err))
})

file.on('error', (err) => {
  console.error('Lỗi khi đọc tệp ảnh:', err)
})
