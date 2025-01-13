import { Outlet } from "react-router-dom"

const UserPage = () => {
  return (
    <>
     <div style={{display: 'flex', gap: '10px'}}>
     <div>User list column</div>
     <div><Outlet/></div>
     </div>
    </>
  )
}

export default UserPage