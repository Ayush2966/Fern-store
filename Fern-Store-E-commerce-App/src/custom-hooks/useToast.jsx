import {toast} from 'react-toastify';

const useToast = () => {
  const showToast = (toastMsg, toastTheme) => {
    const notify = () => {
      toast[toastTheme](toastMsg, {
        position: toast.POSITION.TOP_RIGHT,
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        newestOnTop:true,
        draggable: true,
        progress: undefined,
      })
    }
    notify();
  }
  return ({showToast});
}
export { useToast }