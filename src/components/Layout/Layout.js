import MenuBar from "components/Menu/MenuBar";

const Layout = ({children}) => (
  <>
    <MenuBar />
    <main>{children}</main>
    {/* Footer */}
  </>
)

export default Layout
