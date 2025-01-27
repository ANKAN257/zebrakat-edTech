import { React } from "react";

function SocialMediaComponent() {
  return (
    <div className="flex justify-center items-center ">
      <a
        href="https://www.linkedin.com/in/ankan-kumar-11944120a/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="rounded-full w-10 h-10 flex justify-center items-center bg-black my-3 mx-2 cursor-pointer p-2 hover:bg-pink-900 transition-all">
          <i className="ri-linkedin-fill text-white text-lg hover:text-white"></i>
        </div>
      </a>

      <a
        href="https://www.instagram.com/ankank257/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="rounded-full w-10 h-10 flex justify-center items-center bg-black my-3 mx-2 cursor-pointer p-2 hover:bg-pink-900 transition-all">
          <i className="ri-instagram-fill text-white text-lg hover:text-white"></i>
        </div>
      </a>

      <a
        href="https://github.com/ANKAN257"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="rounded-full w-10 h-10 flex justify-center items-center bg-black my-3 mx-2 cursor-pointer p-2 hover:bg-pink-900 transition-all">
          <i className="ri-github-fill text-white text-lg hover:text-white"></i>
        </div>
      </a>

      <a
        href="http://localhost:3000/contact"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="rounded-full w-10 h-10 flex justify-center items-center bg-black my-3 mx-2 cursor-pointer p-2 hover:bg-pink-900 transition-all">
          <i className="ri-mail-fill text-white text-lg hover:text-white"></i>
        </div>
      </a>

      <a
        href="https://leetcode.com/jps257/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="rounded-full w-10 h-10 flex justify-center items-center bg-black my-3 mx-2 cursor-pointer p-2 hover:bg-pink-900 transition-all">
          <img
            src="https://user-images.githubusercontent.com/36547915/97088991-45da5d00-1652-11eb-900f-80d106540f4f.png"
            className="w-8 h-8 rounded-full object-cover"
            alt="Leetcode"
          />
        </div>
      </a>

      {/* <a href="https://codeforces.com/profile/jp_s" target="_blank" rel="noopener noreferrer">
        <div className="rounded-full w-10 h-10 flex justify-center items-center bg-black my-3 mx-2 cursor-pointer p-2 hover:bg-pink-900 transition-all">
          <img
            src="https://store-images.s-microsoft.com/image/apps.48094.14504742535903781.aedbca21-113a-48f4-b001-4204e73b22fc.503f883f-8339-4dc5-8609-81713a59281f"
            className="w-8 h-8 rounded-full object-cover"
            alt="Codeforces"
          />
        </div>
      </a> */}
    </div>
  );
}

export default SocialMediaComponent;
