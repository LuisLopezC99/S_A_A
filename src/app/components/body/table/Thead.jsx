


const Thead = ({ columns }) => {
    return (
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-800 dark:text-gray-400 ">
        <tr>
          {columns.map((column, index) => (
            <th key={index} scope="col" className="px-6 py-3  text-center">
              {column}
            </th>
          ))}
        </tr>
      </thead>
    );
}

export default Thead;