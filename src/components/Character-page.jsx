import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { BounceLoader } from "react-spinners";

function CharacterDetails() {
  const baseURL = "https://ih-crud-api.herokuapp.com";
  const [character, setCharacter] = useState(null);
  const { characterId } = useParams();
  const [message, setMessage] = useState(null);

  async function fetchCharacterData() {
    try {
      const res = await axios.get(baseURL + "/characters/" + characterId);
      console.log(res.data);
      setCharacter({ ...res.data });
    } catch (e) {
      setMessage("User not found");
      console.error(e);
    }
  }
  const displayNotFound = () => <p>{message}</p>;
  const renderDetails = () => {
    return (
      <>
        <p>This is a Character Page for {character.name}</p>
        <p>Occupation: {character.occupation}</p>
        <p>Weapon: {character.weapon}</p>
      </>
    );
  };
  useEffect(() => {
    fetchCharacterData();
  }, []);
  return (
    <div className=" flex flex-col justify-center items-center border-black border-2 p-5">
      {character
        ? renderDetails()
        : message || (
            <div className="flex justify-center align-center ">
              <BounceLoader color="blue" />
            </div>
          )}{" "}
      <Link className="p-3 mt-3 bg-blue-500 rounded-xl" to="/">
        Back Home!
      </Link>
    </div>
  );
}

export default CharacterDetails;
