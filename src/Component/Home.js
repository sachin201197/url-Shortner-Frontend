import { useState } from "react";
import axios from "axios";
function Home() {
  const [data, setData] = useState("");
  const [value, setValue] = useState("");
  const [shortUrl, setShortUrl] = useState([]);
  const handelClick = () => {
    setValue(data);
    setData("");
    fetch(value);
  };
  const handelChange = (e) => {
    setData(e.target.value);
    //  console.log(e.target.value);
  };

  async function fetch(data) {
    try {
      const val = await axios(`https://api.shrtco.de/v2/shorten?url=${data}`);

      setShortUrl([...shortUrl, val.data.result.full_short_link]);

      axios.post(`https://urlshot1.onrender.com/urlcreator/createurl`, {
        originalUrl: "sachin.com",
        shortUrl: val.data.result.full_short_link,
      });
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <h1> URL shortner</h1>
      <div>
        <input type="text" value={data} onChange={handelChange}></input>
        <button onClick={handelClick}>Submit</button>
        {shortUrl &&
          shortUrl.map((item, index) => {
            return <h1>{item}</h1>;
          })}
      </div>
    </>
  );
}

export default Home;
