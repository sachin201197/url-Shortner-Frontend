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

  const fetch = (data) => {
    axios
      .get(`https://api.shrtco.de/v2/shorten?url=${data}`)
      .then((response) => {
        setShortUrl([response.data.result.full_short_link, ...shortUrl]);

        axios
          .post(
            `https://urlshot1.onrender.com/urlcreator/createurl`,
            {
              originalUrl: data,
              shortUrl: response.data.result.full_short_link,
            },
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
              },
            }
          )
          .then((response) => {
            console.log(response);
            alert("Url Shortner link has been sent to DB ");
          })
          .catch(function (error) {
            console.log(error);
          });
      });
  };
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
