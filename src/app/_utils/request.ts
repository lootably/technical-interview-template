import axios from 'axios';
import { headers } from 'next/headers';

// Types
import type { AxiosRequestConfig, AxiosResponse } from 'axios';

export default {
  request,
  getScope,
  serverSideRequest,
};

function request<ReturnType>(
  {
    config,
  }: {
    config: AxiosRequestConfig,
  },
): Promise<AxiosResponse<ReturnType>> {
  return axios.request<ReturnType>({
    ...config,
    url: `${getScope()}${config.url}`,
    withCredentials: true,
    data: {
      ...config.data,
    },
  });
}

async function serverSideRequest<ReturnType>(config: AxiosRequestConfig): Promise<AxiosResponse<ReturnType>> {
  const nextHeaders = await headers();

  const cookieHeader = nextHeaders.get('cookie');

  return axios.request<ReturnType>({
    ...config,
    withCredentials: true,
    url: `${getScope()}${config.url}`,
    data: {
      ...config.data,
    },
    timeout: 7_500,
    headers: {
      ...config.headers,
      cookie: cookieHeader || '',
    },
  });
}


function getScope() {
  switch(process.env.NEXT_PUBLIC_ENV) {
    case 'development': return 'http://localhost:3001';
  }
}