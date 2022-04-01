import type { NextPage } from "next";
import { Box, Button, Divider, Heading, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import {
  useStytchLazy,
  useStytchSession,
  useStytchUser,
} from "@stytch/stytch-react";
import { useRouter } from "next/router";
import { withSessionSsr } from "../libs/withSession";

const Home: NextPage = () => {
  const [loginType, setLoginType] = useState("phone");
  const [login, setLogin] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [methodId, setMethodId] = useState<string | null>(null);
  const stytch = useStytchLazy();
  const router = useRouter();
  return (
    <Box flexDir="column" alignItems="center" justifyContent="center">
      <Heading size="lg">Enter your phone number:</Heading>
      <Text>We will need to verify you to continue</Text>
      <Input
        type="number"
        value={login}
        onChange={(e) => {
          setLogin(e.target.value);
        }}
      />
      <Button
        bg="red.500"
        color="white"
        onClick={async () => {
          const { method_id } = await stytch.otps.sms.loginOrCreate(
            `+1${login}`,
            {
              expiration_minutes: 10,
            }
          );

          setMethodId(method_id);
        }}
      >
        continue
      </Button>

      <Divider />

      <Button bg="">Continue with email</Button>

      <Input
        type="number"
        value={verificationCode}
        placeholder="verification code"
        onChange={async (e) => {
          setVerificationCode(e.target.value);
        }}
      />

      <Button
        onClick={async () => {
          if (methodId) {
            const res = await stytch.otps.authenticate(
              verificationCode,
              methodId,
              {
                session_duration_minutes: 5,
              }
            );

            console.log("Success!", res);
            const session = await stytch.session.getSync();
            router.push("/locked");
          }
        }}
      >
        {" "}
        Login{" "}
      </Button>
    </Box>
  );
};

export default Home;
