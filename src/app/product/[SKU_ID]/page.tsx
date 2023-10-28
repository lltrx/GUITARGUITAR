import ProductRadioGroup from "@/components/radio-group";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import Image from "next/image";
import TailwindRadio from "./tw-radio";
import NavBar from "@/app/components/navBar";
import GuitarTabs from "./tabs";

const placeholderImg =
  "https://images.guitarguitar.co.uk/cdn/large/170/170809313186008f.jpg";

const Badge = ({ text }: { text: string }) => (
  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-orange-600 shadow shadow-white">
    {text}
  </div>
);

const Spacer = ({ variant }: { variant?: "sm" | "md" }) => (
  <div className={variant ? (variant === "md" ? "m-10" : "m-5") : "m-10"} />
);

const Button = ({ className, text }: { className?: string; text?: string }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background bg-blue-500 text-white hover:bg-blue-500/90 h-12 px-4 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-95 transition-all text-lg ${className}`}
  >
    {text ?? "Button"}
  </button>
);

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};

export default async function Orders() {
  const response = (await await fetch("http://localhost:3000/api/products", {
    method: "GET",
  }).then((res) => res.json())) as Product[];

  const {
    ItemName,
    BrandName,
    ProductDetail,
    SalesPrice,
    PictureMain,
    QtyInStock,
    QtyOnOrder,
    Description,
  } = response[0];

  return (
    <>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24 max-w-screen-xl mx-auto">
        <div className="flex bg-white flex-col lg:flex-row gap-5 p-5 ring-2 ring-slate-500 rounded-md shadow-lg shadow-white">
          {/* Smol Images */}
          {/* <div className="hidden lg:flex flex-row lg:flex-col gap-4 overflow-auto max-h-[720px] w-28">
          <Image
            src={PictureMain ?? placeholderImg}
            width={75}
            height={50}
            alt={Description}
          />
          <Image
            src={PictureMain ?? placeholderImg}
            width={75}
            height={50}
            alt={Description}
          />
          <Image
            src={PictureMain ?? placeholderImg}
            width={75}
            height={50}
            alt={Description}
          />
          <Image
            src={PictureMain ?? placeholderImg}
            width={75}
            height={50}
            alt={Description}
          />
          <Image
            src={PictureMain ?? placeholderImg}
            width={75}
            height={50}
            alt={Description}
          />
        </div> */}

          {/* Main Image */}
          <div className="lg:w-[300px] lg:h-[300px] shadow">
            <Image
              src={PictureMain ?? placeholderImg}
              width={700}
              height={700}
              alt={Description}
            />
          </div>

          {/* Texts and Buttons */}
          <div className="w-full lg:w-2/3 ">
            <div className="flex flex-row justify-center lg:justify-start">
              <Badge text={"New!"} />
            </div>
            <Spacer variant="sm" />
            <div className="flex flex-col gap-2 lg:text-left text-center">
              <h1 className="text-3xl font-bold">{ItemName}</h1>
              <h1 className="text-3xl font-bold">Brand: {BrandName}</h1>
              <p>£{SalesPrice}</p>
              <p className="text-red-500">In Stock: {QtyInStock}</p>
              <p className="text-emerald-500">In Order: {QtyOnOrder}</p>
              <p className="prose-xl max-h-[250px] overflow-auto my-3 text-base">
                {ProductDetail}
              </p>
            </div>

            {/* Radios */}
            <div>
              <p className="text-lg">Colour</p>
              <ProductRadioGroup
                content={[
                  "Red",
                  "Orange",
                  "Yellow",
                  "Green",
                  "Blue",
                  "Purple",
                  "Pink",
                  "Brown",
                  "Gold",
                  "Silver",
                  "Grey",
                  "Black",
                  "White",
                  "Natural",
                  "Multicolour",
                ]}
              />
              <Spacer />
              <p className="text-lg">Body Shape</p>
              <ProductRadioGroup
                content={[
                  "SStyle",
                  "TStyle",
                  "DoubleCut",
                  "Offest",
                  "HollowBody",
                  "VStyle",
                  "SmallBody",
                  "Orchestral",
                  "GrandAuditorium",
                  "Dreadnought",
                  "Jumbo",
                  "Explorer",
                  "SingleCut",
                  "Combo",
                  "Head",
                  "Cabinet",
                ]}
              />
            </div>
            
            <Spacer />
            <div className="space-y-5">
              <Button
                className="w-full bg-sky-400 hover:bg-sky-400"
                text="Add to Wishlist 💖"
              />
              <Button className="w-full" text="Order" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
