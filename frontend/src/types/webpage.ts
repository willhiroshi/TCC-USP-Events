export enum Source {
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram'
}

export interface Webpage {
  link: string;
  source: Source;
}
