import React from 'react'

const JoinForm = ({ errors, action, pending }) => {
  return (
    <form action={action} autoComplete="off">
      <input type="text" name="email" />
      <input type="password" name="password" />
      <button type="submit" disabled={pending}>
        가입
      </button>
    </form>
  )
}

export default React.memo(JoinForm)
