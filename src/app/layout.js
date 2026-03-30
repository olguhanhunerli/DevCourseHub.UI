import { Toaster } from "sonner";
import "./globals.css";
import { CoursesProvider } from "@/context/CourseProvider";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "DevCourseHub",
  description: "Online learning platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <CoursesProvider>
          <Navbar />
          {children}
          <Toaster position="top-right" richColors />
        </CoursesProvider>
      </body>
    </html>
  );
}
