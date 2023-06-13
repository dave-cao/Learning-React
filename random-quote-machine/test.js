// Testing for fetch
import axios from "axios";

axios
  .get("https://api.quotable.io/quotes/random")
  .then((data) => console.log(data));
