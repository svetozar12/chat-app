import React from "react";
import { useDispatch } from "react-redux";

const useFetch = (api_helper) => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      dispatch({
        type: "SET_IS_LOADING",
        payload: false,
      });
      const res = await api_helper();
      setData(res);
      return res;
    } catch (error) {
      dispatch({
        type: "SET_IS_LOADING",
        payload: false,
      });
      setError(error);
      return error;
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [api_helper]);

  return { data, error };
};

export default useFetch;
