
import Login from "./components/Login/Login";
import "./App.css"
function App() {

  const LoginHandler = () =>{

    alert("loggedIn");
  }


  return (
    <div className="App">
      <Login onLogin={LoginHandler} />
    </div>
  );
}

export default App;
