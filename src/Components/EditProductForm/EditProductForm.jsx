import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { productContext } from "../../contexts/productsContext";
import Loader from "../Loader/Loader";

// title, description, price, image
const EditProductForm = () => {
  const { getOneProduct, oneProduct, updatedProduct } =
    useContext(productContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  function handleValues() {
    let editedProduct = {
      title,
      description,
      price: +price,
      image,
    };
    if (!title.trim() || !description.trim() || !price || !image.trim()) {
      alert("Use your power to fill all gaps");
      return;
    }
    updatedProduct(id, editedProduct);
    navigate("/products");
  }
  useEffect(() => {
    getOneProduct(id);
  }, []);

  useEffect(() => {
    if (oneProduct) {
      setTitle(oneProduct.title);
      setDescription(oneProduct.description);
      setPrice(oneProduct.price);
      setImage(oneProduct.image);
    }
  }, [oneProduct]);

  return oneProduct ? (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Shop
        </Link>
        <Link underline="hover" color="inherit" href="/products">
          Products
        </Link>
        <Typography color="GrayText.primary"> Edit </Typography>
      </Breadcrumbs>

      <Container maxWidth="sm">
        <Box
          padding={"30px"}
          display={"flex"}
          flexDirection={"column"}
          textAlign={"center"}>
          <Typography variant="h4" component="h2">
            Edit Product
          </Typography>

          <TextField
            value={title}
            onChange={e => setTitle(e.target.value)}
            style={{ margin: "10px" }}
            id="standard-basic"
            label="Title"
            variant="standard"
          />

          <TextField
            value={description}
            onChange={e => setDescription(e.target.value)}
            style={{ margin: "10px" }}
            id="standard-basic"
            label="Description"
            variant="standard"
          />

          <TextField
            type="number"
            value={price}
            onChange={e => setPrice(+e.target.value)}
            style={{ margin: "10px" }}
            id="standard-basic"
            label="Price"
            variant="standard"
          />

          <TextField
            value={image}
            onChange={e => setImage(e.target.value)}
            style={{ margin: "10px" }}
            id="standard-basic"
            label="Image"
            variant="standard"
          />

          <Button
            onClick={handleValues}
            style={{ margin: "10px" }}
            variant="contained"
            color="success">
            Save
          </Button>
        </Box>
      </Container>
    </>
  ) : (
    <Loader />
  );
};

export default EditProductForm;
