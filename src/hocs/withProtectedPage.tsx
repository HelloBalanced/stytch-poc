import { Box } from "@chakra-ui/react";
import { useStytchLazy } from "@stytch/stytch-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export function withProtectedPage<P>(WrappedComponent: React.ComponentType<P>) {
  const WithProtectedPage = ({ ...props }: P) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const stytch = useStytchLazy();
    const router = useRouter();

    useEffect(() => {
      if (stytch) {
        const userFromSession = stytch.user.getSync();

        if (!userFromSession) {
          router.push("/");
          return;
        }
        setUser(userFromSession);
        setLoading(false);
      }
    });

    if (loading) {
      return <Box>loading...</Box>;
    }

    return <WrappedComponent {...(props as P)} user={user} />;
  };

  WithProtectedPage.displayName = `withProtectedPage${WrappedComponent.displayName}`;

  return WithProtectedPage;
}
