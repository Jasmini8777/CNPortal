import React from "react";

const Footer = () => {
  return (
    <footer className="text-gray-600 body-font bg-white mt-0">
      <div className="container px-5 py-16 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
            <img src="./logo.png" alt="CareerNaksha Logo" className="w-10 h-auto mr-2" />
            <p className="text-lg">CareerNaksha</p>
          </a>
          <p className="mt-2 text-sm text-gray-500">
            CareerNaksha is the most trusted online offline career counselling & career guidance platform for students connecting top career counsellors in India.
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          {/* Column 1 - Career Counselling */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Career Counselling</h2>
            <nav className="list-none mb-10">
              {["Students", "Freshers", "College Graduates", "Corporates Industries"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-gray-800">{item}</a>
                </li>
              ))}
            </nav>
          </div>

          {/* Column 2 - Schools */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Schools</h2>
            <nav className="list-none mb-10">
              {["Career Test", "Assessments", "Psychometrics", "Aptitude Test"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-gray-800">{item}</a>
                </li>
              ))}
            </nav>
          </div>

          {/* Column 3 - Services */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Services</h2>
            <nav className="list-none mb-10">
              {["Career Test", "Counselling", "Psychometrics", "Mentorship"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-gray-800">{item}</a>
                </li>
              ))}
            </nav>
          </div>

          {/* Column 4 - Other Assessments */}
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Other Assessments</h2>
            <nav className="list-none mb-10">
              {["MBTI Personality Test", "DISC Personality Test", "DMIT Assessment", "Learning Style Assessment"].map((item, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-600 hover:text-gray-800">{item}</a>
                </li>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
     
    </footer>
  );
};

export default Footer;