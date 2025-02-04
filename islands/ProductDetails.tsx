import { formatCurrency } from "@/utils/data.ts";
import { Product } from "@/utils/types.ts";
import AddToCart from "@/islands/AddToCart.tsx";
import DownloadBtn from "@/islands/DownloadBtn.tsx";

export default function ProductDetails({ product }: { product: Product }) {
  let index = 0;

  function changeImage(delta: number) {
    if (!product.images) return;

    index += delta;
    if (index < 0) {
      index = product.images.length - 1;
    } else if (index >= product.images.length) {
      index = 0;
    }

    const newImage = product.images[index];
    const imageElement = document.querySelector(
      "#productImage",
    ) as HTMLImageElement;

    imageElement.src = newImage;
  }

  return (
    <div class="w-11/12 max-w-5xl mx-auto mt-8 lg:grid lg:grid-cols-2 lg:gap-x-16">
      {/* Product details */}
      <div>
        <div class="flex flex-col gap-4">
          <div class="w-full flex items-center justify-between gap-4">
            <hgroup>
              <h2 class="text-xl lg:!text-2xl font-semibold text-gray-800">
                {product.name}
              </h2>
              <h3 class="text-gray-500 text-base leading-tight">
                {product.slug}
              </h3>
            </hgroup>
            <div class="bg-[#E8E7E5] rounded-full px-6 py-2 text-lg text-gray-900 font-bold">
              {product.price_formatted}
            </div>
          </div>
          <p
            class={`mt-1.5 text-base text-gray-600`}
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      </div>

      {/* Product image */}
      <div
        class={`aspect-square relative w-full bg-white rounded-xl border-2 border-gray-200 mt-12 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-start`}
      >
        <div class="rounded-lg overflow-hidden h-full relative">
          {product.thumb_url && (
            <img
              id="productImage"
              src={product.thumb_url}
              alt={product.name}
              width="400"
              height="400"
              class="w-full h-full object-center object-contain"
            />
          )}
          {(product?.images?.length ?? 0) > 1 && (
            <div class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-between">
              <button
                class="w-16 opacity-50 hover:opacity-100 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline"
                type="button"
                onClick={() => {
                  changeImage(-1);
                }}
              >
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                    aria-hidden="true"
                    class="w-6 h-6 text-gray-800 dark:text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 19l-7-7 7-7"
                    >
                    </path>
                  </svg>
                  <span class="sr-only">Previous</span>
                </span>
              </button>
              <button
                class="w-16 opacity-50 hover:opacity-100 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline"
                type="button"
                onClick={() => {
                  changeImage(1);
                }}
              >
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                  <svg
                    aria-hidden="true"
                    class="w-6 h-6 text-gray-800 dark:text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    >
                    </path>
                  </svg>
                  <span class="sr-only">Next</span>
                </span>
              </button>
            </div>
          )}
        </div>
        <div class="lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
          <div class="mt-4 self-end">
            {/* <AddToCart {...product} /> */}
            <DownloadBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
