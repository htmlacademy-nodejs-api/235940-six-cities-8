export interface IFileWriter {
  write(row: string): Promise<void>;
}
