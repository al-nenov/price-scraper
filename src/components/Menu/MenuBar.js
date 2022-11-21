import { Menubar } from 'primereact/menubar';
import { useRouter } from 'next/router';


const MenuBar = () => {
  const router = useRouter()
  const items = [
    {
      label: 'Products',
      command: () => router.push('/productlist')
    },
    {
      label: 'Vendors',
      command: () => router.push('/vendors')
    },
    {
      label: 'Test Page',
      command: () => router.push('/test')
    }
  ]
  return <Menubar model={items} />
}

export default MenuBar