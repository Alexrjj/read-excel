import "./App.css";
import * as XLSX from "xlsx";
import { useState } from "react";

function App() {
  const [Items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;
        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />

      <table className="table container">
        <thead>
          <tr>
            <th scope="col">Produto</th>
            <th scope="col">Valor</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Total</th>
            <th scope="col">Custo</th>
          </tr>
        </thead>
        <tbody>
          {Items.map((d, index) => (
            <tr key={index}>
              {console.log(d)}
              <th>{d.Produto}</th>
              <td>
                {d.Valor !== undefined
                  ? parseFloat(d.Valor).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : null}
              </td>
              <td>{d.Quantidade}</td>
              <td>
                {d.Total !== undefined
                  ? parseFloat(d.Total).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : null}
              </td>
              <td>
                {d.Custo !== undefined
                  ? parseFloat(d.Custo).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
