import "./App.css";
import { useEffect, useState } from "react";
import Table from "./components/Table";
export type Column = {
    job__: string;
    doc__: string;
    borough: string;
    house__: string;
    street_name: string;
    block: string;
    lot: string;
    bin__: string;
    job_type: string;
    job_status: string;
    job_status_descrp: string;
    latest_action_date: string;
    building_type: string;
    community___board: string;
    landmarked: string;
    adult_estab: string;
    pc_filed: string;
    other: string;
    other_description: string;
    applicant_s_first_name: string;
    applicant_s_last_name: string;
    applicant_professional_title: string;
    applicant_license__: string;
    professional_cert: string;
    pre__filing_date: string;
    paid: string;
    fully_paid: string;
    assigned: string;
    approved: string;
    fully_permitted: string;
    initial_cost: string;
    total_est__fee: string;
    fee_status: string;
    existing_zoning_sqft: string;
    proposed_zoning_sqft: string;
    enlargement_sq_footage: string;
    street_frontage: string;
    existingno_of_stories: string;
    proposed_no_of_stories: string;
    existing_height: string;
    proposed_height: string;
    proposed_dwelling_units: string;
    existing_occupancy: string;
    site_fill: string;
    zoning_dist1: string;
    owner_type: string;
    non_profit: string;
    owner_s_first_name: string;
    owner_s_last_name: string;
    owner_s_business_name: string;
    owner_sphone__: string;
    job_description: string;
    dobrundate: string;
    job_s1_no: string;
    total_construction_floor_area: string;
    withdrawal_flag: string;
    special_action_status: string;
    building_class: string;
    job_no_good_count: string;
    gis_latitude: string;
    gis_longitude: string;
    gis_council_district: string;
    gis_census_tract: string;
    gis_nta_name: string;
    gis_bin: string;
  }

type Data = {
  [key: string]: string | number;
};

type ApiResponse = {
  columns: Column[];
  data: Data[];
};

function App() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    fetch("https://data.cityofnewyork.us/resource/ic3t-wcy2.json")
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        setColumns(data.columns);
        setData(data.data);
      });
  }, []);
  return (
    <div className="App">
      <Table columns={columns}  data={data}/>
    </div>
  );
}

export default App;
