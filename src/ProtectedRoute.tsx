import React from 'react'
import { connect } from 'react-redux'
import { Route, Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProtectedRouteBase = (props: any) => {
  const { component, session, ...routeProps } = props
  const Component = component
  const isAccessible = session && session.id

  return (
    <Route
      {...routeProps}
      render={(props: any) => {
        if (isAccessible) return <Component {...props} />
        return <Navigate to={{ pathname: '/signin' }} />
      }}
    />
  )
}

ProtectedRouteBase.propTypes = {
  path: PropTypes.string.isRequired,
  redirectPath: PropTypes.string,
  component: PropTypes.oneOfType([
    PropTypes.shape({ render: PropTypes.func.isRequired }),
    PropTypes.func
  ])
}

const mapStateToProps = (state: any) => {
  return {
    session: state.auth.session
  }
}

export const ProtectedRoute = connect(mapStateToProps)(ProtectedRouteBase)
