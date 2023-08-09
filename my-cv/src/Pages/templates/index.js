import React, { useRef } from "react";
import DefaultLayout from "../../Components/DefaultLayout";
import Template1 from "./Template1";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Template2 from "./Template2";

import { useReactToPrint } from "react-to-print";
import { Button } from "antd";

function Templates() {
  const componentRef = useRef();
  const Navigate= useNavigate();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const { id } = useParams(); // Use destructuring to get the id parameter

  const getTemplate = () => {
    switch (
      id // Use id instead of router.id
    ) {
      case "1": {
        return <Template1 />;
      }
      case "2": {
        return <Template2 />;
      }
      default: {
        return null; // Return a default component or handle invalid id
      }
    }
  };

  return (
    <DefaultLayout>
      <div className="d-flex justify-content-end my-5">
        {" "}
        {/* Typo fix: justfy -> justify */}
        <Button onClick={handlePrint}>Print</Button>
        <Button onClick={()=>Navigate('/home')}>Back</Button>
      </div>
      <div ref={componentRef}>{getTemplate()}</div>{" "}
      {/* Function name typo fix: gettemplate -> getTemplate */}
    </DefaultLayout>
  );
}

export default Templates;
