'use client'
import { createContext, useState } from 'react'
import { HelmetProvider, Helmet } from 'react-helmet-async'

type CommonContextType = {
  states: { mainTitle: string }
  actions: { setMainTitle: (title: string) => void }
}

const CommonContext = createContext<CommonContextType>({
  states: { mainTitle: '' },
  actions: { setMainTitle: (title: string) => {} },
})

const CommonProvider = ({ children }) => {
  const [mainTitle, setMainTitle] = useState('게시판')
  const value = {
    states: { mainTitle },
    actions: { setMainTitle },
  }
  return (
    <CommonContext.Provider value={value}>
      <HelmetProvider>
        <Helmet>
          <title>{mainTitle}</title>
        </Helmet>
        {children}
      </HelmetProvider>
    </CommonContext.Provider>
  )
}

const { Consumer: CommonConsumer } = CommonContext

export { CommonProvider, CommonConsumer }

export default CommonContext