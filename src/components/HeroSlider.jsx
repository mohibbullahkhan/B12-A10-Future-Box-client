import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function HeroSlider() {
  const slides = [
    {
      id: 1,
      title: "Manage Your Utility Bills Efficiently",
      text: "Track and pay all your utility bills in one secure platform",
      img: "https://greatfallsmt.net/sites/default/files/styles/gallery500/public/imageattachments/finance/page/32221/adobestock_111523070.jpg?itok=ukeABLKK",
      btnText: "Pay Your Utility Bill",
    },
    {
      id: 2,
      title: "Never Miss a Payment Deadline",
      text: "Get timely reminders and pay your bills on time",
      img: "https://cdn.mos.cms.futurecdn.net/u8gNmUz5XeSXBvGuBXkKGd.jpg",
      btnText: "Explore Services",
    },
    {
      id: 3,
      title: "Secure and Reliable Payment System",
      text: "Your payments are protected with industry-standard security",
      img: "https://corefy.com/user/pages/02.glossary/secure-payment-methods/Secure-payment-methods.svg",
      btnText: "Get Started",
    },
  ];

  return (
    <section className="bg-gray-100 py-16">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          prevEl: ".swiper-button-prev-custom",
          nextEl: ".swiper-button-next-custom",
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom",
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        className="max-w-7xl mx-auto rounded-3xl shadow-2xl overflow-hidden h-[550px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="w-full h-full relative">
              <div className="absolute inset-0">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-[#001C30]/70" />
              </div>

              <div className="absolute inset-0 flex items-center justify-center p-8 md:p-16 text-center">
                <div className="max-w-3xl">
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 drop-shadow-lg">
                    {slide.title}
                  </h1>

                  <p className="text-lg sm:text-xl text-gray-100 leading-relaxed mb-8 drop-shadow-md">
                    {slide.text}
                  </p>

                  <button className="px-10 py-3 text-lg font-bold bg-[#3468C0] text-white rounded-full shadow-xl transition duration-300 hover:bg-opacity-80 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#3468C0] focus:ring-opacity-70">
                    {slide.btnText}
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 swiper-pagination-custom flex space-x-2"></div>

        <div className="absolute inset-y-0 w-full z-20 hidden lg:flex items-center justify-between pointer-events-none px-6">
          <div className="swiper-button-prev-custom pointer-events-auto cursor-pointer bg-white/30 p-3 rounded-full shadow-lg transition duration-300 hover:bg-white/50 text-white backdrop-blur-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>

          <div className="swiper-button-next-custom pointer-events-auto cursor-pointer bg-white/30 p-3 rounded-full shadow-lg transition duration-300 hover:bg-white/50 text-white backdrop-blur-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Swiper>
    </section>
  );
}
