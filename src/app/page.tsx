import PageStyleContainer from './main/_container/PageStyleContainer'
import HosptialPopup from './_global/container/HospitalPopup'
import DetectContainer from './detect/_containers/DetectContainer'
import MainLinkContainer from './main/_container/MainLinkContainer'

export default function MainPage() {
  return (
    <>
      <PageStyleContainer />
      <DetectContainer />
      <div className="main-bottom">
        <HosptialPopup />
        <MainLinkContainer />
      </div>
    </>
  )
}
