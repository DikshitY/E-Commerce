import ReactDOM from 'react-dom';
import { useEffect } from 'react';

function Modal({ onClose, children }) {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return ReactDOM.createPortal(
    <div >
      <div onClick={onClose} className='fixed right-4 top-4 z-10 px-4 py-2 rounded-2xl shadow-xl bg-[#fd0000] text-white cursor-pointer max-sm:top-1 max-sm:right-1'>Close</div>
      <div className="fixed inset-0 bg-white flex justify-center items-center py-8">
        <div className="flex flex-col justify-between h-full w-3/4 max-sm:w-auto">
          {children}
        </div>
      </div>
    </div>,
    document.querySelector('.modal-container')
  );
}

export default Modal;
