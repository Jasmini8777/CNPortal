import React from 'react';

function Card() {
  return (
    <>
      <div className="container mx-auto px-4 py-6 bg-sky-100">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-400">
          Empower your career journey | Know your strengths | Achieve your goals
        </h1>
        <h2 className="text-4xl font-bold mb-8 text-center text-blue-600">
          Loved by an enthusiastic community of over a million students, parents, professionals & counsellors
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6 hover:bg-sky-300 hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
            <img src="g1.png" alt="Career Development & Growth" className="w-full mb-4" />
            <h2 className="text-lg font-semibold mb-2">Career Development & Growth</h2>
            <p>Empower employees with career planning, upskilling programs, and mentorship opportunities to help them grow within the company.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:bg-sky-300 hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
            <img src="g2.png" alt="Performance & Skill Enhancement" className="w-full mb-4" />
            <h2 className="text-lg font-semibold mb-2">Performance & Skill Enhancement</h2>
            <p>Track employee performance, identify skill gaps, and provide training programs for continuous professional development.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:bg-sky-300 hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
            <img src="g3.png" alt="Career Pathway & Promotions" className="w-full mb-4" />
            <h2 className="text-lg font-semibold mb-2">Career Pathway & Promotions</h2>
            <p>Guide employees on career progression within the company, offering clear pathways for promotions and role advancements.</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:bg-sky-300 hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out">
            <img src="g4.png" alt="Employee Engagement & Well-being" className="w-full mb-4" />
            <h2 className="text-lg font-semibold mb-2">Employee Engagement & Well-being</h2>
            <p>Foster a productive work environment with career counseling, wellness programs, and work-life balance initiatives.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;