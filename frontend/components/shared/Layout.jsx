import Footer from "./Footer";
import Header from "./Header";
import Proposal from "./Proposal";
import Voting from "./Voting";

const Layout = ({children}) => {
  return (
    <>
    <div className="flex flex-col h-screen">
      <Header />
      <Voting/>
      <Footer />
    </div>
    </>
  )
}

export default Layout