import { Box } from "@chakra-ui/react";
import {
  useStytchLazy,
  useStytchSession,
  useStytchUser,
} from "@stytch/stytch-react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { withProtectedPage } from "../hocs/withProtectedPage";

const Locked: NextPage<{ user: any }> = ({ user }) => {
  return <Box>Found user: {user.phone_numbers[0].phone_number}</Box>;
};

export default withProtectedPage(Locked);
