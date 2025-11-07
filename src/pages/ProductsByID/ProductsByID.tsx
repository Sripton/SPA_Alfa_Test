import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Chip,
  Divider,
  Rating,
  Button,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store/productStore";
import type { Product } from "../../redux/types/productTypes";
import { useParams, Link } from "react-router-dom";
import { loadProduct } from "../../redux/actions/productActions";

export default function ProductsByID() {
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const numeric = Number(id);
  const product = useSelector<RootState, Product | null>(
    (store) => store.products.current
  );
  console.log("product", product);

  useEffect(() => {
    try {
      const run = async () => {
        if (id) {
          await dispatch(loadProduct(numeric));
        }
      };
      run();
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, numeric]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              height: "100%",
            }}
          >
            <CardMedia
              component="img"
              image={product?.thumbnail}
              alt={product?.title}
              sx={{ objectFit: "cover", maxHeight: 520 }}
            ></CardMedia>
          </Card>
        </Grid>
        <Grid item>
          <Card sx={{ height: "100%", borderRadius: 3 }}>
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
            >
              <Typography variant="h5">{product?.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {product?.description}
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 1, cursor: "pointer" }}
              >
                <Chip label={product?.brand} />
                <Chip variant="outlined" label={product?.category} />
              </Stack>

              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mt: 1 }}
              >
                <Typography variant="h6">{product?.price}</Typography>
                <Divider flexItem orientation="vertical" />
                <Stack direction="row">
                  <Rating
                    value={product?.rating}
                    precision={0.1}
                    readOnly
                  ></Rating>
                  <Typography variant="body2" color="text.secondary">
                    {product?.rating.toFixed(1)}
                  </Typography>
                </Stack>
              </Stack>
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button variant="contained">В корзину</Button>
                <Button variant="outlined" component={Link} to={`/products`}>
                  Назад к товарам
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
