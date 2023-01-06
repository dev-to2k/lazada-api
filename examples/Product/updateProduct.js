require('dotenv').config()

const appKey = process.env.LAZADA_APP_KEY
const appSecret = process.env.LAZADA_APP_SECRET
const countryCode = process.env.LAZADA_APP_COUNTRY
const accessToken = process.env.LAZADA_APP_ACCESS_TOKEN

const LazadaAPI = require('../../lib')

const aLazadaAPI = new LazadaAPI(appKey, appSecret, countryCode, accessToken)

const productName = 'Test Product (edit)'
const urlImage =
  'https://salt.tikicdn.com/cache/w1200/ts/product/90/57/42/da0ac7fbeb39834088983ce1be065b77.jpg'

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

const updateProduct = async () => {
  try {
    const products = await getProducts()
    const imageUrl = await migrateImage()
    const itemId = products[0].item_id
    const sellerSku = products[0].skus[0].SellerSku

    const res = await aLazadaAPI.updateProduct({
      payload: JSON.stringify({
        Request: {
          Product: {
            ItemId: itemId,
            Images: {
              Image: [imageUrl],
            },
            Attributes: {
              name: productName,
              description: 'TEST',
              brand: 'No Brand',
              model: 'test',
              warranty_type: 'No warranty',
              Hazmat: 'None',
            },
            Skus: {
              Sku: [
                {
                  SellerSku: sellerSku,
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

updateProduct()
