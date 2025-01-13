import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <>
       <p>Bienvenu dans météo de Reims</p>
       <Link to="/users">Liste des users</Link>

    </>
  )
}

export default HomePage