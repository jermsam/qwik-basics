import {component$} from '@builder.io/qwik';
import {DocumentHead} from '@builder.io/qwik-city';
export default component$(() => {

  
  return (
    <div class="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
      <h3>
        Contact Us Page
      </h3>
      <p>Reach out</p>
    </div>
  );
})

export const head: DocumentHead = {
  title: 'Contact Us',
  meta: [
    {
      name: 'description',
      content: 'get in touch!',
    },
  ],
};
