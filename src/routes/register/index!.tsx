import {$, component$, useSignal, useStore} from '@builder.io/qwik';
import {Link} from '@builder.io/qwik-city';

export default component$(() => {
  const passwordFieldType = useSignal('password');
  const user = useStore({email:'', password:''})
  
 const togglePasswordTypeIndicator = $(function () {
    if (passwordFieldType.value === 'password') passwordFieldType.value = 'text';
    else passwordFieldType.value = 'password';
  })
  
  const send = $(function () {
   console.log('signing up: ',user);
   user.email='';
   user.password = '';
  })
  
  return (
    <div>
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
    <form preventDefault:submit onSubmit$={send} class="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
      <h3>
        Register
      </h3>
      <p>Email</p>
      <input
        class='text--field'
        type="text"
        aria-label="Email"
        placeholder="Email"
        name={'email'}
        type={'text'}
        value={user.email}
        onChange$={(event)=>user.email=event.target.value}
      />
      <p>Password</p>
      <div style={'display: flex;'}>
        <input
          class="text--field"
          aria-label="Password"
          placeholder="Password"
          name={'password'}
          type={passwordFieldType.value} value={user.password}
          onInput$={(event)=>user.password=event.target.value}
        />
        <button onclick$={togglePasswordTypeIndicator} class='btn btn--secondary' type={'button'}>
          {passwordFieldType.value === 'password'? (
              <span class="material-symbols-outlined">visibility</span>
            )
            : (
            <span class="material-symbols-outlined">visibility_off</span>
          )}
        </button>
      </div>
      <button type='submit' class='btn btn--primary'>
        Sign up
      </button>
      
    </form>
    </div>
  );
});
