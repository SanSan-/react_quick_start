declare module 'file-saver' {
  const saveAs: (blob: Blob, fileName: string) => void;
  export default saveAs;
}
