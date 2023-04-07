import axios from "axios";
async function seedData(amount) {
  try {
    for (let i = 0; i < amount; i++) {
      const data = {
        name: `Obi Wan ${i}`,
        occupation: "Jedi",
        weapon: "The force",
      };
      const res = await axios.post(
        "https://ih-crud-api.herokuapp.com/characters",
        data
      );
      console.log(res.statusText, res.data.name);
    }
  } catch (e) {
    console.log(e);
  }
}
seedData(5);
