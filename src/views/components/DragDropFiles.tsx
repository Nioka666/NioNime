/* eslint-disable @typescript-eslint/no-explicit-any */
// DragDropFiles.tsx
import { FileUploader } from "react-drag-drop-files";

// const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

interface fileInterface {
  setFile: any;
}

export const DragDropFiles = ({ setFile }: fileInterface) => {
  const handleFileUpload = async (file: any) => {
    setFile(file);
  };

  return (
    <>
      <FileUploader
        handleChange={handleFileUpload}
        name="file"
        // types={fileTypes}
      />
    </>
  );
};
