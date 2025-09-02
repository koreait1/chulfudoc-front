import React, { useState } from 'react'
import styled from 'styled-components'
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md'
import { Input } from '@/app/_global/components/Forms'
import { SubmitButton } from '@/app/_global/components/Buttons'
import MessageBox from '@/app/_global/components/MessageBox'
import FileUpload from '@/app/_global/components/FileUpload'
import FileImages from '@/app/_global/components/FileImages'
import AuthNumButton from '@/app/_global/components/AuthNumButton'
import { ApiUrl } from '@/app/_global/constants/ApiUrl'
import AuthCount from '@/app/_global/components/AuthCount'
import useAlertDialog from '@/app/_global/hooks/useAlertDialog'
import color from '@/app/_global/styles/color'

const StyledForm = styled.form`
  .row {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin-top: 14px;
  }

  .field {
    flex: 1;
    min-width: 0;
  }

  .actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;
    min-width: 140px;
  }

  .msg {
    margin-top: 6px;
  }

  h3 {
    margin: 24px 0 10px;
    font-size: 16px;
    font-weight: 700;
  }

  /* 인증번호 행: 버튼 + 타이머 가로 정렬 */
  .row.code .actions {
    align-items: center;
  }

  .row.code .actions {
    flex-direction: row;
    align-items: flex-end;
    gap: 12px;
    min-width: auto;
  }

  .timer {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 12px;
    min-width: 60px;
    box-sizing: border-box;

    font-size: 1.5rem;
    line-height: 1;

    color: #ff9800;
    background: #fff3cd;
    border: 1px solid #ffeeba;
    border-radius: 6px;
  }
  .upload-button {
    position: relative;
    ul {
      position: absolute;
      width: 200px;
      height: 200px;
      left: 50%;
      transform: translate(-50%);
      img {
        width: 200px;
        height: 200px;
      }
      svg {
        position: absolute;
        top: 5px;
        right: 5px;
        color: ${color.danger};
      }
    }
    button {
      width: 200px;
      height: 200px;
      display: block;
      margin: 0 auto;
      border: 1px solid ${color.primary};
      background: #fff;
      color: #333;
      svg {
        color: #333;
      }
      &:hover {
        background: ${color.primary};
      }
    }
  }

  @media (max-width: 560px) {
    .row {
      flex-direction: column;
      align-items: stretch;
    }
    .actions {
      align-items: stretch;
      min-width: 0;
    }
    .actions > button {
      margin-left: 0;
      width: 100%;
    }
  }
`

