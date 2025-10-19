import React from 'react';
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaBoxesPacking } from "react-icons/fa6";
import { IoStatsChart } from "react-icons/io5";
import { BiSolidBank } from "react-icons/bi";
import { IoPieChart } from "react-icons/io5";
import { FaBoxes } from "react-icons/fa";
const DashboardBoxes = () => {
    return (
        <Swiper
            slidesPerView={4}
            spaceBetween={10}
            navigation={true}
            modules={[Navigation]}
            className="dashboardBoxesSlider"
        >
            <SwiperSlide>
                <div className="box p-5  bg-[#3872fa] cursor-pointer hover:bg-[#3892fa] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                    <FaBoxesPacking className="text-[50px] text-white" />
                    <div className="info w-[82%] text-white">
                        <h3>New Orders</h3>
                        <b>1,390</b>
                    </div>
                    <IoStatsChart className="text-[60px] text-white" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="box bg-[#10b981]  p-5 cursor-pointer hover:bg-[#10c991] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                    <IoPieChart className="text-[50px] text-white" />
                    <div className="info w-[70%] text-white">
                        <h3>Sales</h3>
                        <b>$1,390</b>
                    </div>
                    <IoStatsChart className="text-[60px] text-white" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="box bg-[#7928ca]  p-5 cursor-pointer hover:bg-[#7929de] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                    <BiSolidBank className="text-[50px] text-white" />
                    <div className="info w-[70%] text-white">
                        <h3>Revenue</h3>
                        <b>$1,390</b>
                    </div>
                    <IoStatsChart className="text-[60px] text-white" />
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="box p-5 bg-[#5b89f0] cursor-pointer hover:bg-[#5c98f0] rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4">
                    <FaBoxes className="text-[50px] text-white" />
                    <div className="info w-[82%] text-white">
                        <h3>Total Products</h3>
                        <b>1,390</b>
                    </div>
                    <IoStatsChart className="text-[60px] text-white" />
                </div>
            </SwiperSlide>

        </Swiper>
    );
}

export default DashboardBoxes;