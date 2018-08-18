import React from 'react';
import PropTypes from 'prop-types';
import {
  CssBaseline,
  Paper,
  withStyles,
} from '@material-ui/core';

import Qr from './Qr';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

function Xchg(props) {
  const { classes, match } = props;
  const { uuid } = match.params;
  const url = global.location.toString();
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <a href={url}>
            {uuid}
          </a>
        </Paper>
        <Paper className={classes.paper}>
          <a href={url}>
            <Qr value={url} />
          </a>
        </Paper>
      </main>
    </React.Fragment>
  );
}

Xchg.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withStyles(styles)(Xchg);
