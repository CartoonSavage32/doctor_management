import React, { useState, useEffect } from "react";
import { MdModeEditOutline } from "react-icons/md";
import Card from "components/card";
import { getPDFs } from "services/PDFService";

const Pdfs = () => {
  const [pdfs, setPDFs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPDFs = async () => {
      try {
        const fetchedPDFs = await getPDFs();
        setPDFs(fetchedPDFs);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load PDFs");
        setIsLoading(false);
      }
    };

    fetchPDFs();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Card extra={"w-full p-4 h-full"}>
      <div className="mb-8 w-full">
        <h4 className="text-xl font-bold text-navy-700 dark:text-white">
          All PDFs
        </h4>
        <p className="mt-2 text-base text-gray-600">
          Here you can find more details about your PDFs.
        </p>
      </div>
      {pdfs.map((pdf, index) => (
        <div
          key={index}
          className="mt-3 flex w-full items-center justify-between rounded-2xl bg-white p-3 shadow-3xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none"
        >
          <div className="flex items-center">
            <div className="flex-1">
              <object
                data={pdf.url}
                type="application/pdf"
                width="100%"
                height="500px"
                style={{ border: "1px solid black" }}
              >
                <p>
                  It appears you don't have a PDF plugin for this browser. No
                  biggie... you can{" "}
                  <a href={pdf.url}>click here to download the PDF file.</a>
                </p>
              </object>
            </div>
            <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
              <MdModeEditOutline />
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
};

export default Pdfs;
