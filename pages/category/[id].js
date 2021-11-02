import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { useRouter } from "next/router";
import axios from 'axios'
import CategoryImageBanner from '../../components/CategoryImageBanner';
import ProductsGrid from '../../components/ProductsGrid';


const domain = process.env.NEXT_PUBLIC_API_DOMAIN_NAME;


const config = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const getStaticPaths = async () => {

  const res = await axios.get(domain +'store/categories/', config);
  const paths = await res.data.map((category) => ({
    params: { id: category.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };

};

export const getStaticProps = async (ctx) => {

  const category_id = ctx.params?.id;
    
  const response = await axios.get(domain + `store/categories/${category_id}/`, config);

  return {
    props: {
      category: response.data,
    },
  };
};


export default function CategoryDetailFunction({category}) {

  const router = useRouter();

  return (category == undefined)?<div></div>:(
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
          <CategoryImageBanner category_title={category.title} category_image={category.image}/>
          <ProductsGrid products={category.products}/>
      </main>
    </div>
  )
}