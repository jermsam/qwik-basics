import {
  component$,
  useStylesScoped$,
  useResource$,
  Resource,
  $,
} from '@builder.io/qwik';
import {DocumentHead, useLocation, useNavigate} from '@builder.io/qwik-city';
import ProductCss from '../../product.css?inline';

//http://makeup-api.herokuapp.com/api/v1/products.json?brand=covergirl&product_type=lipstick
interface ProdData {
  id: number,
  img: string,
  title: string,
  description: string,
  price: string
}

export const getProduct = $(async (productId,params) =>{
  try {
    const res = await fetch(
      `http://makeup-api.herokuapp.com/api/v1/products.json?brand=${params.query.brand}&product_type=${params.query.type}`,
      {signal: params.signal}
    );
    const json= await res.json();
    const data = json.map(t => {
      const {id, image_link:img, name:title, description, price} = t;
      return {id,img,title,description,price};
    })
    const result = data.find(pr =>pr.id===parseInt(productId,10));
    return result;
  }catch (e) {
    console.log(e);
  }
})


export default component$(() => {
  useStylesScoped$(ProductCss);
  
  const loc = useLocation();
  
  const nav = useNavigate();
  
  
  
  const productData = useResource$<ProdData>(async ({track, cleanup}) => {
    // it will run first on mount (server), then re-run whenever prNumber changes (client)
    // this means this code will run on the server and the browser
    const id = track(() => loc.params.id);
    const brand = track(() => loc.url.searchParams.get('brand'));
    const type = track(() => loc.url.searchParams.get('type'));
    console.log(id);
    const abortController = new AbortController();
    cleanup(() => abortController.abort('cleanup'));
    return getProduct(id, {
      query: {brand, type},
      signal: abortController.signal,
    });
  });
  
  
  return (
    <div class="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
      <Resource
        value={productData}
        onResolved={(product) => (
          <>
            {
              product &&
              <section>
                <button onclick$={() => nav('/products')}>  Back</button>
                <div className="card" style={'display: flex'}>
                  <div className="img-box" style={'width: 100%;'}>
                    <img src={product?.img} style={'max-width: 600px;'} loading="lazy"/>
                  </div>
                  <div style="display: flex; flex-direction:column; align-content:center; justify-items:center">
                    <h1
                      className="mt-6 text-lg font-semibold text-white sm:text-slate-900 md:text-2xl dark:sm:text-white text-center">
                      {product?.title}
                    </h1>
                    <p
                      className="mt-4 text-sm leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 lg:col-span-1 dark:text-slate-400 truncate-overflow">
                      {product?.description}
                    </p>
                  </div>
  
                </div>
              </section>
            }
          </>
        )}
        onPending={() => <>loading...</>}
      />
    </div>
  );
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
