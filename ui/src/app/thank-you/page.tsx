import { Typography } from "@mui/material";
import CheckDone from "./circle_tick_check_mark_paint_brush_stroke.jpg";
import Image from "next/image";
import style from "./page.module.css";

const ThankYou = () => {
  return (
    <div className={style.thanks}>
      <div>
        <Image src={CheckDone} alt="" width={100} height={100} />
      </div>
      <div>
        <Typography variant="h3" color="black">
          Thanks For Submitting!
        </Typography>
      </div>
    </div>
  );
};

export default ThankYou;
