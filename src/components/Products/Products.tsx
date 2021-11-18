import React from "react";
import { useSelector } from "react-redux";
import { bankingSelector } from "../../store/bank";

const Products: React.FC<{}> = () => {
  const { loading, products } = useSelector(bankingSelector);

  console.log(products);

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl mb-10 text-left lg:max-w-2xl md:mb-12">
        <div>
          <p className="inline-block mb-4 text-xs font-semibold tracking-wider text-indigo-600 uppercase rounded-full">
            Recommended Products
          </p>
        </div>
        <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl">
          Products curated for you based on your portfolio
        </h2>
        <p className="text-base text-gray-700 md:text-lg">
          From your transaction history, we have the following loan products for
          you:
        </p>
        <div className="h-1 mt-5 ml-auto duration-300 origin-left transform bg-indigo-600 scale-x-30 group-hover:scale-x-100" />
      </div>
      <div className="grid gap-5 mb-8 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div>Loading...</div>
        ) : (
          products.map((product: any, index: number) => (
            <div
              key={index}
              className="p-5 duration-300 transform bg-white border rounded shadow-sm hover:-translate-y-2"
            >
              <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-indigo-50">
                <svg
                  className="w-10 h-10 text-indigo-400"
                  stroke="currentColor"
                  viewBox="0 0 52 52"
                >
                  <polygon
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                  />
                </svg>
              </div>
              <h6 className="mb-2 font-semibold leading-5">
                Interest Rate: {product.interestRate}%
              </h6>
              <p className="text-sm text-gray-900">
                Finance your loan for a period of <span className="font-black text-lg px-1 text-indigo-500">{product.period}</span> month
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
