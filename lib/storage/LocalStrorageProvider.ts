import { promises as fs } from "fs";
import path from "path";
import { IStorageProvider, uploadResult } from "./IStorageProvider";

export class LocalStorageProvider implements IStorageProvider {
  // 保存先
  private rootDir = path.join(process.cwd(), "public", "uploads");

  async upload(buffer : Buffer, key : string, contentType : string) : Promise<uploadResult> {
    const fullPath = path.join(this.rootDir, key);

    try {
      // 保存先のディレクトリが存在することを確認（なければ作成）
      await fs.mkdir(path.dirname(fullPath), { recursive: true });

      // 書き込み
      await fs.writeFile(fullPath, buffer);

      // Next.jsのpublicフォルダ経由のURLを返す
      return {
        success : true,
        url : `/uploads/${key}`,
      };
    }
    catch (error) {
      return {
        success : false,
        url : "",
      };
    }
  }

  async delete(key: string): Promise<void> {
    const fullPath = path.join(this.rootDir, key);
    await fs.unlink(fullPath).catch(() => {});
  }
}