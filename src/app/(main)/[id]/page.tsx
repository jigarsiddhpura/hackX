import { FC } from "react";

interface pageProps {
  params: {
    id: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  return <>page</>;
};

export default page;
