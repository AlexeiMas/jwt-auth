import React from 'react';
import classes from "./styles.module.css";

const ContentForm = ({children}: React.PropsWithChildren) => {
  return (
    <div className={classes.contentForm}>
      {children}
    </div>
  );
};

export default ContentForm;