import SearchMapContainer from '../tmap/_containers/SearchMapContainer'
import SearchERInfoContainer from '../tmap/_containers/SearchInfoContainer'

export default function SearchERMapPage() {
  return (
    <>
      <h1>지도 검색</h1>
      <SearchMapContainer />
      <SearchERInfoContainer />
    </>
  )
}
