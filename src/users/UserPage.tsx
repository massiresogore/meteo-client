import { Link, Outlet } from "react-router-dom"
import "./user.css";
import { useUser } from "./userProvider";
const UserPage = () => {
  
  const {users, loading} = useUser();
  return (
    <>
     <div>User list column</div>
     <div  id='user-list'>
     <div className="app-container" >
      <h1>Liste des Utilisateurs</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <ul className="user-list">
          {users.member.length > 0 ?
          
          users.member.map(user => (
            <li key={user.id} className="user-item">
              {/* <span >{user.name}</span> */}
             <Link to={`/users/${user.id}`} className="user-name" > {user.email}</Link>
            </li>
          ))
          
          
          
          : <p>Aucun utilisateur trouvé</p>}
        </ul>
      )}
    </div>




     <div ><Outlet/></div>


     </div>
    </>
  )
}

export default UserPage