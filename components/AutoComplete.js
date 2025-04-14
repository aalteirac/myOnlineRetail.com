import React, { useState } from 'react';
import { useGlobal } from '../context/GlobalContext';
import { useRouter } from 'next/router';
import styles from './AutoComplete.module.css'


const Autocomplete = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const router = useRouter();
  const { filtered } = useGlobal();  

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    search();
    router.push(`/?search=${value}`)
  };

  const search = () => {
    if(filtered){
      const filteredResults = filtered.map((it) =>{
        return it.name
      });
      // setResults(filteredResults);
    }
    else{
      setResults([]);
    }
  };


  return (
    <div>
      <input
        className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-green-500 focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
     {results.length > 0 && (
      <ul className={styles.comp}>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    )}
    </div>
  );
};

export default Autocomplete;

// export async function getServerSideProps(context) {
//     const client = await clientPromise;
//     let isConnected;
//     try {
//       const client = await clientPromise
//       isConnected = true;
//       const db = client.db("store");
//       const collection = db.collection("products");
//       const products = await collection.find({}).toArray();
//       console.log("PPPP",products)
//       return {
//         props: { 
//           isConnected,
//           products: JSON.parse(JSON.stringify(products)),
//         //   products: [],
//         },
        
//       }
  
//     } catch(e) {
//       console.log(e);
//       isConnected = false;
//     }
// }