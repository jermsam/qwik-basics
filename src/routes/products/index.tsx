import {
  component$,
  useStylesScoped$,
  useResource$,
  Resource,
  useStore,
  $,
} from '@builder.io/qwik';
import {DocumentHead, Link} from '@builder.io/qwik-city';
import ProductCss from './product.css?inline';

//http://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl&product_type=lipstick
interface ProdData {
  id: number,
  img: string,
  title: string,
  description: string,
  price: string,
  brand: string,
  type: string,
}

export const getProducts = $(async (params) =>{
  try {
    console.log('fetching ...');
    // covergirl
    const res = await fetch(
      `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${params.query.brand}&product_type=${params.query.type}`,
      {signal: params.signal}
    );
    const json= await res.json();
    return json.map(t => {
     const {id, image_link:img, name:title, description, price,brand,product_type:type} = t;
     return {id,img,title,description,price, brand,type};
    })
  }catch (e) {
    console.log(e);
  }
})


export default component$(() => {
  useStylesScoped$(ProductCss);
  
  const query = useStore({brand: 'covergirl', type: 'lipstick'});
  
  const productData = useResource$<ProdData[]>(async ({track, cleanup}) => {
    // it will run first on mount (server), then re-run whenever prNumber changes (client)
    // this means this code will run on the server and the browser
    const brand = track(() => query.brand);
    const type = track(() => query.type);
    const abortController = new AbortController();
    cleanup(() => abortController.abort('cleanup'));
    return getProducts({
      query: {brand, type},
      signal: abortController.signal,
    });
  });
  
  
  return (
    <div class="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
      <div style={'width: 100%; text-align:  center;'}>
        <h3>{query.brand}</h3>
      </div>
      
      <div style={'display: flex; gap: 10%; justify-content:center; max-width: 100%; flex-wrap: wrap; '}>
        <label class={'flex flex-row gap-x-2 items-center'}>
          <p>
          Brand:
          </p>
          <input
          class='text--field'
          bind:value={query.brand}
          onInput$={(ev: any) => (query.brand = ev.target.value)}
        />
        </label>
        <label class={'flex flex-row gap-x-2 items-center'}>
          <p>
          Type:
          </p>
          <input
          class='text--field'
          bind:value={query.type}
          onInput$={(ev: any) => (query.type = ev.target.value)}
        />
        </label>
      </div>
      
      <Resource
        value={productData}
        onPending={() => <>loading...</>}
        onResolved={(products) => (
          <div class={'list'}>
            {products && products.map((product, i) => (
              <Link key={product.id}  href={`product/${product.id}?brand=${product.brand}&&type=${product.type}`}>
                <div  class={'card'}>
                  <div class={'img-box'}>
                    <img src={product.img} loading="lazy"/>
                  </div>
                  <div style={'display: flex; flex-direction:column; align-content:center; justify-items:center'}>
                    <h2 class="group-hover:text-white font-semibold text-slate-900 text-center mt-6">{product.title}</h2>
                    <p
                      class="mt-4 text-center text-sm leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400 truncate-overflow"
                    >
                      {product.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        onRejected={(err)=>(<div>{err.message}</div>)}
      />
    </div>
  )
});

export const head: DocumentHead = {
  title: 'Product',
  meta: [
    {
      name: 'description',
      content: 'Makeup',
    },
  ],
};
