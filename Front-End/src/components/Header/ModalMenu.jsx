import { Link } from 'react-router-dom';

export default function ModalMenu({children}) {
  return (
    <section className='modal'>
      <div>
        {children}
      </div>
    </section>
  )
}