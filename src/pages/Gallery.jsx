import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryItems = [
    {
      id: 1,
      title: "IMAGE FOLDER 1",
      image:
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
      category: "Photography",
      images: [
        "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=800&h=600&fit=crop",
      ],
    },
    {
      id: 2,
      title: "IMAGE FOLDER 2",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop",
      category: "Portrait",
      images: [
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      ],
    },
    {
      id: 3,
      title: "IMAGE FOLDER 3",
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop",
      category: "Fashion",
      images: [
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558769132-cb1aea1f782c?w=800&h=600&fit=crop",
      ],
    },
    {
      id: 4,
      title: "IMAGE FOLDER 4",
      image:
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",
      category: "Artistic",
      images: [
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      ],
    },
  ];

  const openFolder = (folder) => {
    setSelectedFolder(folder);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedFolder(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = "auto";
  };

  const nextImage = () => {
    if (selectedFolder) {
      setCurrentImageIndex((prev) =>
        prev === selectedFolder.images.length - 1 ? 0 : prev + 1,
      );
    }
  };

  const previousImage = () => {
    if (selectedFolder) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedFolder.images.length - 1 : prev - 1,
      );
    }
  };

  const handleKeyDown = (e) => {
    if (!selectedFolder) return;
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") previousImage();
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedFolder]);

  return (
    <section id="gallery" className="section noisy min-h-dvh">
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
              onClick={() => openFolder(item)}
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

      {/* Modal */}
      {selectedFolder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>

          {/* Modal Content */}
          <div className="relative w-full h-full flex flex-col p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="mb-4 sm:mb-6">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                {selectedFolder.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-400 mt-1">
                {selectedFolder.category}
              </p>
            </div>

            {/* Main Image Display */}
            <div className="flex-1 relative flex items-center justify-center">
              <img
                src={selectedFolder.images[currentImageIndex]}
                alt={`${selectedFolder.title} - Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg"
              />

              {/* Navigation Buttons */}
              <button
                onClick={previousImage}
                className="absolute left-2 sm:left-4 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-sm">
                <span className="text-sm sm:text-base">
                  {currentImageIndex + 1} / {selectedFolder.images.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Navigation */}
            <div className="mt-4 sm:mt-6 flex gap-2 sm:gap-3 justify-center overflow-x-auto pb-2">
              {selectedFolder.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden transition-all ${
                    index === currentImageIndex
                      ? "ring-2 ring-purple-500 scale-110"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
