import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Aggregator from "./components/Aggregator";
import Error from "./components/Error";
import News from "./components/News";
import Docs from "./components/Docs";
import Posts from "./components/Posts";
import Purchases from "./components/Purchases";
import Contracts from "./components/Contracts";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Aggregator />} />
            <Route path="/news" element={<News />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/contracts" element={<Contracts />} />
            <Route path="*" element={<Error />} />
          {/*<Route path="*" element={<Error />} />*/}

        </Routes>
      </BrowserRouter>
  );
}

export default App;
