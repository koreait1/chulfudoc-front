'use client'
import Swal from 'sweetalert2'

type APIAlertDialogType = {
  title?: string
  text?: string
  icon?: 'warning' | 'error' | 'success' | 'info' | 'question'
  mainCallback?: () => void
  reloadCallback?: () => void
  mainText?: string
  reloadText?: string
}

export default function useAPIAlertDialog() {
  return ({
    text,
    title,
    icon,
    mainCallback,
    reloadCallback,
    mainText = '메인페이지 이동',
    reloadText = '새로고침',
  }: APIAlertDialogType) => {
    Swal.fire({
      title,
      text,
      icon,
      showCancelButton: !!reloadCallback, // reloadCallback이 있으면 취소 버튼 표시
      confirmButtonText: mainCallback ? mainText : undefined, // mainCallback이 없으면 버튼 안 뜸
      cancelButtonText: reloadCallback ? reloadText : undefined,
    }).then((result) => {
      if (result.isConfirmed && typeof mainCallback === 'function') {
        mainCallback()
      } else if (result.isDismissed && typeof reloadCallback === 'function') {
        reloadCallback()
      }
    })
  }
}