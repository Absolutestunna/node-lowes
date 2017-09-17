

$( ".product-item" ).on('mouseover', function(e){
  e.preventDefault();

  let productID = $( this ).data( 'productid' );        //product id of the hovered product.

  $.get( `http://localhost:1337/product/${ productID }`, ( resp ) => {

    const { productId, marketingBullets, description, imageUrls: { md }, brand, pricing: { price: { selling } }  } = resp;

    $(' .product-description h3').html(description);     //update the product description;
    $(' .selected-product img ').attr('src', md);        //update the image attribute
    $(' .selected-product img ').attr('alt', brand);     //update the alt attribute
    $(' .selected-product').data({"productprice": selling, "productdescription": description});  //update items for alert message

    let descr_points = [];

    $.each(marketingBullets, (i, item) => {
          descr_points.push('<li>' + item + '</li>');
   });

    $(' .product-description ul').html(descr_points);     //update marketing bullet points

    $(' .product-price h1 ').html("&#36;" + priceFormatter(selling));   //format price into currency format
  });

})

$( "#cart" ).on('click', (e) => {
  e.preventDefault();
  const selectedProduct = $('#sel-product');

  const price = priceFormatter("productprice"));
  const description = selectedProduct.data("productdescription");

  alert(`Product: ${ description } \n
    Price: $${ price }
    `)
})


const priceFormatter(number) => {
  return parseInt(number).toLocaleString();
}
