import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../redux";

function testPage() {
  const dispatch = useDispatch();

  const { testDispatch, test1Dispatch } = bindActionCreators(
    actionCreators,
    dispatch,
  );

  const amount = useSelector((state: State) => state.testRedux);
  console.log(amount);

  return (
    <div>
      <h1>{amount}</h1>
      <button onClick={() => testDispatch(1000)}>Deposit</button>
      <button onClick={() => test1Dispatch(500)}>Withdraw</button>
    </div>
  );
}

export default testPage;
