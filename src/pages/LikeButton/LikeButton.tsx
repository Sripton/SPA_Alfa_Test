import React from "react";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector, useStore } from "react-redux";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { toggleLike } from "../../redux/actions/productActions";
type Props = {
  id: number | string;
  size?: "small" | "medium" | "large"; // совместимые размеры
  stopNav?: boolean; // если true — предотвращаем переход по ссылке-родителю
};

export default function LikeButton({
  id,
  size = "medium",
  stopNav = true,
}: Props) {
  const dispatch = useDispatch();
  const rawIds = useSelector((store: any) => store.products?.likedIds ?? []);
  const likedIds: number[] = rawIds
    .map((x: any) => Number(x))
    .filter(Number.isFinite);
  const numericID = Number(id);
  const liked = likedIds.includes(numericID);

  const handleClick = (e: React.MouseEvent) => {
    // типизация события клика для TypeScript
    if (stopNav) {
      e.preventDefault(); // отменяем стандартное действие браузера
      e.stopPropagation(); // останавливаем всплытие события к родительским элементам
    }
    dispatch<any>(toggleLike(numericID));
  };

  const sameStore = useStore() === (window as any).appStore;
  console.log("[LikeButton] same store?", sameStore);
  return (
    <IconButton
      size={size}
      onClick={handleClick}
      sx={{ color: liked ? "error.main" : "text.secondary" }}
    >
      {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
    </IconButton>
  );
}
