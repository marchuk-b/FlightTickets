import './App.css';
import { FlightList } from './components/FlightList/FlightList';
import Footer from './components/PageComponents/Footer/Footer';
import Header from './components/PageComponents/Header/Header';

function App() {
  return (
    <>
      <Header />
      <div className="main-content">
        <FlightList/>
      </div>
      <Footer />
    </>
  );
}

export default App;
