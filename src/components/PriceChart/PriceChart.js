import { Chart } from 'primereact/chart';
import { basicOptions, multiAxisOptions } from './priceChart.options'

const multiAxisData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
    label: 'Min Price',
    fill: false,
    borderColor: '#42A5F5',
    yAxisID: 'y',
    tension: 0,
    data: [65, 59, 81, 81, 81, 81, 10, 65, 59, 80, 81, 56, 55, 10, 65, 59, 80, 81, 56, 55, 10]
  }, {
    label: 'Max price',
    fill: false,
    borderColor: '#00bb7e',
    yAxisID: 'y1',
    tension: 0,
    data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90]
  }]
};

const PriceChart = ({ }) => {
  // const { basicOptions, multiAxisOptions } = 
  return <Chart type="line" data={multiAxisData} options={multiAxisOptions} />

}

export default PriceChart