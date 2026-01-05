export interface uploadResult {
  success : boolean;
  url : string;
};

export interface IStorageProvider {
  /*
    ファイルをアップロードして公開URLを返す
    @param buffer      ファイルの生データ
    @param key         保存パス/ファイル名 (例: "tracks/audio-1.mp3")
    @param contentType MIMEタイプ (例: "audio/mpeg")
  */
  upload(buffer: Buffer, key: string, contentType: string): Promise<uploadResult>;

  // ファイルを削除する
  delete(key: string): Promise<void>;
}