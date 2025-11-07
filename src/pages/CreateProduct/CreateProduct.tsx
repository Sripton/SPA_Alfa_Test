import React, { useRef, useState } from "react";
import type { Product } from "../../redux/types/productTypes";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store/productStore";
import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Form } from "react-router-dom";
import { createProduct } from "../../redux/actions/productActions";
type FormState = Omit<Product, "id">;
const urlTrue = /^https?:\/\/.+/i;
const initial: FormState = {
  title: "",
  description: "",
  price: 0,
  rating: 0,
  brand: "",
  category: "",
  thumbnail: "",
  images: [],
};

export default function CreateProduct() {
  const dispatch = useDispatch<AppDispatch>();
  const [form, setForm] = useState<FormState>(initial);
  const [imgInput, setImgInput] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  // React.ChangeEvent гарантия, что передаются только существующие поля
  const set =
    (field: keyof FormState) =>
    // событий изменения. <HTMLInputElement> событие от элемента <input>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setForm((prev) => ({
        ...prev,
        [field]:
          // Для числовых полей — "price" и "rating" — преобразуем строку в число
          field === "price" || field === "rating" ? Number(value) : value, // Для остальных полей оставляем исходную строку
      }));
    };

  const addImage = () => {
    const url = imgInput.trim();
    if (!url) return;
    if (!/^https?:\/\/.+/i.test(url)) {
      return;
    }
    setForm((prev) => ({ ...prev, images: [...prev.images, url] }));
    setImgInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formRef.current && !formRef.current.checkValidity()) {
      //  нативные подсказки браузера
      formRef.current.reportValidity();
      return;
    }
    const payload: Omit<Product, "id"> = form;
    dispatch(createProduct(payload));
    setForm(initial);
    setImgInput("");
  };
  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Название"
            value={form.title}
            onChange={set("title")}
            required
          />
          <TextField
            label="Описание"
            value={form.description}
            onChange={set("description")}
            required
            multiline
            minRows={3}
          />
          <TextField
            label="Бренд"
            value={form.brand}
            onChange={set("brand")}
            required
          />
          <TextField
            label="Категория"
            value={form.category}
            onChange={set("category")}
            required
          />
          <TextField
            type="number"
            label="Цена"
            value={form.price}
            onChange={set("price")}
            required
            inputProps={{ step: "0.01", min: 0.01 }}
          />
          <TextField
            type="number"
            label="Рейтинг (0–5)"
            value={form.rating}
            onChange={set("rating")}
            required
            inputProps={{ step: "0.1", min: 0, max: 5 }}
          />

          <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Button type="submit" variant="contained">
              Сохранить
            </Button>
          </Stack>
        </Stack>
      </Form>
    </Container>
  );
}
