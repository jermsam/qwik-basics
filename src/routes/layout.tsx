import { component$, Slot } from '@builder.io/qwik';
import Header from '~/components/header/header';
import {DocumentHead} from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div>
      <Header/>
      <Slot />
    </div>
  );
});

export const head: DocumentHead = {
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
