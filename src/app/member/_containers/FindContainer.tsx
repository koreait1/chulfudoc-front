'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FindIdForm from '../_components/FindIdForm';
import FindPwForm from '../_components/FindPwForm';
import { ApiUrl } from '@/app/_global/constants/ApiUrl';
import useAlertDialog from '@/app/_global/hooks/useAlertDialog';
import styled from 'styled-components'

const StyledDiv = styled.div`
  margin: 40px auto 80px;
  padding: 50px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? 'http://localhost:4000/api/v1';
type Mode = 'id' | 'pw';

export default function FindContainer({ mode: modeProp }: { mode?: Mode }) {
  
  const router = useRouter();
  const sp = useSearchParams();
  const alert = useAlertDialog();

  const mode: Mode = (modeProp ?? (sp.get('mode') as Mode) ?? 'id');

  // 폼 마다 분리
  const [idForm, setIdForm] = useState({ name: '', email: '' });
  const [pwForm, setPwForm] = useState({ userId: '', email: '' });

  // 공통 상태
  const [errors, setErrors] = useState<Record<string, any>>({});
  const [pending, setPending] = useState(false);

  // onChange 모드별로
  const onChangeId = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setIdForm((s) => ({ ...s, [name]: value }));
  }, []);
  const onChangePw = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPwForm((s) => ({ ...s, [name]: value }));
  }, []);

  const { Form, form, onChange, onCallback } = useMemo(() => {
    if (mode === 'id') {
      // 아이디 찾기 콜백
      const onCallback = async ({ status, data }: { status: number; data?: any }) => {
        setPending(false);
        if (status < 200 || status >= 300) {
          setErrors({ global: '이름 또는 이메일을 확인하고 다시 시도해 주세요.' });
          return;
        }

        let userId: string | undefined = data?.userId;

        if (!userId) {
          const qs = new URLSearchParams({
            name: idForm.name.trim(),
            email: idForm.email.trim(),
          }).toString();

          const res = await fetch(`${API_BASE}${ApiUrl.FINDUSERID}${qs}`, {
            method: 'GET',
            headers: { Accept: 'application/json' },
          });
          if (!res.ok) {
            setErrors({ global: '아이디 정보를 찾을 수 없습니다.' });
            return;
          }
          const json = await res.json().catch(() => ({}));
          userId = json?.userId;
        }

        if (!userId) {
          setErrors({ global: '아이디 정보를 찾을 수 없습니다.' });
          return;
        }

        setErrors({});
        sessionStorage.setItem('find:id', userId);
        router.push('/member/findid/findidDone');
      };

      return {
        Form: FindIdForm,
        form: idForm,
        onChange: onChangeId,
        onCallback,
      };
    }

    // 비밀번호 찾기 콜백
    const onCallback = ({ status }: { status: number }) => {
      setPending(false);
      if (status >= 200 && status < 300) {
        setErrors({});
        alert({
          title: '메일 발송 완료',
          text: '입력하신 이메일로 임시 비밀번호를 보냈습니다.',
          icon: 'success',
        });
      } else {
        setErrors({ global: '아이디 또는 이메일을 확인하고 다시 시도해 주세요.' });
      }
    };

    return {
      Form: FindPwForm,
      form: pwForm,
      onChange: onChangePw,
      onCallback,
    };
  }, [mode, idForm, pwForm, onChangeId, onChangePw, alert, router]);

  return (
    <StyledDiv>
      <Form
        errors={errors}
        pending={pending}
        form={form as any}
        onChange={onChange}
        onCallback={onCallback}
        setPending={setPending}
      />
    </StyledDiv>
  )
}
