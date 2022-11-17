export const emag = {
  price: '//*[@id="main-container"]/section[3]/div/div[1]/div[2]/div/div[2]/div[2]/form/div/div[1]/div[1]/div/div/div[1]/p[2]',
  name: '//*[@id="main-container"]/section[2]/div/div[1]/h1',
  stock: '//*[@id="main-container"]/section[3]/div/div[1]/div[2]/div/div[2]/div[2]/form/div/div[1]/div[3]/p/span',
  image: '//*[@id="product-gallery"]/div[1]/div/div[1]/a'
}


export const ozone = {
  price: "//*[@class='product-view-wrapper']//div[@class='product-options']//p[@class='special-price']//span[@class='price'] | //*[@class='product-view-wrapper']//div[@class='product-options']//span[@class='regular-price']",
  name: '//*[@id="product_addtocart_form"]/div/div[2]/h1',
  stock: '//*[@id="availability-holder"]',
  image: '//*[@id="product_addtocart_form"]/div/div[1]/div[1]/div[1]/div/div/a[1]/img',

}

export const VENDORS_XPATHS = {
  'emag.bg': emag,
  'ozone.bg': ozone,
}
//*[@id="main-container"]/section[3]/div/div[1]/div[2]/div/div[2]/div[2]/form/div/div[1]/div[1]/div/div/div[1]/p[2]
//*[@id="main-container"]/section[3]/div/div[1]/div[2]/div/div[2]/div[2]/form/div/div[1]/div[1]/div/div/div[1]/p[2]
//*[@id="main-container"]/section[3]/div/div[1]/div[2]/div/div[2]/div[2]/form/div/div[1]/div[1]/div/div/div[1]/p[2]
//*[@id="product-price-*"]
//*[@id="product-price-*"]/span