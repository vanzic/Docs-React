import React, { useRef, useState, useEffect } from 'react';
import Card from './card';
import { motion } from 'framer-motion';

const Foreground = () => {
  const popUpRef = useRef(null); // Ref for the pop-up
  const containerRef = useRef(null); // Ref for the card container
  const [newHover, setHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [data, setData] = useState([
    {
      desc: "This is the data that needs to be shown",
      filesize: "0.9mb",
      close: false,
      tag: { isOpen: true, tagTitle: "Download", tagcolor: "green" },
    },
  ]);



  const template = {
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
    filesize: "0.9mb",
    close: false,
    tag: { isOpen: true, tagTitle: "Download", tagcolor: "green" },
  };

  let current = {
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
    filesize: "0.9mb",
    close: false,
    tag: { isOpen: true, tagTitle: "Download", tagcolor: "green" },
  };

  function change(event) {
    current.desc = String(event.target.value);
    current.filesize = `${Number(current.desc.split(' ').length * 0.1).toFixed(2)}mb`;
  }

  const handleCreate = () => {
    setData((prev) => [...prev, current]);
    setTimeout(() => {
      current = template;
    }, 200);
    setIsOpen(false);
  };

  const handleDelete = (index) => {
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClickOutside = (event) => {
    if (popUpRef.current && !popUpRef.current.contains(event.target)) {
      setIsOpen(false); // Close the div when clicking outside
    }
  };
  

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [phone, SetPhone] = useState(window.innerWidth < 1000); // For ResponsiveNess
  console.log(phone);

  return (
    <>
      {/* Card Rendering with Ref for Drag Constraints */}
      <div ref={containerRef} className='flex fixed z-[2] w-full h-screen flex gap-3 flex-wrap'>
        {data.map((item, index) => (
          <Card key={index} data={item} reference={containerRef} onDelete={() => handleDelete(index)} />
        ))}
      </div>


      {/* Pop-Up Div */}
      {isOpen && (
        <motion.div
          ref={popUpRef} // Assigning ref here
          initial={{ scale: 0.8 }} // Initial state
          animate={{ scale: 1 }} // Final state
          className={`overflow-hidden z-10 absolute h-[60%] ${phone ? "w-[90vw] left-[5vw]" : "w-[30%] left-[35vw]"} bg-zinc-900/100 top-[20vh] border-zinc-600 border-[1px] rounded-[50px] transition-all duration-500`}
        >
          <textarea
            onChange={change}
            placeholder={'Enter Text...'}
            id='inputArea'
            className='absolute top-5 left-[5%] h-80 w-[90%] p-5 bg-zinc-700 text-zinc-100 rounded-[40px]'
          />

          <button
            onClick={handleCreate}
            className='absolute bottom-10 left-[50%] translate-x-[-50%] border-zinc-100 border-[1px] px-10 py-2 rounded-full bg-green-600 text-zinc-100'
          >
            Create
          </button>
        </motion.div>
      )}

      {/* Create New Button */}
      <div
        onMouseEnter={() => {
          setHover(true);
        }}
        onMouseDown={()=>{

        }}
        onMouseLeave={() => setHover(false)}
        style={{
          cursor: newHover ? 'pointer' : 'default',
        }}
        onClick={() => {
          setIsOpen(true);
          current = template;
        }}
        className={`text-zinc-300 z-10 text-[150%] h-auto border-[1px] ${newHover ? 'bg-zinc-300 text-zinc-900' : 'bg-zinc-800'} border-zinc-600 rounded-full absolute flex justify-center px-10 py-2 bottom-20 left-[50%] translate-x-[-50%] transition-all duration-500 whitespace-nowrap`}
      >
        Create New
      </div>
    </>
  );
};

export default Foreground;
