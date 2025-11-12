import React, { useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import BilCard from "../components/BilCard";
import HeroSlider from "../components/HeroSlider";
import CategorySection from "../components/CategorySection";
import TrustStatistics from "../components/TrustStatistics";
import WhyChooseSection from "../components/WhyChooseSection";

const Home = () => {
  const axiosSecure = useAxiosSecure();
  const [bil, setBil] = useState([]);
  useEffect(() => {
    axiosSecure.get(`/recent`).then((data) => {
      setBil(data.data);
      console.log(data.data);
    });
  }, [axiosSecure]);
  return (
    <div>
      <HeroSlider></HeroSlider>
      <CategorySection></CategorySection>

      <div className="mt-5">
        <div className="text-center">
          {" "}
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Recent Bills
          </h2>
          <p className="text-lg text-gray-600 mb-12">
            Latest utility bills in the system
          </p>
        </div>
        <div className="grid gap-6 max-w-7xl max-sm:mx-2 mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(bil) &&
            bil.map((card) => <BilCard key={card._id} card={card}></BilCard>)}
        </div>
      </div>

      <WhyChooseSection></WhyChooseSection>
      {/* statistics */}
      <TrustStatistics></TrustStatistics>
    </div>
  );
};

export default Home;
