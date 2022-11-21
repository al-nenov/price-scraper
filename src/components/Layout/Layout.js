import MenuBar from "components/Menu/MenuBar";
import styles from './Layout.module.scss'

const Layout = ({children}) => (
  <>
    <MenuBar />
    <main className={styles.container}>{children}</main>
    {/* Footer */}
  </>
)

export default Layout
