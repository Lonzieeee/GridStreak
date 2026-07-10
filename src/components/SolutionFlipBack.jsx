import { FaArrowRight } from "react-icons/fa";

function SolutionFlipBack({ solution }) {
  return (
    <div className="home-solutions__preview-back-content">
      <h3 className="home-solutions__preview-back-title">{solution.title}</h3>
      <p className="home-solutions__preview-back-summary">{solution.backSummary}</p>
      <ul className="home-solutions__preview-back-services-list">
        {solution.applications.map((item) => (
          <li key={item}>
            <FaArrowRight className="home-solutions__preview-back-arrow" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SolutionFlipBack;
