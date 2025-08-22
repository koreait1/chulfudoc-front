'use client'
import Swal from 'sweetalert2'
type AlertDialogType = {
  title?: string
  text?: string
  icon?: 'warning' | 'error' | 'success' | 'info' | 'question'
  callback?: () => void
}
export default function useAlertDialog() {
  return ({ text, title, icon, callback }: AlertDialogType) => {
    Swal.fire({ title, text, icon, confirmButtonText: '확인' }).then(() => {
      //후속처리
      if (typeof callback === 'function') callback()
    })
  }
}
