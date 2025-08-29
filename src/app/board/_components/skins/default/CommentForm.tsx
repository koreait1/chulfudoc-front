'use client'
import React from 'react'
import styled from 'styled-components'
import type { CommentType } from '@/app/board/_types/CommentType'
import { Input, Textarea } from '@/app/_global/components/Forms'
import color from '@/app/_global/styles/color'
import fontSize from '@/app/_global/styles/fontsize'

const StyledForm = styled.form``

const CommentForm = ({ board, form, onChange }: CommentType) => {
  return <StyledForm></StyledForm>
}

export default React.memo(CommentForm)
