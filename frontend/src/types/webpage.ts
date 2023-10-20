export enum Source {
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram'
}

export interface Webpage {
  id: string;
  link: string;
  source: Source;
}
