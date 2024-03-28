import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import TopNav from '@/components/TopNav'
import Navbar from '@/components/Navbar'
import Header from '@/components/Header'
import Catergory from './shop/[category]'
import Categories from '@/components/Categories/Categories'
import ProductsByCategory from '@/components/ProductsByCategory'
import Footer from '@/components/Footer'
import ImageSlider from '@/components/Utility/ImageSlider'
import BASE_URL from '@/config'
import axios from 'axios'

const inter = Inter({ subsets: ['latin'] })
const contents = [
  {
    image:
      'https://images.pexels.com/photos/581087/pexels-photo-581087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    image:
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    image:
      'https://images.pexels.com/photos/298863/pexels-photo-298863.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    image:
      'https://images.pexels.com/photos/46212/men-s-shirt-shirt-attire-clothing-46212.jpeg?auto=compress&cs=tinysrgb&w=600'
  }
]
export default function Home ({ products }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className={styles.wrapper}>
        {/* <TopNav /> */}
        <Categories />
        {/* <ImageSlider images={contents.map(item => item.image)} /> */}
        <Header />
        <ProductsByCategory category={'Featured Product'} products={products} />
        <ProductsByCategory
          category={'Gents'}
          products={products.slice(3, 7)}
        />
        <ProductsByCategory
          category={'Summer'}
          products={products.slice(4, 7)}
        />
      </div>
    </>
  )
}

export async function getServerSideProps (context) {
  try {
    const response = await axios.get(`${BASE_URL}/api/product`)
    const { products, totalPages, page: currentPage } = response.data
    return {
      props: {
        title: 'Product List',
        products,
        totalPages,
        currentPage
      }
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return {
      props: {
        title: 'Product List',
        products: []
      }
    }
  }
}
