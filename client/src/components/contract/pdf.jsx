import React from "react";

const ref = React.createRef();

const PDF = (props) => {
  return (
    <>
      <div className="add-contract" ref={ref}>
        <h1>{props.startDate}</h1>
        <h1>{props.endDate}</h1>
        <h1>{props.type}</h1>
        <h1>{props.user}</h1>
        <h1>{props.job}</h1>
      </div>
      <Pdf targetRef={ref} filename="contract.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
      </Pdf>
    </>
  );
};

export default PDF;
