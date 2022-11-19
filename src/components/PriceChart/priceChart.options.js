const getLightTheme = () => {
  let basicOptions = {
    maintainAspectRatio: false,
    aspectRatio: .6,
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
    aspectRatio: .6,
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
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        ticks: {
          color: '#495057'
        },
        grid: {
          drawOnChartArea: false,
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