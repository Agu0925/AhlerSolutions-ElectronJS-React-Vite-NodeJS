import { useState, useEffect } from 'react'
import { Header, Footer, Main } from "./Components"
export const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  )
}