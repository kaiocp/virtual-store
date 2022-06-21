import { Link } from 'react-router-dom';
import styles from './ModalMenu.module.css'
export default function ModalMenu({children}) {
  return (
    <div>
      <div>
        {children}
      </div>
    </div>
  )
}