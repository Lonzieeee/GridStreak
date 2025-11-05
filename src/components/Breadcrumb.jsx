import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Breadcrumb.css';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbNameMap = {
    'solutions': 'Solutions',
    'partners': 'Partners',
    'sustainability': 'Sustainability',
    'contact': 'Contact',
    'technology': 'Technology',
    'insights': 'Insights'
  };

  if (pathnames.length === 0) return null;

  return (
    <nav className="breadcrumb" aria-label="Breadcrumb navigation">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://gridstreak.com/"
            },
            ...pathnames.map((name, index) => ({
              "@type": "ListItem",
              "position": index + 2,
              "name": breadcrumbNameMap[name] || name,
              "item": `https://gridstreak.com/${pathnames.slice(0, index + 1).join('/')}`
            }))
          ]
        })}
      </script>
      
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <Link to="/" className="breadcrumb-link">Home</Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const displayName = breadcrumbNameMap[name] || name;

          return (
            <li key={name} className="breadcrumb-item">
              <span className="breadcrumb-separator"> / </span>
              {isLast ? (
                <span className="breadcrumb-current" aria-current="page">
                  {displayName}
                </span>
              ) : (
                <Link to={routeTo} className="breadcrumb-link">
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
