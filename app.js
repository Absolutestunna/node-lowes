const http = require('http');
const https = require('https');
const express = require('express');
const fs = require('fs');
const ejslint = require('ejs-lint');

var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/assets'));


var url = "https://m.lowes.com/CatalogServices/product/nvalue/v1_0?nValue=4294857975&maxResults=20&showURL=1&rollUpVariants=1&showUrl=true&storeNumber=0595&priceFlag=rangeBalance&showMarketingBullets=1"

let productList;

https.get(url, function(res){
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('Invalid content-type.\n' +
                      `Expected application/json but received ${contentType}`);
  }
  if (error) {
    console.error(error.message);
    // consume response data to free up memory
    res.resume();
    return;
  }


  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {

    try {
      const parsedData = JSON.parse(rawData);
      productList = parsedData.productList;



    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (err) => {
  console.error(`Got error: ${err.message}`);
});


app.get('/', (req, resp) => {
    resp.render('home', { productList: productList });

})

app.get('/product/:id', (req, resp) => {

  // resp.send(req.params.id)

  const product = productList.filter((product) => {
   return product.productId == req.params.id;
 })[0];

 resp.send(product)

})


app.listen(1337, () => {
  console.log('app listening on port 1337')
})
