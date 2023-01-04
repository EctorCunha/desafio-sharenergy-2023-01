import { Link } from 'react-router-dom'
import './backToHome.css'

export function BackToHome (){
  return(
   <div className="backToHome">
        <Link to="/"><span> ⇦ Página inicial</span></Link>
   </div>
  )};
