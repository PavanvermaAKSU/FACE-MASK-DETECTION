import {
  useEffect,
  useState
} from "react";

import api from "../services/api";
import HistoryTable from "../components/HistoryTable";

export default function History() {

  const [history, setHistory] =
    useState([]);

  useEffect(() => {

    fetchHistory();

  }, []);

  const fetchHistory =
    async () => {

      try {

        const res =
          await api.get(
            "/history"
          );

        setHistory(
          res.data.history
        );

      } catch (err) {

        console.log(err);

      }

    };

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Detection History
      </h1>

      <HistoryTable
        history={history}
      />

    </div>

  );
}