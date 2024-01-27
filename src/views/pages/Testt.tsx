/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

const styleDiv: any = {
  margin: "1%",
};

const style: any = {
  width: 200,
  height: 150,
  border: "1px dotted #888",
};

export const Basic = () => {
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const [uploading, setUploading] = useState(false); // State untuk status pengunggahan
  const [uploadLocation, setUploadLocation] = useState(""); // State untuk lokasi tujuan pengunggahan

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div>
        <img
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  const handleUpload = async () => {
    try {
      // Set status pengunggahan menjadi true
      setUploading(true);

      // Lakukan pengunggahan ke lokasi tujuan (ganti dengan lokasi yang sesuai)
      // Misalnya, Anda bisa menggunakan Firebase Storage atau server sendiri
      const response = await fetch("http://localhost/upload", {
        method: "POST",
        body: files[0], // Menggunakan file pertama sebagai contoh, sesuaikan sesuai kebutuhan
      });

      // Setelah pengunggahan selesai, atur status pengunggahan menjadi false
      setUploading(false);

      // Handle respon dari server jika diperlukan
      console.log("Upload successful:", response);
    } catch (error) {
      console.error("Error uploading file:", error);
      // Atur status pengunggahan menjadi false jika terjadi kesalahan
      setUploading(false);
    }
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container" style={{ marginTop: "200px" }}>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>{thumbs}</aside>
      {/* Tambahkan tombol submit */}
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Submit"}
      </button>
    </section>
  );
};
