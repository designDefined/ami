import test from "./test.png";
import { StaticImageData } from "next/image";

export const imageSampleList = ["test"] as const;

const imageSample: {
  test: StaticImageData;
} = {
  test,
};

export default imageSample;
