import { MdFileUpload } from "react-icons/md";
import Card from "components/card";
import { uploadPDF } from "services/PDFService";

const Upload = () => {
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.log("No file selected.");
      return;
    }
    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    try {
      const response = await uploadPDF(file);
      console.log("Upload response:", response);
      alert("Upload successful");
      // Handle successful upload, e.g., show success message or update UI state
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
      // Handle upload failure, e.g., show error message
    }
  };
  return (
    <Card className="grid h-full w-full grid-cols-1 gap-3 rounded-[20px] bg-white bg-clip-border p-3 font-dm shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none 2xl:grid-cols-11">
      <div className="col-span-5 h-full w-full rounded-xl bg-lightPrimary dark:!bg-navy-700 2xl:col-span-6">
        <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-xl border-[2px] border-dashed border-gray-200 py-3 dark:!border-navy-700 lg:pb-0">
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <MdFileUpload className="text-[80px] text-brand-500 dark:text-white" />
          <h4 className="text-xl font-bold text-brand-500 dark:text-white">
            Upload Files
          </h4>
          <p className="mt-2 text-sm font-medium text-gray-600">
            PDFs files are allowed
          </p>
        </label>
      </div>

      <div className="col-span-5 flex h-full w-full flex-col justify-center overflow-hidden rounded-xl bg-white pb-4 pl-3 dark:!bg-navy-800">
        <h5 className="text-left text-xl font-bold leading-9 text-navy-700 dark:text-white">
          Upload Your PDFs
        </h5>
        <p className="leading-1 mt-2 text-base font-normal text-gray-600">
          You can Upload your PDF files here
        </p>
      </div>
    </Card>
  );
};

export default Upload;
