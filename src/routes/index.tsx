import {component$, useSignal, useStore, $} from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import {Link} from '@builder.io/qwik-city';
import Reviews from '~/components/reviews';
import Modal from '~/components/modal';

export default component$(() => {
  const open = useSignal(false);
  // const close = $(() => open.value = false);
  
  
  const reviews = useStore([
    {
      ratings: 5,
      description: 'Awesome at what they do',
      author: {
        name: 'Jack Roy',
      },
    },
    {
      ratings: 3,
      description: 'You want to try again',
      author: {
        name: 'James Rich',
      },
    },
  ]);
  return (
    <div class="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
      <h3>
        Home Page
      </h3>
      <p>Welcome home!</p>
      <div style={'display: flex; gap:10%;'}>
        <Link href={'/register'}>
          <button  class='btn btn--primary'>Join now!</button>
        </Link>
        <button onClick$={() => open.value = true} class='btn btn--secondary'>Learn more</button>
      </div>
      <Reviews reviews={reviews}/>
      <Modal open={open.value} close$={() => open.value = false}>
        <div q:slot={'main'}>
          <h3> Regain Access</h3>
          <div className="ipsum">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam at eos hic
            minima! Adipisci alias dolorem dolores minima minus nam, nesciunt nulla veritatis voluptatibus. Enim, quis,
            ullam? Exercitationem, obcaecati?
          </div>
        </div>
        <div q:slot={'footer'} open={open.value}>
          <Reviews reviews={reviews}/>
        </div>
      </Modal>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Home',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
  links: [
    {
      href: 'https://fonts.googleapis.com/icon?family=Material+Icons',
      rel: 'stylesheet',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Tangerine',
    },
  ],
};
