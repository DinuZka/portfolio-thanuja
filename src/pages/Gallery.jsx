import React from "react";

export default function Gallery() {
  const galleryItems = [
    {
      id: 1,
      title: "IMAGE FOLDER 1",
      image: `${import.meta.env.BASE_URL}/images/g1.webp`,
      category: "Photography",
    },
    {
      id: 2,
      title: "IMAGE FOLDER 2",
      image: `${import.meta.env.BASE_URL}/images/g2.webp`,
      category: "Portrait",
    },
    {
      id: 3,
      title: "IMAGE FOLDER 3",
      image: `${import.meta.env.BASE_URL}/images/g3.webp`,
      category: "Fashion",
    },
    {
      id: 4,
      title: "IMAGE FOLDER 4",
      image: `${import.meta.env.BASE_URL}/images/g4.webp`,
      category: "Artistic",
    },
  ];

  return (
    <section id="gallery" className="section min-h-dvh">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Gallery Header */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h2
            data-aos="fade-right"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight"
          >
            GALLERY
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {galleryItems.map((item) => (
            <div
              data-aos="zoom-in"
              key={item.id}
              className="group relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-2xl hover:shadow-3xl transition-all duration-500"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/20 group-hover:to-blue-600/20 transition-all duration-500"></div>

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-wide">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {item.category}
                </p>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
