// import React from "react";

// function AboutPage() {
//   return (
//     <section>
//       <h1 className="flex flex-wrap gap-2 sm:gap-x-6 items-center justify-center text-4xl font-bold leading-none tracking-wide sm:text-6xl">
//         We love
//         <span className="bg-primary py-2 px-4 rounded-lg tracking-widest text-white">
//           ZoomStore
//         </span>
//       </h1>
//       <p className="mt-6 text-lg tracking-wide leading-8 max-w-2xl mx-auto ">
//         Once upon a time, in a bustling digital landscape, there was a visionary
//         team of entrepreneurs who set out to revolutionize the way people shop.
//         They dreamed of creating an extraordinary online shopping experience
//         that would bring joy, convenience, and limitless possibilities to
//         customers worldwide. With unwavering determination, they founded Zoom
//         Store, an e-commerce platform like no other.
//       </p>
//     </section>
//   );
// }

// export default AboutPage;

import React from "react";

function AboutPage() {
  return (
    <section className="bg-gray-100 py-12 px-6 sm:py-16 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center text-4xl sm:text-6xl font-extrabold leading-tight tracking-wide text-gray-800">
          We are
          <span className="block sm:inline-block bg-primary text-white px-4 py-2 rounded-md mt-2 sm:ml-3">
            ZoomStore
          </span>
        </h1>
        <p className="mt-8 text-center text-lg sm:text-xl text-gray-700 leading-relaxed">
          Once upon a time, in the heart of the digital world, a visionary team
          embarked on a journey to redefine shopping. With bold aspirations,
          they created ZoomStore—a platform that offers more than convenience.
          ZoomStore is a gateway to joy, innovation, and limitless possibilities
          for customers around the globe.
        </p>
        <p className="mt-6 text-center text-lg sm:text-xl text-gray-700 leading-relaxed">
          Guided by a commitment to excellence and sustainability, ZoomStore
          combines cutting-edge technology with a human touch, delivering an
          unparalleled shopping experience that inspires and delights.
        </p>
        <div className="mt-12 text-center">
          <button className="bg-primary text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-primary-dark transition">
            Discover More
          </button>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
