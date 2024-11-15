import Footer from "./Footer";
import Header from "./Header";
import Proposal from "./Proposal";
const Layout = ({children}) => {
  return (
    <>
    <div className="flex flex-col h-screen">
      <Header />
      <Proposal/>
        <main className="grow p-5">
            {children}
        </main>
      <Footer />
    </div>
    </>
  )
}

export default Layout