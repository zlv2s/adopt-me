import React, { useState } from 'react'
import { Link } from '@reach/router'
import { css, keyframes } from '@emotion/core'
import colors from './colors'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`
const NavBar = () => {
  const [padding] = useState(15)
  return (
    <header
      css={css`
        background-color:${colors.transparent};
        padding:${padding}px;
    `}
    >
      <Link to="/">Adopt Me!</Link>
      <span
        css={css`
          font-size: 60px;
          display: inline-block;
          &:hover{
            animation: .7s ${spin} linear;
          }
        `}
        role="img"
        aria-label="logo">🐩</span>
    </header>
  )
}

export default NavBar