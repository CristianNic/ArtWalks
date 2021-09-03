import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="nf">
      <div className="nf__container">
        <h1 className="nf__text">Sorry, no art here,</h1>
        <h1 className="nf__text">go back or proceed to</h1>
        <h1><Link className="nf__link" to="/login">Login</Link></h1>
      </div>
    </section>
  )
}

export default NotFound
