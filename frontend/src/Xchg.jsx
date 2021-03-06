import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
  withStyles,
} from '@material-ui/core';
import {
  Close,
} from '@material-ui/icons';
import * as log from 'loglevel';

import { connectToSession, destroySession, xchg } from './actions';
import Qr from './Qr';

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 800,
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
  form: {
    marginTop: theme.spacing.unit,
  },
});

function Xchg(props) {
  const { classes, match } = props;
  const { sessionId } = match.params;
  const url = global.location.toString();
  const inputRef = React.createRef();
  const destroy = (ev) => {
    ev.preventDefault();
    props.destroySession(sessionId);
  };
  const submit = (ev) => {
    ev.preventDefault();
    const { value } = inputRef.current;
    props.xchg(sessionId, value);
    inputRef.current.value = '';
  };
  props.connectToSession(sessionId);
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="headline">
            Share URL or scan QR code to add clients to the session.
          </Typography>
          <Typography component="p">
            <a href={url}>
              <Qr value={url} />
            </a>
          </Typography>
          <Typography component="p">
            <a href={url}>
              {sessionId}
            </a>
          </Typography>
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant="headline">
            Press &quot;End&quot; to leave the session.
          </Typography>
          <form className={classes.form} onSubmit={destroy}>
            <Button variant="fab" color="secondary" >
              <Close />
            </Button>
          </form>
        </Paper>
        <Paper className={classes.paper}>
          <Grid container>
            <Grid item xs={12}>
              <form className={classes.form} onSubmit={submit}>
                <TextField
                  required
                  id="xchg-input"
                  name="xchg-input"
                  label="Input"
                  fullWidth
                  inputRef={inputRef}
                />
              </form>
            </Grid>
          </Grid>
        </Paper>
      </main>
    </React.Fragment>
  );
}

Xchg.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  connectToSession: PropTypes.func.isRequired,
  destroySession: PropTypes.func.isRequired,
  xchg: PropTypes.func.isRequired,
};

export default withStyles(styles)(connect(null, {
  connectToSession,
  destroySession,
  xchg,
})(Xchg));
