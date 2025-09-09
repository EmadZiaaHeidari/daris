"use client";
import { motion } from "framer-motion";
import { CreditCard, Shield, FileText, Users } from "lucide-react";

export default function TravelServices() {

  const services = [
    { title: "سفر کارت", icon: <CreditCard className="w-8 h-8 text-orange-500" /> },
    { title: "بیمه مسافرتی", icon: <Shield className="w-8 h-8 text-orange-500" /> },
    { title: "ویزا سفر", icon: <FileText className="w-8 h-8 text-orange-500" /> },
    { title: "تور گروهی", icon: <Users className="w-8 h-8 text-orange-500" /> }
  ];

  return (
    <div>
      <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-700 w-full flex justify-center items-center rounded-md my-8 min-h-[180px] p-8">
        <div className=" mx-auto">
          <div className="flex flex-col lg:flex-row md:items-center md:justify-between gap-10">
            <div className="text-center md:text-right">
              <h1 className="text-3xl font-extrabold text-white tracking-wide drop-shadow">
                سایر خدمات <span className="text-orange-200">داریــــــــس</span>
              </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="group flex flex-row items-center justify-center gap-3 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg py-4 px-20 text-center border border-gray-100"
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 140, damping: 16, mass: 0.9 }}
                >
                  <motion.div
                    className="flex items-center justify-center p-2 rounded-full bg-orange-100"
                    whileHover={{ scale: 1.15, rotate: 2 }}
                    transition={{ type: "spring", stiffness: 180, damping: 14 }}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-base font-semibold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
