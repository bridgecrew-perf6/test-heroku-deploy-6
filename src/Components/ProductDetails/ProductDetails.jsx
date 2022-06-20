import { Box, Breadcrumbs, Container, Link, Paper, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productContext } from '../../contexts/productsContext';
import Loader from '../Loader/Loader';


const ProductDetails = () => {
    const { getOneProduct, oneProduct } = useContext(productContext)
    const params = useParams()
    const {id} = useParams()
    useEffect(() => {
        getOneProduct(id)
    }, [])

    return (
        <> 
        <Breadcrumbs aria-label='breadcrumb'>
            <Link underline='hover' color="inherit" href="/">
            Shop
            </Link>
            <Link
            underline='hover'
            color='inherit'
            href='/products'> 
            Products
            </Link>
            <Typography color="GrayText.primary"> Info </Typography>
        </Breadcrumbs>
        <Container>
            {oneProduct ? <Box display={"flex"} flexDirection={'column'} alignItems={"center"} paddingTop={"40px"} textAlign={'center'}>
                <Paper style={{width: '40%'}} elevation={3}>
                    <img style={{borderRadius: '5px'}} src={oneProduct.image} width="100%" alt='product-photo' />
                </Paper>
                <Typography variant='h5'>{oneProduct.title}</Typography>
                <Typography style={{maxWidth: '400px'}} variant='h5'>{oneProduct.description}</Typography>
                <Typography variant='h5'>{oneProduct.price}</Typography>
            </Box> : <Loader/>}
        </Container>
        </>
    );
};

export default ProductDetails;