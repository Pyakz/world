import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { NextSeo } from 'next-seo';
const Map = dynamic(
  () => import('../components/Map'),
  { ssr: false }
)

const Home = ({volcanoes}) => {

  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    volcanoes ? setLoaded(true) :  setLoaded(false)
   
  },[])
  return (
   <section style={{ height: '100vh', width: '100%' }} >
      <NextSeo  title="World" />
     {loaded ?  <Map volcanoes={volcanoes} /> : <h1>Loading...</h1>}
    </section>
  )
}

export default Home

export async function getStaticProps(context) {
  const data = await fetch(`https://data.humdata.org/dataset/a60ac839-920d-435a-bf7d-25855602699d/resource/7234d067-2d74-449a-9c61-22ae6d98d928/download/volcano.json`)
  const volcanoes = await data.json()
  return { props: { volcanoes }}
}
