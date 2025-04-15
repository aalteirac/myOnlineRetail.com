import React from "react";
import Image from "next/image";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/outline";
import { useRouter } from 'next/router';
import clientPromise from "../../lib/mongodb";
import Link from "next/link";
import { ArrowNarrowRightIcon } from "@heroicons/react/outline";

export async function getServerSideProps(context) {
  const { id } = context.params;

  const client = await clientPromise;
  let isConnected;
  try {
    const client = await clientPromise
    isConnected = true;
    const db = client.db("store");
    const collection = db.collection("products");
    const product = await collection.findOne({id:id});
    return {
      props: { 
        isConnected,
        product: JSON.parse(JSON.stringify(product)),
      },
      
    }
  } catch(e) {
    console.log(e);
    isConnected = false;
  }
}

const ProductDetail = ({ product }) => {
  return (
    <div className="md:flex md:items-center">
      <div className="w-full h-screen relative">
        <Image
          src={product.image}
          alt={product.name}
          fill={true}
          objectFit="cover"
          className="rounded"
        />
      </div>
      <div className="w-full max-w-lg mx-auto mt-5 md:ml-8 md:mt-0 md:w-1/2">
        <h3 className="text-gray-700 uppercase text-lg">{product.name}</h3>
    
        <span className="text-gray-500 mt-3">${product.price}</span>
        <hr className="my-3" />
        <div className="mt-2">
          <label className="text-gray-700 text-sm" htmlFor="count">
            Count:
          </label>
          <div className="flex items-center mt-1">
            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
              <PlusCircleIcon className="w-5 h-5" />
            </button>
            <span className="text-gray-700 text-lg mx-2">1</span>
            <button className="text-gray-500 focus:outline-none focus:text-gray-600">
              <MinusCircleIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="flex items-center mt-6">
          <button className="px-8 py-2 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500">
            Add To Cart
          </button>
        </div>
        <Link href={`/`}>
            <button className="flex items-center mt-4 px-3 py-2 bg-green-600 text-white text-sm uppercase font-medium rounded hover:bg-green-500 focus:outline-none focus:bg-green-500">
              <span>Continue Shopping</span>
              <ArrowNarrowRightIcon className="w-5 h-5" />
            </button>
          </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
