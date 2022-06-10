import flan from "../components/Images/Desserts/Flan.png";
import palomilla from "../components/Images/Entrees/Palomilla.png";
import empanada from "../components/Images/Appetizers/empenada.png";
import breadedCutlet from "../components/Images/Entrees/breaded chicken cutlet.png";

export const items = [
  { id: 1, category: "Dessert", name: "Flan", price: "3.99", src: flan },
  {
    id: 2,
    category: "Entree",
    name: "Breaded Chicken Cutlet",
    price: "10.99",
    src: breadedCutlet,
  },
  {
    id: 3,
    category: "Appetizer",
    name: "Empanada",
    price: "6.99",
    src: empanada,
  },
  {
    id: 4,
    category: "Entree",
    name: "palomilla",
    price: "12.99",
    src: palomilla,
  },
];

export const categories = [
  {
    id: 1,
    name: "Appetizer",
    urlParamName: "appetizer",
  },
  {
    id: 2,
    name: "Entree",
    urlParamName: "entree",
  },
  {
    id: 3,
    name: "Dessert",
    urlParamName: "dessert",
  },
  {
    id: 4,
    name: "Side",
    urlParamName: "side",
  },
  {
    id: 5,
    name: "Sandwich",
    urlParamName: "sandwiches",
  },
];
