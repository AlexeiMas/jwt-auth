import React from 'react';
import classes from './styles.module.css'

const ActionsForm = ({children}: React.PropsWithChildren) => {
  return (
    <div className={classes.actionsForm}>
      {children}
    </div>
  );
};

export default ActionsForm;