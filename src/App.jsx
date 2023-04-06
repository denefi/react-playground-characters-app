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
  const [deleteRequested, setDeleteRequested] = useState(null);
  const [characters, setCharacters] = useState(null);
  const baseURL = "https://ih-crud-api.herokuapp.com";
  // useEffect(() => {
  //   async function seedData() {
  //     const data = {
  //       name: "Obi Wan",
  //       occupation: "Jedi",
  //       weapon: "The force",
  //     };
  //     try {
  //       const res = await axios.post(baseURL + "/characters", data);
  //       console.log(res);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   }
  //   seedData();
  // }, []);
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
  useEffect(() => {
    if (deleteRequested) {
      async function deleteCharacter() {
        const res = await axios.delete(
          baseURL + "/characters/" + deleteRequested
        );
        console.log(res);
      }
      deleteCharacter();
      setDeleteRequested(null);
    }
  }, [deleteRequested]);
  const renderCharacterList = () => {
    return characters.slice(0, 10).map((character, index) => (
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
        <Route path="/characters/:characterId" element={<CharacterDetails />} />
      </Routes>
      {}
    </div>
  );
}
export default App;
