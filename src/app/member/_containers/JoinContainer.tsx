'use client'

import React, {useActionState} from 'react'
import { processJoin } from '../_services/actions'
import JoinForm from '../_components/JoinForm'

const JoinContainer = () => {
    const [errors, action, pending] = useActionState<any, any>(processJoin, {});
  return <JoinForm errors={errors} action={action} pending={pending} />
}

export default React.memo(JoinContainer)
