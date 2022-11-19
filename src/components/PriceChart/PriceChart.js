import { Chart } from 'primereact/chart';
import { getDateFromTimestamp } from 'utils/date/getDateFromTimestamp';
import { basicOptions } from './priceChart.options'


const PriceChart = ({ priceLog }) => {
  if (!priceLog || priceLog.length < 2) {
    return null
  }

  const [labelsArray, dataArray] = priceLog.reduce(([labelsArray, dataArray], {date, price}) => {
    
    labelsArray.push(getDateFromTimestamp(date))
    dataArray.push(price)
    return [labelsArray, dataArray]
  } ,[[],[]] )

  
  
  const multiAxisData = {
    labels: labelsArray,
    datasets: [{
      label: 'Min Price',
      fill: false,
      borderColor: '#42A5F5',
      yAxisID: 'y',
      tension: 0,
      data: dataArray
    }]
  };

  return <Chart type="line" data={multiAxisData} options={basicOptions} />

}
// Add default product.pricelog to empty array
export default PriceChart