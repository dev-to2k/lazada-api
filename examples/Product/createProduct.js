require('dotenv').config()

const appKey = process.env.LAZADA_APP_KEY
const appSecret = process.env.LAZADA_APP_SECRET
const countryCode = process.env.LAZADA_APP_COUNTRY
const accessToken = process.env.LAZADA_APP_ACCESS_TOKEN

const LazadaAPI = require('../../lib')
const fs = require('fs')

const aLazadaAPI = new LazadaAPI(appKey, appSecret, countryCode, accessToken)

const productName = 'Ban phim co'
const urlImage =
  'https://gearshop.vn/upload/images/Product/Keycool/KC84%20Pro/Smoke%20Black/KEYCOOL-KC84-Pro--Smoke-Black-(1).jpg'

const getCategorySuggest = async () => {
  try {
    const res = await aLazadaAPI.getCategorySuggest({
      product_name: productName,
    })

    const { categorySuggestions } = res.data
    const categoryId = categorySuggestions[0].categoryId
    return categoryId
  } catch (error) {
    console.log(error)
  }
}

const migrateImage = async () => {
  try {
    const res = await aLazadaAPI.migrateImage({
      payload: `<?xml version="1.0" encoding="UTF-8"?><Request><Image><Url>${urlImage}</Url></Image></Request>`,
    })

    const { url } = res.data.image
    return url
  } catch (error) {
    console.log(error)
  }
}

const createProduct = async () => {
  try {
    const categoryId = await getCategorySuggest()
    const imageUrl = await migrateImage()

    const res = await aLazadaAPI.createProduct({
      payload: JSON.stringify({
        Request: {
          Product: {
            PrimaryCategory: categoryId,
            Images: {
              Image: [imageUrl],
            },
            Attributes: {
              name: productName,
              description: 'TEST',
              brand: 'No Brand',
              model: 'test',
              waterproof: 'None',
              warranty_type: 'No warranty',
              Hazmat: 'None',
              material: 'Plastic',
            },
            Skus: {
              Sku: [
                {
                  SellerSku: productName,
                  quantity: '3',
                  price: '3500000',
                  package_height: '10',
                  package_length: '10',
                  package_width: '10',
                  package_weight: '0.5',
                  Images: {
                    Image: [imageUrl],
                  },
                },
              ],
            },
          },
        },
      }),
    })
    console.log(res)
  } catch (error) {
    console.log(error)
  }
}

createProduct()
