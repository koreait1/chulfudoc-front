import HosptialPopup from './_global/container/HospitalPopup'
import DetectContainer from './detect/_containers/DetectContainer'
import MainLinkContainer from './main/_container/MainLinkContainer'
import MainContainer from './main/_container/MainContainer'

export default function MainPage() {
  return (
    <>
      <MainContainer>
        <DetectContainer />
        <h1>테스트</h1>
      </MainContainer>
      <div className="main-bottom">
        <HosptialPopup />
        <MainLinkContainer />
      </div>
    </>
  )
}
