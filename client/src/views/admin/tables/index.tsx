import  { useEffect, useState } from 'react';
import { fetchManagementData } from 'services/Service';
import DevelopmentTable from './components/DevelopmentTable';
import ColumnsTable from './components/ColumnsTable';

const Tables = () => {
  const [myPatients, setMyPatients] = useState([]);
  const [unassignedPatients, setUnassignedPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchManagementData();
        setMyPatients(data.patients); 
        setUnassignedPatients(data.relations); 
      } catch (error) {
        console.error('Error fetching management data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className="mt-5 grid h-full grid-cols-1 gap-5 md:grid-cols-2">
        <DevelopmentTable tableData={myPatients} />
        <ColumnsTable tableData={unassignedPatients} />
      </div>
    </div>
  );
};

export default Tables;
