import { Typography } from "@mui/material";
import Href from "../../../components/Href";

const Container = (props) => {
  const cohort = props.data;

  return (
    <div className="w-full h-auto py-2">
      <div className="py-6 w-full float-left">
        <h3
          className="text-xl  md:pl-10 tracking-tight font-extrabold font-sans text-gray-900 sm:text-4xl md:text-3xl"
        >
          {/* <span className=" text-indigo-600 inline">
            <FlashOnIcon className="mx-2"></FlashOnIcon>
          </span> */}
          {/* {cohort.title} */}
          <Href href={cohort.href} text={cohort.title}/>
        </h3>
      </div>

      <div className="d-flex mb-5">
        <div>
          <p>{cohort.desc}</p>
        </div>
        <div className="w-full grid place-items-center md:w-auto ps-3">
          {
            cohort.src ? (<img style={{maxHeight:"150px", maxWidth:"150px"}} src={cohort.src} /> ) : ''
          }
        </div>
      </div>
    </div>
  );
};

export default Container;
