import '../globals.css'
import Contents from '../_global/wrappers/ContentContainer'
export default function MypageLayout({ children }) {
  return (
    <>
      <Contents>{children}</Contents>
    </>
  )
}
