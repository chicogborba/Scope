import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientList from "./pages/ClientList";
import ClientInfo from "./pages/ClientInfo/ClientInfo";
import ClientLogin from "./pages/Login";
import FeedbacksByPlace from "./pages/FeedbacksByPlace/FeedbacksByPlace";

const App = () => {
  return (
    <Router>
      <div className="bg-[#FAFAFA] min-h-screen w-screen text-black">
        <Routes>
          <Route path="*" element={<ClientLogin />} />
          <Route path="/list" element={<ClientList />} />
          <Route path="/info/:id" element={<ClientInfo />} />
          <Route path="feedbackByPlace" element={<FeedbacksByPlace/>} />
          {/* <Route path="" */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;