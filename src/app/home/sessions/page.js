import Table from "../../components/body/Table";
export default function Home() {
  return (
    <div className="">
      <Table
        columns={[
          "Fecha De Sesion",
          "Tipo de sesión",
          "Link de Facebook",
          "Session",
        ]}
        title={`Sesiones`}
        url="session"
        isFilter={false}
      />
    </div>
  );
}
