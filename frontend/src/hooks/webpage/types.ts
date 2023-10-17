export enum Source {
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram'
}

export interface Webpage {
  link: string;
  source: Source;
}

export interface WebpageRequest {
  link: string;
  source: Source;
}
