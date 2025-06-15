import { useEffect } from 'react';
// this only a reseter component that reset the dates when  a user navigate from incident to performance i did it because thats the strucutre in the thesis and im out of f time
const ResetDateRange = ({ onReset, children }) => {
  useEffect(() => {
    onReset();
  
  }, []); 

  return children;
};

export default ResetDateRange;