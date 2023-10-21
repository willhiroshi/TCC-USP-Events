import { Source } from '../../types/webpage';

export interface WebpageRequest {
  id?: string;
  link: string;
  source: Source;
}
