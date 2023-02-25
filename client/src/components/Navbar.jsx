import { navLinks } from "../constants";

const Navbar = () => {
  return (
    <nav className="w-full flex py-6 justify-between items-center top-48">
      <div className="w-[320px] h-[36px] text-logo font-bold text-2xl "> CoDescribe.app </div>
      <ul className="list-none sm:flex hidden items-center ">
        {/* {navLinks.map((nav, index) => (
          <li 
          key={nav.id} 
          className={`font-poppins font-normal text-logo cursor-pointer text-[16px] ${index === navLinks.length-1 ? 'mr-0' : 'mr-10'} text-white`}>
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))} */}
      </ul>
      
      <div className="grid ss:grid-cols-2 grid-cols-1 gap-4 sm:flex hidden font-poppins text-white mt-5">
          <a href="https://www.buymeacoffee.com/mateuszcoder">
            <button className="cursor-pointer font-semibold  h-[60px] w-[170px] relative overflow-hidden rounded-lg bg-black  ring-red-500/50 ring-offset-black will-change-transform">
              <span className="absolute inset-0.5 z-10 grid place-items-center rounded-lg bg-black bg-gradient-to-t from-neutral-800 ">
                Support the author
              </span>
              <span
                aria-hidden
                className="absolute inset-0 z-5 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-red-500 before:to-amber-400"
              />
            </button>
          </a>
          <a href="https://twitter.com/betterMateusz">
            <button className="cursor-pointer font-semibold  h-[60px] w-[170px] relative overflow-hidden rounded-lg bg-black py-6 ring-red-500/50 ring-offset-black will-change-transform">
              <span className="absolute inset-0.5 z-10 grid place-items-center rounded-lg bg-black bg-gradient-to-t from-neutral-800 ">
                Check twitter
              </span>
              <span
                aria-hidden
                className="absolute inset-0 z-5 scale-x-[2.0] blur before:absolute before:inset-0 before:top-1/2 before:aspect-square before:animate-disco before:bg-gradient-conic before:from-purple-700 before:via-red-500 before:to-amber-400"
              />
            </button>
          </a>
        </div>
    </nav>
  );
};

export default Navbar;
