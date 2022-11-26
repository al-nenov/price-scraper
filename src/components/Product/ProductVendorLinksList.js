import Link from 'next/link'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { OrderList } from 'primereact/orderlist'
import { getMaxPrice, getMinPrice } from 'utils/price/getAbsolute'
import styles from './ProductVendorLinksList.module.scss'
import { getVendor } from 'utils/scraper/utils/getVendor'
import { Tooltip } from 'primereact/tooltip';
import { Button } from 'primereact/button'
import AddItemToProductForm from 'components/Forms/AddItemToProductForm'

const ProductVendorLinksList = ({ product }) => {
  const itemTemplate = (item) => (
    <div className={styles["product-item"]}>
      <div className={styles["image-container"]}>
        <img src={`images/product/${item.image}`} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={item.name} />
      </div>
      <div className={styles["product-list-detail"]}>vendor</div>
      <div>Current price - {item.price}</div>
      <div>Min price - {getMinPrice(item.priceLog).price}</div>
      <div>Max price - {getMaxPrice(item.priceLog).price}</div>
      <div className="product-list-action">stock <span className={`product-badge status-instock`}>in stock</span></div>

      {/* <div className="product-list-detail">{item.url}</div> */}
    </div>
  )

  const vendorBodyTemplate = (rowData) => (
    <Link href={rowData.url} target="_blank">
      {getVendor(rowData.url).domain}
    </Link>
  )

  const header =
    <div className={styles.tableHeader}>
      {product.name}
      <Button icon="pi pi-plus" className="p-button-rounded p-button-success" aria-label="Add product" tooltip='Add product vendor' tooltipOptions={{ position: 'top' }} />
    </div>




  return (
    <>
      <DataTable header={header} value={product.links} itemTemplate={itemTemplate}>
        <Column field="url" header="Vendor" body={vendorBodyTemplate} />
        <Column field="price" header="Price" />
        <Column field="priceLog" header="Min Price" body={(rowData) => getMinPrice(rowData.priceLog).price} />
        <Column field="priceLog" header="Max Price" body={(rowData) => <Button tooltip="Purple" tooltipOptions={{ className: 'purple-tooltip', position: 'top' }}>{getMaxPrice(rowData.priceLog).price}</Button>} />
      </DataTable>
      <div className='mt-3'>
        <AddItemToProductForm product={product} />
      </div>
    </>
  )
}

export default ProductVendorLinksList
