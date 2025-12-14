import App from './App.jsx';
import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx';
import Sustainability from './pages/Sustainability.jsx';
import Solutions from './pages/Solutions.jsx';
import Partners from './pages/Partners.jsx';
import SiteMap from './pages/SiteMap.jsx';
import CleanCooking from './pages/CleanCooking.jsx';
import HospitalsClinics from './pages/HospitalsClinics.jsx';
import ColdStorage from './pages/ColdStorage.jsx';
import WaterPurification from './pages/WaterPurification.jsx';
import WasteManagement from './pages/WasteManagement.jsx';
import EmergencyRelief from './pages/EmergencyRelief.jsx';

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
        index: true
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'sustainability',
        element: <Sustainability />,
      },
      {
        path: 'solutions',
        element: <Solutions />,
      },
      {
        path: 'solutions/clean-cooking',
        element: <CleanCooking />,
      },
      {
        path: 'solutions/hospitals-clinics',
        element: <HospitalsClinics />,
      },
      {
        path: 'solutions/cold-storage',
        element: <ColdStorage />,
      },
      {
        path: 'solutions/water-purification',
        element: <WaterPurification />,
      },
      {
        path: 'solutions/waste-management',
        element: <WasteManagement />,
      },
      {
        path: 'solutions/emergency-relief',
        element: <EmergencyRelief />,
      },
      {
        path: 'partners',
        element: <Partners />,
      },
      {
        path: 'site-map',
        element: <SiteMap />,
      },
    ],
  },
];


