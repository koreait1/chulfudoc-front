import '../globals.css'
import Header from '../_global/outlines/Header'
import Footer from '../_global/outlines/Footer'
import Contents from '../_global/wrappers/ContentContainer'
export default async function MypageLayout({children}) {
  return (
    <>
      <Header/>
      <Contents>{children}</Contents>
      <Footer/>
    </>
  )
}
