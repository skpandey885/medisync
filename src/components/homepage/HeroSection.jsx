import React from "react";

const Hero = () => {
  return (
    <div>
      <>
        <section className="px-2 py-20 bg-white dark:bg-main-dark-bg md:px-0">
          <div className="container items-center max-w-screen-xl px-8 mx-auto xl:px-5">
            <div className="flex flex-wrap items-center sm:-mx-3">
              <div className="w-full md:w-1/2 md:px-3">
                <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                  <h4 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                    <span className="block xl:inline">MediSync</span>
                    <span className="block text-3xl font-medium text-blue-500">
                      A Decentralized Intelligent Government Health Portal
                    </span>
                  </h4>
                  <p className="mx-auto text-base text-gray-500 sm:max-w-md lg:text-xl md:max-w-3xl">
                    Your digital gateway to comprehensive healthcare
                    information, services, and resources, ensuring access to
                    quality care for all citizens.
                  </p>

                  <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                    <a
                      href="/login"
                      className="flex items-center w-full px-6 py-3 mb-3 text-lg text-white bg-blue-500 rounded-md sm:mb-0 hover:bg-blue-700 sm:w-auto"
                    >
                      Get Started
                    </a>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                  <img
                    src="https://img.freepik.com/free-vector/medics-working-charts_1262-19836.jpg?t=st=1712944955~exp=1712948555~hmac=84da9801e456a3a1566a986d65798e915aa96b12677933b1698a974c3a4433d1&w=1060"
                    className="object-cover object-center w-full h-full"
                    alt="medical image"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </div>
  );
};

export default Hero;
