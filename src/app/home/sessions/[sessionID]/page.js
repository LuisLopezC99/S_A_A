import Table from "@/app/components/body/Table";

const SessionPage = ({ params }) => {
  return (
    <div className="App">
      <Table
        columns={[
          "Oficio",
          "Tema",
          "Asignado",
          "Fecha de creación",
          "Fecha de vencimiento",
          "Estado",
          "Acuerdo",
        ]}
        url={`session/${params.sessionID}`}
        title={`Session ${params.sessionID}`}
        isFilter={true}
        idsession={params.sessionID}
      />
    </div>
  );
};

export default SessionPage;
