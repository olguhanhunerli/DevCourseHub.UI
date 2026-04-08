import { Toaster } from "sonner";
import "./globals.css";
import { CoursesProvider } from "@/context/CourseProvider";
import Navbar from "./components/Navbar";
import { AuthProvider } from "@/context/AuthProvider";
import { Box, Container } from "@mui/material";
import CategorySidebar from "./components/CategorySideBar";

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

            <Container maxWidth="xl" sx={{ py: 4 }}>
              <Box sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}>
                <CategorySidebar />
                <Box sx={{ flex: 1, minWidth: 0 }}>{children}</Box>
              </Box>
            </Container>

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
