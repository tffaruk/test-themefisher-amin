import { Button, Grid } from "@mui/material";
import LoginForm from "components/form/LoginForm";
import { getProviders, getSession, signIn } from "next-auth/react";
import React from "react";

const SignIn = ({ providers }) => {
  const authProviders = Object.values(providers);
  return <LoginForm signIn={signIn} authProviders={authProviders} />;
};

export default SignIn;
export async function getServerSideProps(context) {
  const { req } = context;

  const providers = await getProviders(context);
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: "/" },
    };
  }

  return {
    props: { providers },
  };
}
