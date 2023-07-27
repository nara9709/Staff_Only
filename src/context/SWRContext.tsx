'use client';

import { SWRConfig } from 'swr';

type Props = {
  children?: React.ReactNode;
};

export const SWRContext = ({ children }: Props) => {
  return (
    <SWRConfig
      value={{
        refreshInterval: 5000,
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
      {children}
    </SWRConfig>
  );
};
