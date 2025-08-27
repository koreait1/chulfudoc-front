// src/app/member/_components/FindForm.tsx
'use client'

import React from 'react'
import styled from 'styled-components'
import { Input } from '@/app/_global/components/Forms'
import MessageBox from '@/app/_global/components/MessageBox'
import AuthNumButton from '@/app/_global/components/AuthNumButton'
import { ApiUrl } from '@/app/_global/constants/ApiUrl'

const StyledForm = styled.form``

type FieldDef = {
  name: string
  placeholder: string
  type?: React.HTMLInputTypeAttribute
  autoComplete?: string
}

type Props = {
  errors: Record<string, any>
  form: Record<string, string>
  pending: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCallback: (payload: any) => void
  setPending: React.Dispatch<React.SetStateAction<boolean>>

  /** 모드별 설정 */
  fields: FieldDef[]
  apiUrl: ApiUrl
  submitText: string
}

const FindForm: React.FC<Props> = ({
  errors,
  form,
  onChange,
  onCallback,
  pending,
  setPending,
  fields,
  apiUrl,
  submitText,
}) => {
  // 사용 중인 필드만 직렬화
  const dataQS = new URLSearchParams(
    Object.fromEntries(
      fields.map((f) => [f.name, form[f.name] ?? '']),
    ) as Record<string, string>,
  ).toString()

  return (
    <StyledForm autoComplete="off">
      {fields.map((f) => (
        <div key={f.name}>
          <Input
            type={f.type ?? 'text'}
            name={f.name}
            placeholder={f.placeholder}
            autoComplete={f.autoComplete}
            value={form[f.name] ?? ''}
            onChange={onChange}
            disabled={pending}
          />
          <MessageBox color="danger">{errors?.[f.name]}</MessageBox>
        </div>
      ))}

      <AuthNumButton
        data={dataQS}
        apiUrl={apiUrl}
        callback={onCallback}
        onRequestStart={() => setPending(true)}
      >
        {submitText}
      </AuthNumButton>

      <MessageBox color="danger">{errors?.global}</MessageBox>
    </StyledForm>
  )
}

export default React.memo(FindForm)
