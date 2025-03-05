import { Upload } from "harpiats/upload";

export const upload = new Upload({
  fieldName: "file",
  // prefix: "",
  // fileName: Date.now().toString(),
  // path: "tmp",
  // options: {
  //   allowedExtensions: [".jpg"],
  //   allowedTypes: ["image/jpeg"],
  //   maxSize: 1024 * 1024 * 2,
  // },
});
