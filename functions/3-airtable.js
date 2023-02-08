require('dotenv').config()
const Airtable = require('airtable-node')

const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY})
  .base('appOF6qYsQjC0R7UY')
  .table('products')

exports.handler = async (event, context, cb) => {
  try {
    const {records}= await airtable.list()
    const products=records.map((aaa)=>{
           const { id } = aaa
           const { name, image, price } = aaa.fields
            const url = image[0].url
                  return { id, name, url, price }
    })
   
    return {
      statusCode: 200,

      body: JSON.stringify(products),
       
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Server Error',
    }
  }
}
