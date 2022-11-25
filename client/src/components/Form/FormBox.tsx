import React from 'react';
import classes from "./styles.module.css";

const FormBox = ({children}: React.PropsWithChildren) => {
  return (
    <form className={classes.formBox}>
      <span/>
      {children}
    </form>
  );
};

export default FormBox;