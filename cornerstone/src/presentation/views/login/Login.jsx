import PropTypes from "prop-types";
import React, { useState } from "react";

import { Grid, TextField, Button, Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Alert from "@material-ui/lab/Alert";
import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { login } from "../../../adapters/services/authentication.service";
import { isAuthenticated } from "../../../adapters/localStorage/login.localStorage";

import useStyles from "./login.style";

const validationSchema = Yup.object({
  user: Yup.string("login:enter_username")
    .required("login:user_required")
    .min(2, "login:2 characters minimum"),
  password: Yup.string("login:missing_password")
    .required("login:password_required")
    .min(2, "login:characters_minimum"),
});

const LoginView = () => {
  const [hasError, setHasError] = useState(false);
  const [msgError, setMsgError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async ({ user, password }) => {
    try {
      await login({
        user,
        password,
      });
      navigate("/dashboard");
    } catch ({ message }) {
      setHasError(true);
      setMsgError(message.indexOf("404") !== -1 ? "network_error" : "login_error");
    }
  };
  const initialState = {
    user: "",
    password: "",
  };

  if (isAuthenticated()) {
    return navigate("/dashboard");
  }

  return (
    <Formik
      initialValues={initialState}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {(formikProps) => <LoginForm {...formikProps} hasError={hasError} msgError={msgError} />}
    </Formik>
  );
};

export const LoginForm = ({
  values,
  touched,
  errors,
  handleChange,
  handleBlur,
  handleSubmit,
  hasError,
  msgError,
}) => {
  const classes = useStyles();
  const { t } = useTranslation(["login", "common"]);

  return (
    <Grid container className={classes.root}>
      <Card className={classes.grid}>
        <form onSubmit={handleSubmit} autoComplete="off">
          <Typography variant="h5" color="textPrimary">
            {t("login:login")}
          </Typography>
          <TextField
            id="user"
            name="user"
            inputProps={{ "data-testid": "userTest" }}
            label={t("login:user")}
            variant="outlined"
            size="medium"
            margin="normal"
            value={values.user}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.user && touched.user && t(errors.user)}
            error={errors.user && touched.user}
            fullWidth
            data-testid="user"
          />
          <TextField
            id="password"
            name="password"
            inputProps={{ "data-testid": "passwordTest" }}
            label={t("login:password")}
            type="password"
            autoComplete="current-password"
            variant="outlined"
            size="medium"
            fullWidth
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            helperText={errors.password && touched.password && t(errors.password)}
            error={errors.password && touched.password}
            margin="normal"
            data-testid="password"
          />
          {hasError && (
            <Alert severity="error" size="medium" margin="normal">
              {t(`login:${msgError}`)}
            </Alert>
          )}
          <Button
            variant="outlined"
            color="secondary"
            size="medium"
            fullWidth
            className={classes.margin}
            type="submit"
            data-testid="btnLogin">
            {t("login:do_login")}
          </Button>
        </form>
      </Card>
    </Grid>
  );
};

LoginForm.defaultProps = {
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
};

LoginForm.propTypes = {
  errors: PropTypes.shape({
    password: PropTypes.any,
    user: PropTypes.any,
  }),
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  hasError: PropTypes.any,
  msgError: PropTypes.any,
  touched: PropTypes.shape({
    password: PropTypes.any,
    user: PropTypes.any,
  }),
  values: PropTypes.shape({
    password: PropTypes.any,
    user: PropTypes.any,
  }),
};

export default LoginView;
