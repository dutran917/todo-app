import React from 'react'
import { Redirect } from 'react-router-dom'
import { Route } from 'react-router-dom'

const ProtectedRoute = ({ isAuth, Component }) => {
    return (
        <Route path='/'>
            {isAuth ? <Component></Component> : <Redirect to='/login'></Redirect>}
        </Route>
    )
}

export default ProtectedRoute