import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function CharacterDetails() {
  const baseURL = "https://ih-crud-api.herokuapp.com";
  const [character, setCharacter] = useState(null);
  const { characterId } = useParams();

  async function fetchCharacterData() {
    try {
      const res = await axios.get(baseURL + "/characters/" + characterId);
      console.log(res.data);
      setCharacter({ ...res.data });
    } catch (e) {
      console.error(e);
    }
  }
  const renderDetails = () => {
    return (
      <>
        <p>This is a Character Page for {character.name}</p>
        <p>Occupation {character.occupation}</p>
        <p>Weapon: {character.weapon}</p>
        <Link className="p-3 mt-3 bg-blue-500 rounded-xl" to="/">
          Back Home!
        </Link>
      </>
    );
  };
  useEffect(() => {
    fetchCharacterData();
  }, []);
  return (
    <div className=" flex flex-col justify-center items-center border-black border-2 p-5">
      {character ? renderDetails() : <p>loading ...</p>}
    </div>
  );
}

export default CharacterDetails;
