import { courseService } from "@/services/courseService";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function EditCoursePage({ params }) {
  const { id } = params;
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await courseService.updateCourse(id, { title, description });

      toast.success("Ders başarıyla güncellendi.");
      router.push("/courses");
    } catch (error) {
      toast.error("Güncelleme sırasında bir hata oluştu.");
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mt: 2 }}
      display="flex"
      flexDirection="column"
      maxWidth={400}
    >
      <TextField
        label="Ders Adı"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Ders Açıklaması"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <Box mt={2}>
        <Button type="submit" variant="contained">
          Güncelle
        </Button>
      </Box>
    </Box>
  );
}
