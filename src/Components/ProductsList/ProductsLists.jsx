import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Link,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authContext } from "../../contexts/authContext";
import { productContext } from "../../contexts/productsContext";
import Filters from "../Filter/Filters";
import ProductCard from "../ProductCard/ProductCard";

const ProductsLists = () => {
  const { admin } = useContext(authContext);
  const { getProducts, products, pages } = useContext(productContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(
    searchParams.get("q") ? searchParams.get("q") : ""
  );
  const [price, setPrice] = useState([1, 10000]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setSearchParams({
      q: search,
      price_gte: price[0],
      price_lte: price[1],
      _page: page,
      _limit: 3,
    });
  }, [search, price, page]);

  useEffect(() => {
    getProducts();
  }, [searchParams]);

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Shop
        </Link>
        <Link underline="hover" color="inherit" href="/products">
          Products
        </Link>
        <Typography color="GrayText.primary">Add</Typography>
      </Breadcrumbs>

      <Container>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}>
          {admin ? (
            <Button
              variant="outlined"
              style={{ margin: "30px" }}
              onClick={() => navigate("/add-product")}>
              +
            </Button>
          ) : null}

          <Filters
            search={search}
            setSearch={setSearch}
            price={price}
            setPrice={setPrice}
          />
        </div>
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          padding={"30px"}>
          {products.map(item => (
            <ProductCard key={item.id} item={item} />
          ))}
        </Box>
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            page={page}
            count={isNaN(pages) ? 0 : pages}
            variant="outlined"
            shape="rounded"
            onChange={(e, value) => setPage(value)}
          />
        </Box>
      </Container>
    </>
  );
};

export default ProductsLists;
