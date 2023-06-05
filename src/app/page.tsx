import Image from "next/image";
import { client } from "../../sanity/lib/client";

const getProducts = async () => {
  const response = await client.fetch(`*[_type=="product"]{
    id,
    title,
    description
  }`);
  return response;
};

interface IProduct {
  id: string;
  title: string;
  description: string;
}

export default async function Home() {
  const data: IProduct[] = await getProducts();
  return (
    <div>
      {data?.length > 0 ? (
        data.map((item, index) => {
          return <div key={index}>{item.title}</div>;
        })
      ) : (
        <div>No data to show</div>
      )}
    </div>
  );
}
