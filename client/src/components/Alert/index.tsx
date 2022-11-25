import React from 'react';
import classes from './styles.module.css'

export type TAlertProps = {
  onClose?: () => void
  onOk?: () => void
  message: string | JSX.Element
}

export default ({onClose, onOk, message}: TAlertProps) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.alert}>
        {onClose && <div className={classes.close} onClick={onClose}>✕</div>}
        <p className={onClose ? classes.error : ''}>{message}</p>
        {onOk && <div className={classes.ok} onClick={onOk}>Ok</div>}
      </div>
    </div>
  );
};