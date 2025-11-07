import { Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Drawer,
  List,
  ListItem,
} from "@mui/material";
import "./app.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hydrateLikes } from "./redux/actions/productActions";
export default function App() {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Открытие/закрытие бокового меню
  const toggleDraweMenu = () => setOpenMenu((prev) => !prev);

  // Обработка кликов по пунктам меню
  const handleMenuClick = (text: string) => {
    if (text === "Products") {
      navigate("/products");
    } else if (text === "Create Product") {
      navigate("/create-product");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    dispatch<any>(hydrateLikes());
  }, []);

  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} disableGutters>
        {/* Верхняя панель навигации */}
        <Box
          sx={{
            px: 3,
            background:
              "linear-gradient(0deg,rgba(232, 232, 232, 1) 0%,rgba(250, 230, 250, 1) 100%);",
            height: "64px",
            width: "100%",
            zIndex: 1201,
            position: "fixed",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          }}
        />

        {/* Иконка-гамбургер для мобильного меню */}
        <div
          className={`menu-icon ${openMenu ? "iconActive" : ""}`}
          role="button"
          tabIndex={0}
          aria-label="Открыть меню"
          onClick={toggleDraweMenu}
        >
          <span />
        </div>

        {/* Боковая панель Drawer */}
        <Drawer
          anchor="left"
          open={openMenu}
          sx={{
            background:
              "linear-gradient(0deg,rgb(238, 216, 237) 0%,rgb(238, 201, 238) 100%);",
            opacity: "1",
          }}
          PaperProps={{
            sx: {
              background:
                "linear-gradient(0deg,rgba(232, 232, 232, 1) 0%,rgba(250, 230, 250, 1) 100%);",
              color: "#676565",
              width: 280,
              pt: 8,
              px: 2,
              opacity: "1",
            },
          }}
          onClose={toggleDraweMenu}
        >
          <List>
            {["Products", "Create Product"].map((text) => (
              <ListItem key={text} onClick={toggleDraweMenu}>
                <Button
                  sx={{
                    fontSize: "1rem",
                    fontFamily: "Tinos, serif",
                    textTransform: "uppercase",
                    justifyContent: "flex-start",
                    width: "100%",
                    color: "#676565",
                    "&:hover": { color: "#60a5fa", background: "transparent" },
                  }}
                  onClick={() => handleMenuClick(text)}
                >
                  {text}
                </Button>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Container>
      <Box sx={{ pt: 8 }}>
        <Outlet />
      </Box>
    </>
  );
}
