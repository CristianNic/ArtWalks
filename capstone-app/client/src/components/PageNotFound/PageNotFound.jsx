import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found__container">
        <h1>404</h1>
        <h1>This is not the page you are looking for,</h1>
        <h1>go back or proceed to:</h1>
        <h1><Link className="not-found__link" to="/login">Login</Link></h1>
      </div>
    </section>
  )
}

export default NotFound
