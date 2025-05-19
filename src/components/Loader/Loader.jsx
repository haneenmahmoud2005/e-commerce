import React from 'react';
import { Hearts } from 'react-loader-spinner';

export default function Loader() {
  return (
<div className="flex justify-center items-center min-h-screen">
<Hearts
      height="80"
      width="80"
      color="#A64CA6"
      ariaLabel="hearts-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    /></div>
  );
}
