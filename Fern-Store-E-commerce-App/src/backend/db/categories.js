import { v4 as uuid } from "uuid";
import {
  LowMaintainanceCategory,
  IndoorCategory,
  AirPurifierCategory
} from "../../assets/index";


export const categories = [
  {
    _id: uuid(),
    categoryName: "Indoor",
    img: IndoorCategory,
    description:
      "literature in the form of prose, especially novels, that describes imaginary events and people",
  },
  {
    _id: uuid(),
    categoryName: "Air Purifier",
    img: AirPurifierCategory,
    description:
      "Non-fiction is writing that gives information or describes real events, rather than telling a story.",
  },
  {
    _id: uuid(),
    categoryName: "Low Maintenance",
    img: LowMaintainanceCategory,
    description:
      "Meant to cause discomfort and fear for both the character and readers, horror writers often make use of supernatural and paranormal elements in morbid stories that are sometimes a little too realistic.",
  },
];
