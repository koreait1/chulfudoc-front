'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { BoardConfigType, BoardDataType } from '../_types/BoardType'
import useAlertDialog from '@/app/_global/hooks/useAlertDialog'
import useUser from '@/app/_global/hooks/useUser'
import PasswordContainer from '../_containers/PasswordContainer'

const CommonContainer = ({
  children,
  board,
  data,
  mode,
}: {
  children: React.ReactNode
  board?: BoardConfigType
  data?: BoardDataType
  mode: string
}) => {
  const alertDialog = useAlertDialog()
  const router = useRouter()
  const [isError, setError] = useState<boolean>(false)
  const [isRequiredPassword, setRequiredPassword] = useState<boolean>(false) // 비회원 비밀번호 확인이 필요한가?

  const { isLogin, isAdmin } = useUser()

  useEffect(() => {
    // 게시글 수정, 보기일때 게시글이 있는지 체크
    if (data && ['update', 'view'].includes(mode) && !data.seq) {
      alertDialog({
        text: '게시글을 찾을 수 없습니다.',
        callback: () => {
          router.back()
        },
      })
      setError(true)
      return
    }

    if (!board || !board.bid) {
      alertDialog({
        text: '게시판을 찾을 수 없습니다.',
        callback: () => {
          router.back()
        },
      })
      setError(true)
    }

    if (isAdmin) {
      // 관리자는 권한 상관없이 게시글의 통제가 가능
      return
    }

    /**
     * 글목록, 글보기, 글작성 권한 체크
     *
     */
    if (['write', 'list', 'view'].includes(mode)) {
      const viewable = board?.viewable ?? false
      const listable = board?.listable ?? false
      const writable = board?.writable ?? false
      const result =
        board?.active &&
        ((viewable && mode === 'view') ||
          (listable && mode === 'list') ||
          (writable && mode === 'write'))
          
      if (!result) {
        alertDialog({
          text: '접근 권한이 없습니다.',
          callback: () => {
            router.back()
          },
        })

        setError(true)
        return
      }
    }

    /**
     * 글수정, 삭제
     * 회원 게시글인데, 미로그인 상태,
     *  - 로그인 페이지로 이동
     * 회원 게시글인데, 다른 회원으로 로그인 한 경우
     *  - 접근 권한이 없습니다. 알림을 보여주고 이전페이지로 이동
     * 비회원 게시글이고 인증이 안된 경우(mine - false)
     *  - 비회원 비밀번호 확인 화면으로 전환
     */
    if (data && ['update', 'delete'].includes(mode) && !data.mine) {
      if (data.guest) {
        // 비회원 게시글
        setRequiredPassword(true)
      } else {
        // 회원 게시글
        if (isLogin) {
          alertDialog({
            text: '접근 권한이 없습니다.',
            callback: () => {
              router.back()
            },
          })
        } else {
          const redirectUrl =
            mode === 'delete'
              ? `/board/delete/${data.seq}`
              : `/board/update/${data.seq}`

          router.replace(`/member/login?redirectUrl=${redirectUrl}`)
        }
      }

      setError(true)
    }
  }, [board, alertDialog, router, data, isLogin, isAdmin, mode])

  return isError ? (
    isRequiredPassword ? (
      <PasswordContainer mode={mode} seq={data?.seq} />
    ) : (
      <></>
    )
  ) : (
    children
  )
}

export default React.memo(CommonContainer)
