import { type FC } from "react";

interface pageProps {
  params: {
    meetID: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  return <>page</>;
};

export default page;
