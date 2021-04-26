import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Country from "./components/Country";
import { CountryType } from "./types";
import Loading from "./components/Loading";

function App() {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getCountries = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<CountryType[]>(
        "https://restcountries.eu/rest/v2/all"
      );
      setCountries(data);
    } catch {
      console.log("Ulkeleri alirken hata olustu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div>
      <Loading loading={loading}>
        {countries.map((country) => {
          return <Country key={country.name} country={country} />;
        })}
      </Loading>
    </div>
  );
}

export default App;
