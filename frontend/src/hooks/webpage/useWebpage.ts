import { useQuery } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import { getAPIBaseUrl } from '../../utils/utils';
import { WebpageRequest } from './types';
import useWebpageRequester from './useWebpageRequester';
import { Webpage } from '../../types/webpage';

const useWebpage = () => {
  const WEBPAGE_QUERY_KEY = 'WEBPAGE';
  const webpageRequester = useWebpageRequester(getAPIBaseUrl());

  const getWebpages = () =>
    useQuery<Webpage[]>([WEBPAGE_QUERY_KEY], () => webpageRequester.getWebpages());

  const saveWebpage = useMutation<Webpage, unknown, { webpageRequest: WebpageRequest }>({
    mutationFn: (request) =>
      webpageRequester.saveWebpage(request.webpageRequest.link, request.webpageRequest.source)
  });

  return {
    getWebpages,
    saveWebpage
  };
};

export default useWebpage;
