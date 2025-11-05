import App from './App.jsx';
import Home from './pages/Home.jsx';
import Contact from './pages/Contact.jsx';
import Sustainability from './pages/Sustainability.jsx';
import Solutions from './pages/Solutions.jsx';
import Partners from './pages/Partners.jsx';
import SiteMap from './pages/SiteMap.jsx';

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


