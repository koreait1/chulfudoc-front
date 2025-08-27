import SearchERMap from '../tmap/_components/SearchERMap'
import SearchERInfoContainer from '../tmap/_containers/SearchInfoContainer'

export default function SearchERMapPage() {
  return (
    <>
      <h1>지도 검색</h1>
      <SearchERMap />
      <h1>정보 검색</h1>
      <SearchERInfoContainer />
    </>
  )
}
