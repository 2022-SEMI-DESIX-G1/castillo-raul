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
import Loading from "../components/Loading";

const Cart = createContext();

const getProducts = async () => {
  try {
    const config = {
      headers: { "Content-type": "application/json" },
    };
    const response = await axios({
      url: `/api/products`,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

const Context = ({ children }) => {
  // const [list, setList] = useState([]);
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const loadProducts = async () => {
  //     setLoading(true);
  //     const response = await getProducts();

  //     if (response.status === 200) {
  //       setList(response.data);
  //     }
  //     // console.log(response.data);
  //     // return response;
  //     setLoading(false);
  //   };

  //   loadProducts();
  // }, []);

  const products = [...Array(12)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(1, 50),
    image: faker.image.food(640, 480, true),
    inStock: faker.random.numeric(),
    category: faker.commerce.department(),
  }));

  // Casi completo Xd

  // const products = axios
  //   .get("/api/products", config)
  //   .then(({ data }) => {
  //     const list = data.map((item) => ({
  //       id: item._id,
  //       name: item.nombre,
  //       price: Number(item.precio.$numberDecimal),
  //       image: item.img,
  //       inStock: item.stock,
  //       category: item.departamento,
  //     }));
  //     return list;
  //   })
  //   .catch((error) => console.error(error));

  // console.log(list);

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    searchQuery: "",
  });

  // if (loading) {
  //   return <Loading />;
  // }

  // if (list.length > 0) {
  //   console.log(state);
  //   console.log(state);
  return (
    <Cart.Provider value={{ state, dispatch, productState, productDispatch }}>
      {children}
    </Cart.Provider>
  );
  // }
};

export default Context;

export const CartState = () => {
  return useContext(Cart);
};
