import React from "react";
import { CgProfile } from "react-icons/cg";

const BubbleChat = ({ bubble }) => {
  return (
    <div className="flex divide-x-[3px] divide-[#F58F00]">
      <br></br>
      <div className="py-4 px-8 space-y-2 w-full">
        <div className="flex gap-12 items-center w-full justify-between">
          <div className="flex gap-2 items-center">
            <CgProfile size={30} color={"#44288F"} />
            <p className="bg-[#fff] text-[#44288F]">@{bubble.username}</p>
          </div>
          <p className="bg-[#fff] text-[#FFCC85]">14.00 PM</p>
        </div>
        <p>{bubble.message}</p>
      </div>
    </div>
  );
};

export default BubbleChat;