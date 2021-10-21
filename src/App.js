import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './contexts/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import './style.css';
import Routes from './routes'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer autoClose={3000} position="bottom-right" />
        <Routes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
