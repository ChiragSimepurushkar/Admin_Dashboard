import React from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation,Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Recommended Icons based on previous snippets
import { FiPieChart } from "react-icons/fi"; // For Users
import { GoGift } from "react-icons/go"; // For Orders
import { RiProductHuntLine } from "react-icons/ri"; // For Products
import { IoStatsChartSharp } from "react-icons/io5"; // Secondary Icon
import { MdOutlineReviews } from "react-icons/md"; // For Reviews
import { Users2Icon } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/autoplay';

const DashboardBoxes = (props) => {
    return (
        <Swiper
            spaceBetween={10}
            navigation={true}
            modules={[Navigation, Autoplay]}
            breakpoints={{
                0: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
                640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                },
                1024: {
                    slidesPerView: 4,
                    spaceBetween: 10,
                },
            }}
            autoplay={{
                delay: 2000,
                disableOnInteraction: false,
            }}
            loop={true}
            className="dashboardBoxesSlider"
        >
            {/* Total Users */}
            <SwiperSlide>
                <div className="box h-[125px] bg-[#10b981] p-5 py-6 cursor-pointer hover:bg-[#289974] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                    <Users2Icon className="text-[90px] text-[#fff]" />
                    <div className="info w-[70%]">
                        <h3 className="text-white">Total Users</h3>
                        <b className="text-white text-[20px]">{props?.users}</b>
                    </div>
                    <IoStatsChartSharp className="text-[50px] text-[#fff]" />
                </div>
            </SwiperSlide>

            {/* Total Orders */}
            <SwiperSlide>
                <div className="box h-[125px] bg-[#3872fa] p-5 py-6 cursor-pointer hover:bg-[#346ae8] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                    <GoGift className="text-[40px] text-[#fff]" />
                    <div className="info w-[70%]">
                        <h3 className="text-white">Total Orders</h3>
                        <b className="text-white text-[20px]">{props?.orders}</b>
                    </div>
                    <FiPieChart className="text-[50px] text-[#fff]" />
                </div>
            </SwiperSlide>

            {/* Total Products */}
            <SwiperSlide>
                <div className="box h-[125px] p-5 bg-[#312be1d8] py-6 cursor-pointer hover:bg-[#423eadd8] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                    <RiProductHuntLine className="text-[40px] text-[#fff]" />
                    <div className="info w-[70%]">
                        <h3 className="text-white">Total Products</h3>
                        <b className="text-white text-[20px]">{props?.products}</b>
                    </div>
                    <IoStatsChartSharp className="text-[50px] text-[#fff]" />
                </div>
            </SwiperSlide>

            {/* Total Reviews */}
            <SwiperSlide>
                <div className="box h-[125px] bg-[#7928ca] p-5 py-6 cursor-pointer hover:bg-[#7929de] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                    <MdOutlineReviews className="text-[40px] text-[#fff]" />
                    <div className="info w-[70%]">
                        <h3 className="text-white">Total Reviews</h3>
                        <b className="text-white text-[20px]">{props?.reviews}</b>
                    </div>
                    <IoStatsChartSharp className="text-[50px] text-[#fff]" />
                </div>
            </SwiperSlide>
        </Swiper>
    );
}

export default DashboardBoxes;