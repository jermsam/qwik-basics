import {component$, PropFunction, Slot,  useStylesScoped$} from '@builder.io/qwik';
import ModalStyle from './modal.css?inline'

interface ModalProps {
  open: boolean
  close$: PropFunction<any>
}

export default component$((props:ModalProps) => {
  useStylesScoped$(ModalStyle)
  
  return (
   <>
     {
       props.open && (
         <div class='modal'>
           <div class={'modal-content'}>
             <div style={'display: flex; justify-content: flex-end;'}>
                 <button onClick$={props.close$}>X</button>
             </div>
               <div class={'main'}>
                 <Slot name={'main'}/>
               </div>
               <div class={'footer'}>
                 <Slot name={'footer'}/>
               </div>
          
           </div>
         </div>
       )
     }</>
  );
});



