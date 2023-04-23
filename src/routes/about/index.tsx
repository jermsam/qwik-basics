import {component$, useStylesScoped$} from '@builder.io/qwik';
import {DocumentHead} from '@builder.io/qwik-city';
import AboutCss from './about.css?inline'
export default component$(() => {
      useStylesScoped$(AboutCss);
  
  return (
    <div class="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
      <h3>
        About Page
      </h3>
      <p>Learn about our platform</p>
    </div>
  );
})

export const head: DocumentHead = {
  title: 'About',
  meta: [
    {
      name: 'description',
      content: 'About our place',
    },
  ],
};
