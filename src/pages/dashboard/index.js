import { useState } from 'react';
import Paginator from '@common/Paginator';
import endPoints from "@services/api";
import useFetch from "@hooks/useFetch";
import { Chart } from '@common/Chart';

const PRODUCT_LIMIT = 15;
// const PRODUCT_OFFSET = 15;

export default function Dashboard() {
  const [offsetProducts, setOffsetProducts] = useState(0);

  const products = useFetch(endPoints.products.getProducts(PRODUCT_LIMIT, offsetProducts), offsetProducts);
  const totalProducts = useFetch(endPoints.products.getProducts(0, 0)).length;

  const categoryNames = products?.map((product) => product.category);
  const categoryCount = categoryNames?.map((category) => category.name);

 const countOccurrences = (arr) => arr.reduce((prev, curr) => ((prev[curr] = ++prev[curr] || 1), prev), {});

  const data = {
    datasets: [
      {
        label: 'Categories',
        data: countOccurrences(categoryCount),
        borderWidth: 2,
        backgroundColor: ['#ffbb11', '#c0c0c0', '#50AF95', 'f3ba2f', '#2a71d0'],
      },
    ],
  };

  return (
    <>
    <Chart className='mb-8 mt-2' chartData={data} />
      {totalProducts > 0 && 
        <Paginator 
          totalItems={totalProducts} 
          itemsPerPage={PRODUCT_LIMIT}
          setOffset={setOffsetProducts} 
          neighbours={3}
        />
      }
    </>
  );
}