import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
const AboutUs = () => {
  return (
    <>
    <Navbar/>
    <section className="text-gray-600 body-font overflow-hidden bg-sky-100 mt-4">
      <div className="container px-5 py-8 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <video className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" autoPlay muted loop>
            <source src="a1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">CareerNaksha</h2>
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">About Us</h1>
            <p className="leading-relaxed">
              CSERF is a non-political, non-profit, non-government foundation to promote career research & development activities for youth. Our social work addresses issues in sustainable education & skill development sectors. Our CSR vision is to build a foundation with rock-solid sustainable goals to provide support, assistance and growth to students & youths of India.
            </p>
          </div>
        </div>
      </div>
    </section>
    </>
  );
};

const TeamMember = ({ imgSrc, name, role }) => {
  return (
    <div className="p-4 md:w-1/3 w-full">
      <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
        <img alt={name} className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src={imgSrc} />
        <div className="flex-grow">
          <h2 className="text-gray-900 title-font font-medium">{name}</h2>
          <p className="text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Team = () => {
  const teamMembers = [
    { imgSrc: "1.jpeg", name: "NIMISH GOPAL", role: "Founder" },
    { imgSrc: "2.jpeg", name: "TUSHAR KARLEKAR", role: "President Execution" },
    { imgSrc: "3.jpeg", name: "Sonali Narayangaoker", role: "Senior Customer & Marketing Manager" },
    { imgSrc: "4.jpeg", name: "Rajendra Singh Sirvi", role: "Head Admissions & University Relations" },
    { imgSrc: "5.jpeg", name: "Lata Chandel", role: "Senior HR Associate" },
    { imgSrc: "6.jpeg", name: "Huma Sufiyan", role: "Head Community Manager & PM Shri Lead" },
    { imgSrc: "7.jpeg", name: "Naishvi Shah", role: "Assistant CSR Project Manager" },
    { imgSrc: "8.jpeg", name: "Anshul Parashari", role: "Marketing Associate" },
    { imgSrc: "9.jpg", name: "Shiva Bhattarai ", role: "Jr.Full Stack Developer" }
  ];

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-16 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Our Team</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            CareerNaksha is the most trusted online offline career counselling & career guidance platform for students connecting top career counsellors in India.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};

const EventsGallery = () => {
//   const images = ["C1.jpeg", "C2.jpeg", "C3.jpeg", "C4.jpeg", "C5.jpeg", "C6.jpeg"];
  return (
    <>
    <section className="text-gray-600 body-font bg-sky-100">
      <div className="container px-5 py-16 mx-auto flex flex-wrap">
        <div className="flex w-full mb-4 flex-wrap">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">
            Glimpse of Events
          </h1>
        </div>
        <div className="flex flex-wrap md:-m-2 -m-1">
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-1/2">
              <img alt="gallery" className="w-full object-cover h-full object-center block" src="C1.jpeg" />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img alt="gallery" className="w-full object-cover h-full object-center block" src="C2.jpeg" />
            </div>
            <div className="md:p-2 p-1 w-full">
              <img alt="gallery" className="w-full h-full object-cover object-center block" src="C3.jpeg" />
            </div>
          </div>
          <div className="flex flex-wrap w-1/2">
            <div className="md:p-2 p-1 w-full">
              <img alt="gallery" className="w-full h-full object-cover object-center block" src="C4.jpeg" />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img alt="gallery" className="w-full object-cover h-full object-center block" src="C5.jpeg" />
            </div>
            <div className="md:p-2 p-1 w-1/2">
              <img alt="gallery" className="w-full object-cover h-full object-center block" src="C6.jpeg" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

const MainComponent = () => {
  return (
    <>
      <AboutUs />
      <Team />
      <EventsGallery />
    </>
  );
};

export default MainComponent;