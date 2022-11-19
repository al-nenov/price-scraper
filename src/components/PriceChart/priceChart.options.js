const getLightTheme = () => {
  let basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: .6,
    plugins: {
      title: {
        display: true,
        text: 'Price Log',
        font: {
          size: 16
        }
      },
      legend: {
        labels: {
          color: '#495057'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      y: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      }
    }
  };

  let multiAxisOptions = {
    stacked: false,
    maintainAspectRatio: false,
    aspectRatio: 1,
    plugins: {
      legend: {
        labels: {
          color: '#495057'
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        ticks: {
          color: '#495057'
        },
        grid: {
          color: '#ebedef'
        }
      }
    }
  };

  return {
    basicOptions,
    multiAxisOptions
  }
}

export const { basicOptions, multiAxisOptions } = getLightTheme();