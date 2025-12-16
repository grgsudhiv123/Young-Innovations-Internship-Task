import { Link } from "react-router";
import { FooterConstants } from "../../utils/constants/footerConstants";

const FooterComp = () => {
  return (
    <footer className="w-full py-[clamp(0.5rem,3vw,1.25rem)] px-[clamp(1rem,4vw,2rem)] mt-20">
      <div className="max-w-330 w-full mx-auto flex justify-between">
        <p className="body-md-400 text-gray-600">
          © 2021 - Eduguard. Designed by{" "}
          <span className="text-black">Templatecookie</span>. All rights
          reserved
        </p>
        <ul className="flex flex-row gap-6 body-md-400 text-gray-600">
          {FooterConstants &&
            FooterConstants.map((content, i) => (
              <li key={i}>
                <Link to={content.link} className=" hover:text-gray-800">
                  {content.title}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </footer>
  );
};

export default FooterComp;
