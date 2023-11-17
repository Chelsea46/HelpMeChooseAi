import axios from "axios";

/**
 * Boilerplate file for getting and processing a product feed.
 *
 * Desired product structure:
 * {
 *  "id": number,
 *  "name": string,
 *  "description": string,
 *  "price": string or a number - up to you,
 *  "link": string,
 *  "tags": string[]
 * }
 */
interface StoreProduct {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  vendor: string;
  product_type: string;
  tags: string[];
  variants: string[];
  images: string[];
  options: string[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  link: string;
  tags: string[];
}

const storeDomain: string = "https://earos.com";
const productsEndpoint: string = "/products.json";

const formatProducts = (products: StoreProduct[]): Product[] => {
  // Access the variants array for each product
  return products.map((product) => {
    const price = product.variants.map((v: any) => {
      return v.price;
    });

    const link = `${storeDomain}/products/${product.handle}`;

    const cleanText = product.body_html.replace(/<\/?[^>]+(>|$)/g, "");

    return {
      id: product.id,
      price: price.toString(),
      name: product.title,
      tags: product.tags,
      link: link,
      description: cleanText,
    };
  });
};

const getProducts = async () => {
  // Logic for getting the products here.
  try {
    const response = await axios.get(`${storeDomain}${productsEndpoint}`);

    const storeProducts = response.data.products as StoreProduct[];
    console.log(storeProducts);

    const finalResult = formatProducts(storeProducts);
    console.log("finalResult:");
    console.log(finalResult);
  } catch (error) {
    console.error(error);
  }
};

// Invoke your logic here.
getProducts();