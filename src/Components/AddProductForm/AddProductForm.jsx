import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { productContext } from "../../contexts/productsContext";

// title, description, price, image
const AddProductFrom = () => {
  const { createProduct } = useContext(productContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  function handleValues() {
    let newProduct = {
      title,
      description,
      price: +price,
      image,
    };
    if (!title.trim() || !description.trim() || !price || !image.trim()) {
      alert("Use your power to fill all gaps");
      return;
    }
    createProduct(newProduct);
    navigate("/products");
  }

  return (
    <Container maxWidth="sm">
      <Box
        padding={"30px"}
        display={"flex"}
        flexDirection={"column"}
        textAlign={"center"}>
        <Typography variant="h4" component="h2">
          New Product
        </Typography>

        <TextField
          value={title}
          onChange={e => setTitle(e.target.value)}
          style={{ margin: "10px" }}
          label="Title"
          variant="standard"
        />

        <TextField
          value={description}
          onChange={e => setDescription(e.target.value)}
          style={{ margin: "10px" }}
          label="Description"
          variant="standard"
        />

        <TextField
          type="number"
          value={price}
          onChange={e => setPrice(+e.target.value)}
          style={{ margin: "10px" }}
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
          Add product
        </Button>
      </Box>
    </Container>
  );
};

export default AddProductFrom;
