interface Banner {
  title: string;
  bg: string;
}

const InnerBanner: React.FC<Banner> = ({ title, bg }) => {
  return (
    <>
      <section
        className="lg:h-80 h-56 bg-gray-100 flex items-center bg-no-repeat bg-cover relative"
        style={{ backgroundImage: `url('/images/${bg}')` }}
      >
        <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-white to-white/0"></div>
        <div className="container relative">
          <h1 className="text-4xl text-gray-800 font-semibold">{title}</h1>
        </div>
      </section>
    </>
  );
};

export default InnerBanner;
