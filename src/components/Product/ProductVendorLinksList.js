import { OrderList } from 'primereact/orderlist'

const ProductVendorLinksList = ({ product }) => {
  const itemTemplate = (item) => (
    <div className="product-item">
      <div>Screen shot</div>
      <div>Current price - {item.price}</div>
      <div>lowest price - on date</div>
      <div>highest price - on date</div>
      <div>stock <span className={`product-badge status-instock`}>in stock</span></div>

      {/* <div className="product-list-detail">{item.url}</div> */}
    </div>
  )
  return <OrderList listStyle={{ height: 'auto' }} dataKey={'url'} header={product.name} value={product.links} itemTemplate={itemTemplate} />
}

export default ProductVendorLinksList
