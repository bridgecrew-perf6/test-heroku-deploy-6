import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../contexts/cartContext";
import { productContext } from "../../contexts/productsContext";
import { authContext } from "../../contexts/authContext";

const ProductCard = ({ item }) => {
  const { admin } = useContext(authContext);

  const navigate = useNavigate();
  const { deleteProduct } = useContext(productContext);
  const { addProductToCart, checkProductInCart } = useContext(cartContext);
  const [checkProduct, setCheckProduct] = useState(checkProductInCart(item));
  return (
    <Card sx={{ maxWidth: 300, margin: "10px" }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="500"
        image={item.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.description.length > 20
            ? `${item.description.slice(0, 20)}...`
            : item.description}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {item.price}
        </Typography>
      </CardContent>
      <CardActions>
        {admin ? (
          <>
            <Button size="small" onClick={() => deleteProduct(item.id)}>
              <DeleteIcon />
            </Button>
            <Button size="small" onClick={() => navigate(`/edit/${item.id}`)}>
              <EditIcon />
            </Button>
          </>
        ) : null}

        <Button
          onClick={() => {
            addProductToCart(item);
            setCheckProduct(checkProductInCart(item));
          }}
          size="small">
          <AddShoppingCartIcon color={checkProduct ? "success" : "primary"} />
        </Button>
        <Button size="small" onClick={() => navigate(`/products/${item.id}`)}>
          <MoreHorizIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