const JoinForm = ({
  errors,
  action,
  pending,
  onChange,
  onToggle,
  form,
  fileUploadCallback,
  fileDeleteCallback,
}) => {
  const [email1, setEmail] = useState<string>('')
  const [emailVerified, setEmailVerified] = useState(false)
  const [verified, setverified] = useState(false)
  const [trigger, setTrigger] = useState(false)
  const [resend, setResend] = useState(false)
  const alertDialog = useAlertDialog()

  return (
    <StyledForm action={action} autoComplete="off">
      {/* hidden 값 */}
      <input type="hidden" name="gid" value={form.gid} />
      <input type="hidden" name="termsAgree" value={form.termsAgree} />
      {/* 소셜 회원가입 분기 */}
      {form.socialChannel && form.socialToken && (
        <>
          <input
            type="hidden"
            name="socialChannel"
            value={form.socialChannel}
          />
          <input type="hidden" name="socialToken" value={form.socialToken} />
          <div>{form.socialChannel} 연동 회원가입</div>
        </>
      )}
      {/* 일반 회원가입 입력 */}
      {(!form?.socialChannel || !form?.socialToken) && (
        <>
          <Input
            type="text"
            name="userId"
            placeholder="아이디를 입력하세요"
            value={form.userId}
            onChange={onChange}
          />
          <div className="msg">
            <MessageBox color="danger">{errors?.userId}</MessageBox>
          </div>

          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력하세요"
            value={form.password}
            onChange={onChange}
          />
          <div className="msg">
            <MessageBox color="danger">{errors?.password}</MessageBox>
          </div>

          <Input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호를 확인하세요"
            value={form.confirmPassword}
            onChange={onChange}
          />
          <div className="msg">
            <MessageBox color="danger">{errors?.confirmPassword}</MessageBox>
          </div>
        </>
      )}
      <Input
        type="text"
        name="name"
        placeholder="회원이름을 입력하세요"
        value={form.name}
        onChange={onChange}
      />
      <div className="msg">
        <MessageBox color="danger">{errors?.name}</MessageBox>
      </div>
      <Input
        type="text"
        name="mobile"
        placeholder="휴대전화번호를 입력하세요"
        value={form.mobile}
        onChange={onChange}
      />
      <div className="msg">
        <MessageBox color="danger">{errors?.mobile}</MessageBox>
      </div>
      {/* 이메일 + 발송 버튼 */}
      <div className="row">
        <div className="field">
          <Input
            type="text"
            name="email"
            placeholder="이메일을 입력하세요"
            value={form.email}
            onChange={onChange}
            readOnly={emailVerified}
          />
          <div className="msg">
            <MessageBox color="danger">{errors?.email}</MessageBox>
          </div>
        </div>
        <div className="actions">
          <AuthNumButton
            data={form.email}
            apiUrl={ApiUrl.SENDCODE}
            width={resend ? '140px' : ''}
            callback={(res) => {
              if (res.status >= 200 && res.status < 300) {
                setEmail(form.email)
                setResend(true)
                setTrigger((v) => !v)
                alertDialog({
                  title: '발송 완료',
                  text: '인증번호가 이메일로 발송되었습니다.',
                  icon: 'success',
                })
              } else {
                alertDialog({
                  title: '발송 실패',
                  text: '이메일 발송에 실패했습니다. 다시 시도해주세요.',
                  icon: 'error',
                })
              }
            }}
          >
            {resend ? '인증번호 재발송' : '인증번호 발송'}
          </AuthNumButton>
        </div>
      </div>
      {/* 인증번호 + 확인 버튼 + 타이머 */}
      <div className="row code">
        <div className="field">
          <Input
            type="text"
            name="authNum"
            placeholder="인증 번호를 입력하세요"
            value={form.authNum}
            onChange={onChange}
            readOnly={verified}
          />
          <div className="msg">
            <MessageBox color="danger">{errors?.authNum}</MessageBox>
          </div>
        </div>

        <div className="actions">
          {!verified && (
            <AuthNumButton
              data={Number(form.authNum)}
              apiUrl={ApiUrl.CHECKCODE}
              callback={(res) => {
                if (form.email !== email1 || email1 === '') {
                  setTrigger((v) => !v)
                  alertDialog({
                    title: '인증 실패',
                    text: '이메일이 변경되었습니다. 다시 발송 후 인증해주세요.',
                    icon: 'error',
                  })
                  return
                }
                if (res.status >= 200 && res.status < 300) {
                  setEmailVerified(true)
                  setverified(true)
                  alertDialog({
                    title: '인증 성공',
                    text: '이메일 인증이 완료되었습니다.',
                    icon: 'success',
                  })
                } else {
                  alertDialog({
                    title: '인증 실패',
                    text: '인증 번호가 올바르지 않습니다.',
                    icon: 'error',
                  })
                }
              }}
            >
              인증하기
            </AuthNumButton>
          )}

          {!verified && resend && (
            <div className="timer">
              <AuthCount startSignal={trigger} duration={180} />
            </div>
          )}
        </div>
      </div>
      <h3>프로필 이미지</h3>
      <div className="upload-button">
        <FileImages
          items={form.profileImage}
          callback={fileDeleteCallback}
          viewOrgImage={true}
        />
        <FileUpload
          gid={form.gid}
          imageOnly={true}
          single={true}
          callback={fileUploadCallback}
        />
      </div>
      <h3>약관동의</h3>
      <div>약관 동의 작성...</div>
      <div className="terms-agree" onClick={onToggle}>
        {form.termsAgree ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />} 회원가입
        약관에 동의합니다.
      </div>
      <div className="msg">
        <MessageBox color="danger">{errors?.termsAgree}</MessageBox>
      </div>
      {/* 가입 버튼 */}
      {!verified ? (
        <SubmitButton
          type="submit"
          disabled={pending}
          onClick={(e) => {
            e.preventDefault()
            alertDialog({
              title: '인증 실패',
              text: '필수 항목을 확인해주세요',
              icon: 'error',
            })
          }}
        >
          가입하기
        </SubmitButton>
      ) : (
        <SubmitButton type="submit" disabled={pending}>
          가입하기
        </SubmitButton>
      )}
      <div className="msg">
        <MessageBox color="danger">{errors?.global}</MessageBox>
      </div>
    </StyledForm>
  )
}

export default React.memo(JoinForm)
