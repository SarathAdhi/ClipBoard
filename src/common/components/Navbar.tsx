const Navbar = () => {
  return (
    <header className="w-full flex flex-col items-center bg-gray-300">
      <div className="w-full max-w-[1280px] p-2 sm:p-4">
        <h1
          className="underline cursor-pointer"
          onClick={() => {
            location.replace("/");
          }}
        >
          ClipBoard
        </h1>
      </div>
    </header>
  );
};

export default Navbar;
