'use client'
import Swal from 'sweetalert2'
type ConfirmDialogType = {
  title?: string
  text?: string
  icon?: 'warning' | 'error' | 'success' | 'info' | 'question'
  confirmCallback?: () => void // 확인
  cancelCallback?: () => void // 취소
}
export default function useConfirmDialog() {
  return ({
    text,
    title,
    icon,
    confirmCallback,
    cancelCallback,
  }: ConfirmDialogType) => {
    title = title ?? '알림'
    icon = icon ?? 'warning'
    Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      reverseButtons: true,
    }).then((result) => {
      //후속처리
      if (result.isConfirmed && typeof confirmCallback === 'function')
        confirmCallback()
      if (!result.isConfirmed && typeof cancelCallback === 'function')
        cancelCallback()
    })
  }
}
