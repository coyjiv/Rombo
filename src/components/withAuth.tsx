import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { getSession } from "next-auth/react";
import type { Session } from "next-auth";
import { useRouter } from "next/router";
import { useEffect, ComponentType } from "react";

interface WithAuthProps {
  session: Session | null;
}

const withAuth = (Component: NextPage<any>): ComponentType<any> => {
  const WrappedComponent: NextPage<WithAuthProps> = ({ session, ...props }) => {
    const router = useRouter();

    useEffect(() => {
      if (!session) {
        router.push('/login');  // or wherever your login page is
      }
    }, [session, router]);

    return <Component {...props} />;
  };

  return WrappedComponent;
};

export const withAuthServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session }
  };
};

export default withAuth;
