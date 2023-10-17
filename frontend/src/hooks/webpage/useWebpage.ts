import { useMutation } from '@tanstack/react-query';
import { getAPIBaseUrl } from '../../utils/utils';
import { Webpage, WebpageRequest } from './types';
import useWebpageRequester from './useWebpageRequester';

const useWebpage = () => {
  const webpageRequester = useWebpageRequester(getAPIBaseUrl());

  const saveWebpage = useMutation<Webpage, unknown, { webpageRequest: WebpageRequest }>({
    mutationFn: (request) =>
      webpageRequester.saveWebpage(request.webpageRequest.link, request.webpageRequest.source)
  });

  return {
    saveWebpage
  };
};

export default useWebpage;
