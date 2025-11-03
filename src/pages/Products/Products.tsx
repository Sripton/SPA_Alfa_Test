import {
  Stack,
  Container,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Pagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/productStore";
import { fetchProducts } from "../../api/apiProducts";
import { setProducts } from "../../actions/productActions";
export default function Products() {
  const [query, setQuery] = useState("");
  const items = useSelector<RootState>((store) => store.products.items);
  const dispatch = useDispatch<AppDispatch>();

  const PAGE_SIZE = 12;

  const load = async (opts?: { q?: string; page?: number }) => {
    try {
      const currentPage = opts?.page ?? page; // используем переданную страницу или текущую из состояния
      const skip = (currentPage - 1) * PAGE_SIZE;
      const response = await fetchProducts(
        PAGE_SIZE,
        skip,
        opts?.q ?? (query || undefined)
      );
      dispatch(setProducts(response.products));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void load({ page: 1 });
  }, []);
  console.log("items", items);
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
        <TextField fullWidth size="small" label="Поиск по товарам"></TextField>
        <Button variant="contained">Найти</Button>
      </Stack>

      <>
        <Grid container spacing={4}>
          {items?.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3,
                }}
              >
                <CardMedia
                  component="img"
                  image={product.thumbnail}
                  alt={product.title}
                  sx={{ objectFit: "cover" }}
                ></CardMedia>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography>{product.title}</Typography>
                  <Typography>{product.brand}</Typography>
                  <Typography>{product.price}</Typography>
                  <Typography>{product.rating}</Typography>
                  <Button sx={{ mt: 2 }} variant="outlined">
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={10} // при желании подставь Math.ceil(total / PAGE_SIZE)
            color="primary"
          />
        </Box>
      </>
    </Container>
  );
}
