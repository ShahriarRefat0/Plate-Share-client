import React from 'react';
import error from '../../public/404 Webpage Designs _ Web Design Inspiration.gif'
import { Link } from 'react-router';

const ErrorPage = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <img className='md:w-[70%] w-[50%] mx-auto' src={error} alt="" />
        <h1 className="mt-4 text-3xl md:text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-8 flex items-center justify-center gap-x-6">
          <Link
            to='/'
            className="btn-primary"
          >
            Go back home
          </Link>

        </div>
      </div>
    </main>
  );
};

export default ErrorPage;