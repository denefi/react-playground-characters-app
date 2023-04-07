import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import axios from "axios";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import CharacterDetails from "./components/Character-page";
import { BounceLoader } from "react-spinners";

function App() {
  const [count, setCount] = useState(0);
  const [characters, setCharacters] = useState(null);
  const baseURL = import.meta.env.VITE_API_URL;

  async function fetchData() {
    try {
      const dataFromDb = await axios.get(baseURL + "/characters");
      console.log(dataFromDb);
      setCharacters(dataFromDb.data);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const renderCharacterList = () => {
    return characters.slice(0, 50).map((character, index) => (
      <div
        className=" border-black border-2 mb-3 h-24 flex flex-col items-center justify-evenly "
        key={index}
      >
        <h2 className=" text-xl ">{character.name}</h2>
        {/* <button
          onClick={() => {
            setDeleteRequested(character.id);
            fetchData();
          }}
        >
          Delete
        </button> */}
        <Link
          className="m-1 py-1 px-3 border-2 rounded-md"
          to={`/characters/${character.id}`}
        >
          More Details
        </Link>
      </div>
    ));
  };
  return (
    <div className="App">
      <h1 className="text-4xl mb-10">Characters</h1>
      <Routes>
        <Route
          path="/"
          element={
            characters ? (
              renderCharacterList()
            ) : (
              <div className="flex justify-center mt-10">
                <BounceLoader color="blue" />
              </div>
            )
          }
        ></Route>
        <Route
          path="/characters/:characterId"
          element={<CharacterDetails fetchData={fetchData} />}
        />
      </Routes>
      {}
    </div>
  );
}
export default App;
