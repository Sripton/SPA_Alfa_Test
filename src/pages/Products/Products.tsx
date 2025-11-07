import React, { useEffect, useState } from "react";
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
  CardActionArea,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store/productStore";
import { loadProducts } from "../../redux/actions/productActions";
import type { Product } from "../../redux/types/productTypes";
import LikeButton from "../LikeButton/LikeButton";
import { removeProduct } from "../../redux/actions/productActions";

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

  const onRemove = (id: number) => dispatch(removeProduct(id));
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
        <IconButton
          aria-label="Создать товар"
          component={Link}
          to={`/create-product`}
          sx={{
            position: { xs: "static" },
            right: { sm: 10 },
            ml: { xs: "auto" }, // чтобы на xs прижалась вправо
            bgcolor: "primary.main",
            color: "primary.contrastText",
            borderRadius: 2,
            boxShadow: "0 6px 16px rgba(0,0,0,0.16)",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          <CreateIcon />
        </IconButton>
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
                  cursor: "pointer",
                }}
              >
                <CardActionArea
                  component={Link}
                  to={`/products/${product.id}`}
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Box sx={{ position: "relative" }}>
                    <CardMedia
                      component="img"
                      image={product.thumbnail}
                      alt={product.title}
                      sx={{
                        objectFit: "cover",
                        height: 180,
                        width: "100%",
                      }}
                    ></CardMedia>
                  </Box>

                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.5,
                      flexGrow: 1,
                      width: "100%",
                      pt: 2,
                      pb: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      component="span"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        lineHeight: 1.3,
                        minHeight: "2.6em",
                        fontWeight: 500,
                      }}
                    >
                      {product.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.6,
                        minHeight: "1.6em",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {product.brand}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: "auto",
                        pt: 1,
                      }}
                    >
                      <Typography variant="subtitle2">
                        {product.price}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {product.rating}
                      </Typography>
                    </Box>
                  </CardContent>
                </CardActionArea>
                <Box
                  sx={{
                    px: 2,
                    pb: 2,
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <LikeButton id={product.id} size="small" stopNav />
                  <DeleteIcon
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onRemove(product.id);
                    }}
                    sx={{ color: "#ee9595", cursor: "pointer", ml: "auto" }}
                  />
                </Box>
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
