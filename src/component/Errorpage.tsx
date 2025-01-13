import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

const Errorpage = () => {
    const error = useRouteError();
  return (
    <>
    <h1>Error oups....</h1>

        {isRouteErrorResponse(error) ? 'Invalid page' : 'Page not found'}
    </>
  )
}

export default Errorpage