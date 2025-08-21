import React from 'react'
import styled from 'styled-components'
import {
  MdOutlineRadioButtonChecked,
  MdOutlineRadioButtonUnchecked,
} from 'react-icons/md'
import MessageBox from '@/app/_global/components/MessageBox'
import { Input, Textarea, TableCols } from '@/app/_global/components/Forms'

const StyledForm = styled.form``

const BoardConfigForm = ({ form, errors, pending, action, onChange }) => {
  return (
    <StyledForm action={action} autoComplete="off">
      <TableCols thwidth={180}>
        <tbody>
          <tr>
            <th>게시판 아이디</th>
            <td>
              {form.mode === 'update' ? (
                <>
                  <input type="hidden" name="bid" value={form.bid} />
                  {form.bid}
                </>
              ) : (
                <Input
                  type="text"
                  name="bid"
                  value={form.bid}
                  onChange={onChange}
                />
              )}
              <MessageBox color="danger">{errors.bid}</MessageBox>
            </td>
          </tr>
        </tbody>
      </TableCols>
    </StyledForm>
  )
}

export default React.memo(BoardConfigForm)