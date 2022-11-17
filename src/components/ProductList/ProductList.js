import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import styles from './ProductList.module.css'
import Link from 'next/link';
import { scrapeProductPrices } from "utils/scraper/scraper"
import axios from 'axios';


const ProductList = ({ products }) => {
  const header = (
    <div className="table-header">
      Products
      <Button icon="pi pi-refresh" onClick={() => scrapeProductPrices()} />
    </div>
  );
  const footer = `In total there are ${products ? products.length : 0} products.`;
  const formatCurrency = (value) => {
    return value && value.toLocaleString('bg-BG') + ' лв.';
  }

  const imageBodyTemplate = (rowData) => {
    return <img src={rowData.image} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />;
  }

  const priceBodyTemplate = (rowData) => {

    return formatCurrency(rowData.lowestPrice);
  }

  const ratingBodyTemplate = (rowData) => {
    return <Rating value={rowData.rating} readOnly cancel={false} />;
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
    <div className={styles.productList}>
      <div className="datatable-templating-demo">
        <div className="card">
          <DataTable value={products} header={header} footer={footer} responsiveLayout="scroll">
            <Column field="name" header="Name" body={nameBodyTemplate}></Column>
            <Column header="Image" body={imageBodyTemplate}></Column>
            <Column field="price" header="Price" body={priceBodyTemplate}></Column>
            <Column field="lowestPriceEver" header="Lowest Price" body={(rowData) => formatCurrency(rowData.lowestPriceEver)}></Column>
            <Column field="category" header="Category"></Column>
            <Column field="rating" header="Reviews" body={ratingBodyTemplate}></Column>
            <Column header="Status" body={statusBodyTemplate}></Column>
          </DataTable>
        </div>
      </div>

    </div>
  )
}

export default ProductList
