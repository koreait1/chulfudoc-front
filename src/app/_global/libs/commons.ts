/**
 * FormData 형식의 데이터를 일반 자바스크립트 객체로 변환
 * @param formData
 */
export function toPlainObj(formData: FormData) {
  const params: any = {}

  // 필요한 필드와 값만 추출
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('$ACTION_')) continue
    let _value: string | boolean = value.toString()
    if (['true', 'false'].includes(_value)) {
      _value = _value === 'true'
    }

    params[key] = _value
  }

  return params
}
