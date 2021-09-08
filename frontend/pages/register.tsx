import ImputComponet from "../components/ImputComponet";

function register({ data }) {
  return (
    <>
      {data.map((item: any) => {
        return (
          <ImputComponet
            input="login"
            key={item._id}
            {...item}
            register={true}
          />
        );
      })}
    </>
  );
}
export const getServerSideProps: any = async () => {
  const res = await fetch("http://localhost:4001/users");
  const data = await res.json();

  return {
    props: {
      data: data,
    },
  };
};
export default register;
