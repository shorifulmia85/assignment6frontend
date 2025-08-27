import { motion } from "framer-motion";
import { ProfileHeader } from "@/components/modules/Driver/Profile/ProfileHeader";
import ProfileTab from "@/components/modules/Driver/Profile/ProfileTab";
import ContactInfo from "@/components/modules/Driver/Profile/ContactInfo";
import VehicleInfo from "@/components/modules/Driver/Profile/VehicleInfo";
import Security from "@/components/modules/Driver/Profile/Security";
import { Tabs } from "@/components/ui/tabs";
import { useGetMeQuery } from "@/redux/features/userApi/userApi";
import Loading from "@/components/ui/Loading";

export default function DriverProfile() {
  const { data, isLoading } = useGetMeQuery(undefined);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="min-h-screen w-full">
      <div className="bg-background rounded-2xl mx-auto max-w-7xl px-4 py-8 md:py-10">
        {/* Profile Header  */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <ProfileHeader user={data?.data} />
        </motion.div>

        {/* Dynamic data for change tab  */}
        <Tabs defaultValue="contact" className="mt-6">
          <ProfileTab />

          {/* CONTACT */}
          <ContactInfo user={data?.data} />

          {/* VEHICLE */}
          <VehicleInfo vehicle={data?.data} />

          {/* SECURITY */}
          <Security />
        </Tabs>
      </div>
    </div>
  );
}
