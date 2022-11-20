import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import styles from './ProductList.module.scss'
import Link from 'next/link';
import { scrapeProductPrices } from "utils/scraper/scraper"
import axios from 'axios';


const ProductList = ({ products }) => {
  const header = (
    <div className={styles.tableHeader}>
      Products
      <Button icon="pi pi-refresh" onClick={() => scrapeProductPrices()} />
    </div>
  );
  const footer = `In total there are ${products ? products.length : 0} products.`;
  const formatCurrency = (value) => {
    return value && value.toLocaleString('bg-BG') + ' лв.';
  }

  const imageBodyTemplate = (rowData) => {
    return (
      <img src={rowData.image} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className={styles.productImage} />
    )
  }

  const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.lowestPrice);
  }



  const statusBodyTemplate = (rowData) => {
    return <span className={`product-badge status-${rowData?.inventoryStatus?.toLowerCase()}`}>{rowData?.inventoryStatus}</span>;
  }

  const nameBodyTemplate = (rowData) => {
    return (
      rowData.id ? <Link href={`/product/${rowData.id}`}>{rowData.name}</Link> : rowData.name
    )
  }
  return (
    <div className={styles.productListTable}>
      <div className="card">
        <DataTable value={products} header={header} footer={footer} responsiveLayout="scroll" showGridlines stripedRows >
          <Column field="name" className={styles.nameColumn} header="Name" body={nameBodyTemplate} filter sortable />
          <Column className={styles.imageColumn} header="Image" body={imageBodyTemplate} />
          <Column field="lowestPrice" header="Price" body={priceBodyTemplate} sortable />
          <Column field="lowestPriceEver" header="Lowest Price" body={(rowData) => formatCurrency(rowData.lowestPriceEver)} sortable />
          <Column header="Status" body={statusBodyTemplate}></Column>
        </DataTable>
      </div>
    </div>
  )
}

export default ProductList
