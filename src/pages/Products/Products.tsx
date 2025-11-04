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
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/productStore";
import { loadProducts } from "../../actions/productActions";
import type { Product } from "../../types/productTypes";
export default function Products() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector<RootState, Product[]>(
    (store) => store.products.items
  );
  const total = useSelector<RootState, number>((store) => store.products.total);

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 12;

  const fetchPage = async (opts?: { query?: string; page?: number }) => {
    try {
      const q = opts?.query ?? (query || undefined);
      const p = opts?.page ?? page;
      await dispatch(loadProducts(PAGE_SIZE, p, q) as any);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void fetchPage({ page: 1 });
  }, []);

  // два аргумента: первый — событие (оно не нужно), второй — номер выбранной страницы.
  const handlePageChange = async (_: unknown, value: number) => {
    setPage(value); // setPage запускает обновление состояния
    await fetchPage({ page: value }); // fetchPage сразу получает нужный номер страницы через параметр value
  };

  const handleSearch = async () => {
    setPage(1);
    await fetchPage({ query: query, page: 1 });
  };
  const pagesCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  console.log("items", items);
  console.log("query", query);
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          size="small"
          label="Поиск по товарам"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        ></TextField>
        <Button variant="contained" onClick={handleSearch}>
          Найти
        </Button>
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
                  <Button
                    component={Link}
                    to={`/products/${product.id}`}
                    sx={{ mt: 2 }}
                    variant="outlined"
                  >
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            page={page}
            count={pagesCount}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      </>
    </Container>
  );
}
