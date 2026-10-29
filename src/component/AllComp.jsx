import CarouselComp from "./CarouselComp";

import SecondSec from "./SecondSec";
import "../styles/all.css";

function AllComp() {
  return (
    <>
      <div style={{ marginTop: "90px" }} className="allC">
        <CarouselComp />
        <SecondSec />
      </div>
    </>
  );
}

export default AllComp;
