import Head from "next/head";
import clientPromise from "../lib/mongodb";
import Category from "../components/Category";
import Container from "../components/Container";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Pagination from "../components/Pagination";
import Products from "../components/Products";
import { GlobalProvider } from "../context/GlobalContext"; 
import { useGlobal } from '../context/GlobalContext';


import "tailwindcss/tailwind.css";
function json(el){
  return JSON.parse(JSON.stringify(el))

}
function AppContent({ Component, pageProps,isConnected, products,filtered,count}) {
  const { setProducts } = useGlobal();  
  const { setFiltered } = useGlobal();  
  const { setCount} = useGlobal();
  setCount(count)
  if(filtered.length>0){
    products=filtered;
  }
  setProducts(products);
  setFiltered(filtered);
  return (
    <>
      {isConnected && (
        <div>
          <Head>
          <title></title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="bg-white w-full min-h-screen">
          <Header />
          <Container>
            <Hero />
            <Category
              category="Tech Mood"
              categoryCount={`${products.length}/${count} Products`}
            />
            <Products products={products} />
            <Pagination />
          </Container>
          <Footer />
        </div>
        </div>
      )}
    </>
  );

}

export default function Home({Component, pageProps,isConnected,products,filtered,count }) {
  return (
    <>
      {isConnected && (
          <GlobalProvider>
          <AppContent Component={Component} pageProps={pageProps}  isConnected={isConnected} products={products} filtered={filtered} count={count} />
          </GlobalProvider>
      )}
    </>
  );
} 

export async function getServerSideProps(context) {
  let isConnected;
  const search = context.query.search || '';
  const page = context.query.page || 0;
  const client = await clientPromise
  isConnected = true;
  const db = client.db("store");
  const collection = db.collection("products");
  const count = await collection.countDocuments();
  if(search!='' && search.length>2){
    try {
      let results= await collection.aggregate(
        [
          {
            $search: {
              index: "searchIndex",
              autocomplete: {
                query: search,
                path: "name",
                
              }
            }
          }
        ]
      ).toArray();
      return {
        props: { 
          isConnected,
          products: [],
          filtered: json(results),
          count:json(results).length
        },
        
      }
    } catch (error) {
      
    }
  }
  else
    try {
      const products = await collection.find({}).limit(12).skip(page*12).toArray();
      return {
        props: { 
          isConnected,
          products: json(products),
          filtered: [],
          count:count
        },
        
      }

    } catch(e) {
      console.log(e);
      isConnected = false;
    }

  
}
