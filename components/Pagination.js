import React from "react";
import { useRouter } from 'next/router';
import { useGlobal } from '../context/GlobalContext';

const Pagination = () => {
  const { count } = useGlobal();  
  const itemsPerPage = 12;
  const totalPages = Math.ceil(count / itemsPerPage);
  const router = useRouter();
  const currentPage = parseInt(router.query.page || 0);
  const goToPage = (page) => {
    router.push(`?page=${page}`);
  };

  return (
    <div className="flex justify-center">
      <div className="flex rounded-md mt-8">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 0}
          className={`py-2 px-4 leading-tight border border-gray-200 border-r-0 rounded-l ${
            currentPage === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-green-700 hover:bg-green-500 hover:text-white'
          }`}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index)}
            className={`py-2 px-4 leading-tight border border-gray-200 border-r-0 ${
              currentPage === index
                ? 'bg-green-500 text-white'
                : 'bg-white text-green-700 hover:bg-green-500 hover:text-white'
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          className={`py-2 px-4 leading-tight border border-gray-200 rounded-r ${
            currentPage >= totalPages - 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-green-700 hover:bg-green-500 hover:text-white'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
