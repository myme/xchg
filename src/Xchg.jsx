import React from 'react';
import PropTypes from 'prop-types';
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
  form: {
    marginTop: theme.spacing.unit,
  },
});

function Xchg(props, context) {
  const { classes, match } = props;
  const { router } = context;
  const { uuid } = match.params;
  const url = global.location.toString();
  const onEnd = () => {
    router.history.push('/');
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant="headline">Press &quot;End&quot; to terminate the session.</Typography>
          <a href={url}>
            {uuid}
          </a>
          <hr />
          <a href={url}>
            <Qr value={url} />
          </a>
        </Paper>
        <Paper className={classes.paper}>
          <Typography variant="headline">Press &quot;End&quot; to terminate the session.</Typography>
          <form className={classes.form} onSubmit={(ev) => { ev.preventDefault(); }}>
            <Button
              variant="fab"
              color="secondary"
              onClick={onEnd}
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
};

Xchg.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Xchg);
