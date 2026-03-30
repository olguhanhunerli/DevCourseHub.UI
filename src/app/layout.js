import { Toaster } from "sonner";
import "./globals.css";
import { CoursesProvider } from "@/context/CourseProvider";
import Navbar from "./components/Navbar";
import { AuthProvider } from "@/context/AuthProvider";
export const metadata = {
  title: "DevCourseHub",
  description: "Online learning platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <AuthProvider>
          <CoursesProvider>
            <Navbar />
            {children}
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "red",
                  color: "#fff",
                  border: "1px solid #334155",
                },
              }}
            />
          </CoursesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
