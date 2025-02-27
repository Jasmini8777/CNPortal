import React from "react";

const CareerNaksha = () => {
  const testimonialsData = [
    {
      img: "/neti.png",
      name: "Neti Seth",
      designation: "Ex OpsHub",
      review:
        "Started working with CareerNaksha experts as soon as I graduated. The entire process, from the counseling sessions to SoP editing, was well coordinated and helped me build a profile for top schools.",
    },
    {
      img: "/ankita.png",
      name: "Ankita Patel",
      designation: "Ex RA",
      review:
        "I am very grateful to CareerNaksha for providing me the right guidance for pursuing higher education abroad. I have received detailed information regarding entrance exams, scholarships, and courses.",
    },
    {
      img: "/calvin.png",
      name: "Calvin Yoon",
      designation: "SAT Tutor",
      review:
        "I was invited to speak with CareerNaksha to help figure out the best ways to start cultivating a career path for myself. The team was extremely friendly and helpful in guiding me in the right direction.",
    },
  ];

  return (
    <>
      {/* Vision & Mission Section */}
      <section className="bg-sky-100 flex justify-center items-center min-h-fit p-6">
        <div className="text-center">
          <h2 className="text-gray-600 text-2xl font-semibold">Vision - Mission</h2>
          <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mt-2">
            Guiding Ambitions, Shaping Futures:
            <br /> Our Vision and Mission at CareerNaksha
          </h1>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vision Card */}
            <div className="bg-white rounded-lg p-6 flex flex-col items-center text-center hover: hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="flex items-center">
                {"VISION".split("").map((letter, index) => (
                  <span
                    key={index}
                    className={`text-xl font-bold text-white bg-indigo-${Math.max(400, 600 - index * 100)} px-3 py-1 rounded-md`}
                  >
                    {letter}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 mt-4">
                To Help Students and Professionals Achieve their Career Dreams.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-lg p-6 flex flex-col items-center text-center hover: hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
              <div className="flex items-center">
                {"MISSION".split("").map((letter, index) => (
                  <span
                    key={index}
                    className={`text-xl font-bold text-white bg-indigo-${Math.max(400, 600 - index * 100)} px-3 py-1 rounded-md`}
                  >
                    {letter}
                  </span>
                ))}
              </div>    
              <p className="text-gray-700 mt-4">
                To provide the Most Trusted Affordable, Best in Class Online or Offline
                Personalised Data-Driven Career Counselling, Guidance & Skilling Platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="text-gray-600 body-font py-16">
        <div className="container px-5 mx-auto">
          <div className="flex flex-col text-center w-full mb-10">
            <h2 className="text-lg text-gray-500 font-medium">
              Know how our customers express their love for us
            </h2>
            <h1 className="sm:text-4xl text-3xl font-bold title-font text-blue-600 mt-2">
              Our success stories!
            </h1>
          </div>

          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {testimonialsData.map((testimonial, index) => (
              <div
                key={index}
                className="bg-sky-100 rounded-lg shadow-md p-6 border border-gray-300 hover:bg-sky-200 hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                <div className="text-blue-600 text-2xl">❝</div>
                <p className="text-gray-700 mt-2">{testimonial.review}</p>
                <div className="flex items-center mt-4">
                  <img src={testimonial.img} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                  <div className="ml-3">
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-600 text-sm">{testimonial.designation}</p>
                  </div>
                </div>
                <div className="text-yellow-500 mt-2">★★★★★</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CareerNaksha;