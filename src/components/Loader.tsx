import React from 'react';

type Props = {};

const Loader: React.FC<Props> = () => {
  const circleCommonClasses = 'h-8 w-8 bg-green-400 rounded-full';

  return (
    <div className="absolute top-[50%] left-[50%] backdrop-blur-3xl flex">
      <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
      <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
      <div className={`${circleCommonClasses} animate-bounce400`}></div>
    </div>
  );
};

export default Loader;
