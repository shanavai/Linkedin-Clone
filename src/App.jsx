import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserAuth } from "./actions"; 
 
function App(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);
 
  useEffect(()=>{
    dispatch(getUserAuth()) 
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <>
                <Header />
                <Home />
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
