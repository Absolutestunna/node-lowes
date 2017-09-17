$( ".product-item" ).on('click', function(e, a){   //use mouseover event
  e.preventDefault();
  var productID = $( this ).data( 'productid' );

  $.get( "http://localhost:1337/product/" + productID, ( resp ) => {
    // $( ".result" ).html( data );
    // alert( "Load was performed." );
    console.log('resp', resp);

    const { productId, marketingBullets, description, imageUrls: { md }, brand, pricing: { price: { selling } }  } = resp;

    var selectedProduct = $(' .selected-product ');
    $(' .selected-product img ').attr('src', md);
    $(' .selected-product img ').attr('alt', brand);
    $(' .product-description h3').html(description);

    var descr_points = [];

    $.each(marketingBullets, function(i, item) {
          descr_points.push('<li>' + item + '</li>');
   });

   try {
     if (descr_points.length > 0){
       $(' .product-description ul').html(descr_points);
     }
   } catch (e) {
     console.log('e', e)
   } finally {
     $(' .product-price h1 ').html("&#36;" + parseInt(selling).toLocaleString());
   }

  });

})
