import Image from "next/image";
import { Inter } from "next/font/google";
import { Dashboard } from "@/components/component/dashboard";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Dashboard/>
      <Toaster />
    </>
  );
}
