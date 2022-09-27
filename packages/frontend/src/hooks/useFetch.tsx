import React from 'react';
import { useDispatch } from 'react-redux';

const useFetch = (apiHelper: any) => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      dispatch({
        type: 'SET_IS_LOADING',
        payload: false,
      });
      const res = await apiHelper();
      setData(res);
      return res;
    } catch (error: any) {
      dispatch({
        type: 'SET_IS_LOADING',
        payload: false,
      });
      setError(error);
      return error;
    }
  };

  React.useEffect(() => {
    fetchData();
  }, [apiHelper]);

  return { data, error };
};

export default useFetch;
