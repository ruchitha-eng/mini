declare module "youtube-transcript/dist/youtube-transcript.esm.js" {
  export class YoutubeTranscript {
    static fetchTranscript(
      videoId: string,
      config?: { lang?: string }
    ): Promise<Array<{ text: string; offset: number; duration: number }>>;
  }
  export function fetchTranscript(
    videoId: string,
    config?: { lang?: string }
  ): Promise<Array<{ text: string; offset: number; duration: number }>>;
}
