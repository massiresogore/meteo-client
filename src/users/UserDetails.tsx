import { useLocation, useParams, useSearchParams } from "react-router-dom";

const UserDetails = () => {
  const location = useLocation();
  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);
  

  console.log(location);
  
  
  return (
    <div>User {params.id}</div>
  )
}

export default UserDetails