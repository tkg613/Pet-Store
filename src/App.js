import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from './pages/ForgotPassword'
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import Category from "./pages/Category";
import CreatePet from './pages/CreatePet'
import Pet from "./pages/Pet";
import Contact from "./pages/Contact";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path='/category/:categoryName' element={<Category />} />
          <Route path='/category/:categoryName/:petId' element={<Pet />} />
          <Route path='/contact/:ownerId/' element={<Contact />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-pet" element={<CreatePet />} />
        </Routes>

        <Navbar />

      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
