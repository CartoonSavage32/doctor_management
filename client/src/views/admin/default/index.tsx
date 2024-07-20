import React, { useEffect, useState } from "react";
import { fetchSubtitleData } from "services/Service";

import { IoDocuments, IoPeople } from "react-icons/io5";

import Widget from "components/widget/Widget";

const Dashboard = () => {
  const [subtitleData, setSubtitleData] = useState({
    totalPatients: 0,
    myPatients: 0,
    unassignedPatients: 0,
    myPDFs: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchSubtitleData();
      setSubtitleData(data);
    };

    fetchData();
  }, []);
  return (
    <div>
      {/* Card widget */}

      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-6">
        <Widget
          icon={<IoPeople className="h-7 w-7" />}
          title={"Total Patients"}
          subtitle={`${subtitleData.totalPatients}`}
        />
        <Widget
          icon={<IoPeople className="h-6 w-6" />}
          title={"My Patients"}
          subtitle={`${subtitleData.myPatients}`}
        />
        <Widget
          icon={<IoPeople className="h-7 w-7" />}
          title={"Unassigned Patients"}
          subtitle={`${subtitleData.unassignedPatients}`}
        />
        <Widget
          icon={<IoDocuments className="h-6 w-6" />}
          title={"My PDFs"}
          subtitle={`${subtitleData.myPDFs}`}
        />
      </div>
    </div>
  );
};

export default Dashboard;
