import React, { useState } from 'react';
import { motion } from "framer-motion";
import { FaRegFileAlt } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function Card({ data, reference, onDelete }) {
    const [isHovered, setIsHovered] = useState(false);

    const [phone, SetPhone] = useState(window.innerWidth < 1000); // For ResponsiveNess


    const spring = {
        type: "spring",
        damping: 15,
        stiffness: 250
      }

    return (
        <motion.div
            transition={spring}
            drag
            dragConstraints={reference} // Use the passed reference for constraints
            whileDrag={{ scale: 1.2 }}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 200, bounceDamping: 25 }}

            initial={{ scale: 0.1 }} // Initial state
            animate={{ scale: 1 }} // Final state

            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ cursor: isHovered ? 'pointer' : 'default' }}

            className={`flex-shrink-0 relative ${phone ? "w-[20vh]" : "w-[15%]"}  h-72 bg-zinc-900/80 rounded-[40px] text-white px-7 py-10 overflow-hidden`}
        >
            <FaRegFileAlt />
            <p className='text-ss leading-tight mt-5'>{data.desc}</p>

            <div className='footer absolute bottom-0 left-0 w-full'>
                <div className='w-full flex items-center justify-between mb-3 px-6 py-1'>
                    <h5>{data.filesize}</h5>
                    <button
                        onClick={onDelete}
                        className='text-red-500 hover:text-red-700'
                        aria-label="Delete card"
                    >
                        <AiFillDelete size="1.5em" />
                    </button>
                </div>
                {data.tag.isOpen && (
                    <div className={`w-full ${data.tag.tagcolor === "green" ? "bg-green-600" : "bg-blue-600"} flex justify-center items-center py-2 text-sm`}>
                        {data.tag.tagTitle}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

export default Card;
