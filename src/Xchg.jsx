import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Button,
  CssBaseline,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core';
import {
  Close,
} from '@material-ui/icons';

import { destroySession } from './actions';
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
  const destroy = () => props.destroySession(sessionId);
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
            Press &quot;End&quot; to terminate the session.
          </Typography>
          <form className={classes.form} onSubmit={(ev) => { ev.preventDefault(); }}>
            <Button
              variant="fab"
              color="secondary"
              onClick={destroy}
            >
              <Close />
            </Button>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
}

Xchg.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  destroySession: PropTypes.func.isRequired,
};

export default withStyles(styles)(connect(null, { destroySession })(Xchg));
