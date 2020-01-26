import { useEffect, useState } from "react";

const GetDataHook = url => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState("");

  const makeRequest = async () => {
    const res = await fetch(url);
    const { results } = await res.json();
    setData(results);
    setLoading(false);
  };

  useEffect(() => {
    makeRequest();
  }, []);
  return { data, loading };
};

const GetQuestions = (
  amount = 10,
  category = 9,
  difficulty = "medium",
  type = "multiple"
) => {
  const { data, loading } = GetDataHook(
    `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`
  );

  return { data, loading };
};

export { GetDataHook, GetQuestions };
