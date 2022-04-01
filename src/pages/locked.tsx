import { Box } from "@chakra-ui/react";
import {
  useStytchLazy,
  useStytchSession,
  useStytchUser,
  withStytchLazy,
} from "@stytch/stytch-react";
import { withIronSessionSsr } from "iron-session/next";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Locked: NextPage = () => {
  const client = useStytchLazy();
  const user = useStytchUser();
  const session = useStytchSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session);
    if (client) {
      if (!client.session.getSync()) {
        router.push("/");
      }
    }
  });

  if (user) {
    return <Box> user found</Box>;
  }
  return <Box>Found user:</Box>;
};
export default Locked;
