import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import NavigationBar from './components/NavigationBar';
import DataTable from './components/DataTable.jsx';
import Filters from './components/Filters.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/:table_name?"
          element={
            <PrivateRoute>
              <div className="flex h-screen">
                <NavigationBar />
                <div className="flex flex-col flex-1 p-4">
                  <Filters />
                  <DataTable />
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
