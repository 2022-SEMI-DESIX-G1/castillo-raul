import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { cartReducer, productReducer } from "./Reducers";
import axios from "axios";
import { faker } from "@faker-js/faker";

const Cart = createContext();

const Context = ({ children }) => {
  const [products, setProducts] = useState([]);

  const productList = [...Array(10)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(1, 100),
    image: faker.image.food(640, 480, true),
    inStock: faker.random.numeric(),
    category: faker.commerce.department(),
  }));

  // console.log({ products });

  const [state, dispatch] = useReducer(cartReducer, {
    products: productList,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    searchQuery: "",
  });

  const config = {
    headers: { "Content-type": "application/json" },
  };

  useEffect(() => {
    axios.get("/api/products", config).then(({ data }) => {
      const products = data.map((item) => ({
        id: item._id,
        name: item.nombre,
        price: Number(item.precio.$numberDecimal),
        image: item.img,
        inStock: item.stock,
        category: item.departamento,
      }));
      console.log("inside useEffect");
      // setProducts({ products }); // update your state
      dispatch({ type: "SET_PRODUCTS", payload: products });
    });
  }, []);
  console.log(state);

  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};
