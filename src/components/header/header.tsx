import {component$, useStylesScoped$} from '@builder.io/qwik';

import styles from './header.css?inline';
import {Link} from '@builder.io/qwik-city';


export default  component$(() =>{
  useStylesScoped$(styles)
  return(
    <nav>
    <div>
      <Link href="/">
       <button class={'btn'}>
         <img
           src='https://img.freepik.com/premium-vector/card-cosmetics-beauty-products-circle-frame_257845-712.jpg?w=2000'
           style='width: 60px; height: 60px; border-radius: 50%;'
         />
       </button>
      </Link>
    </div>
      <div>
        <Link href="/about">
          <span>About</span>
        </Link>
        <Link href="/contact">
          <span>Contact</span>
        </Link>
        <Link href="/products">
        <span>Products</span>
        </Link>
      </div>
    </nav>
  )
})
