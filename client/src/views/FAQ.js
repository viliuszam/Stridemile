import Questions from "../components/Questions";
import * as React from 'react';

export default () => {

  return (
    <div className="w-full">
      <div className="container pt-12">
        <div className="container md:flex mx-auto">
          <div className='container pb-10 mx-auto'>
            <p className='mb-12 text-2xl text-center font-semibold'>FAQ</p>
            <Questions/>
          </div>
        </div>
      </div>
    </div>
  );
};