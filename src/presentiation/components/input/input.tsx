import React, {useContext} from 'react';
import Styles from './input-styles.scss'
import Context from '@/presentiation/contexts/form/form-context'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const {errorState} = useContext(Context)
  const error = errorState[props.name]
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }
  const getStatus = () => {
    return "🔴"
  }
  const getTitle = () => {
    return error
  }
  return (
    <div className={Styles.inputWrap}>
      <input {...props} readOnly onFocus={enableInput} />
      <span data-testid={`${props.name}-status`} title={error} className={Styles.status}>{getStatus()}</span>
    </div>
  )
}

export default Input
