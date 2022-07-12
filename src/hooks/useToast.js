/*
  https://www.npmjs.com/package/react-toastify
*/
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure({theme :'colored'})
function useToast() {
    return toast;
}

export default useToast;