import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  CssBaseline,
  Paper,
  Typography,
  withStyles,
} from '@material-ui/core';
import {
  LockOutlined,
} from '@material-ui/icons';

import uuidv4 from 'uuid/v4';

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

function Landing(props, context) {
  const { classes } = props;
  const { router } = context;
  const onStart = () => {
    const uuid = uuidv4();
    const url = `/${uuid}`;
    router.history.push(url);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlined />
          </Avatar>
          <Typography variant="headline">Press &quot;Start&quot; to start a new session.</Typography>
          <form className={classes.form} onSubmit={(ev) => { ev.preventDefault(); }}>
            <Button
              type="submit"
              fullWidth
              variant="raised"
              color="primary"
              className={classes.submit}
              onClick={onStart}
            >
              Start
            </Button>
          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
};

Landing.contextTypes = {
  router: PropTypes.shape({
    history: PropTypes.object.isRequired,
  }).isRequired,
};

export default withStyles(styles)(Landing);
