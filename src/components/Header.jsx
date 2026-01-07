// import statics
import LogoSmall from "../assets/icons/logo-small.svg";
import LogoLarge from "../assets/icons/logo-large.svg";
import ChampionCup from "../assets/icons/icon-personal-best.svg";

export const Header = ({ bestResult }) => {
  return (
    <div className="flex justify-between items-center mb-8 md:mb-10 xl:mb-16">
      <div>
        <img src={LogoSmall} alt="A keyboard" className="md:hidden" />
        <img
          src={LogoLarge}
          alt="A keyboard with a text to its right"
          className="hidden md:block"
        />
      </div>
      <div className="flex justify-around items-center">
        <img src={ChampionCup} alt="Champion Cup" className="mr-3" />
        <p className="text-neutral-400">
          <span className="md:hidden">Best: </span>
          <span className="hidden md:inline">Personal best: </span>
          <span className="text-neutral-0">{bestResult} WPM</span>
        </p>
      </div>
    </div>
  );
};
