import { useState } from "react";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { currency } from "lib";
import { Box, Button, IconButton, Rating, styled } from "@mui/material";
import { Favorite, FavoriteBorder, RemoveRedEye } from "@mui/icons-material";
import LazyImage from "components/LazyImage";
import { FlexRowCenter } from "components/flex-box";
import { H4, Paragraph, Small } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import ProductViewDialog from "components/products/ProductViewDialog";
// custom styled components
const Card = styled(Box)(({ theme }) => ({
  borderRadius: "3px",
  transition: "all 0.3s",
  backgroundColor: theme.palette.common.white,
  border: `1px solid ${theme.palette.grey[100]}`,
  ":hover": {
    "& .product-actions": {
      right: 5,
    },
    "& img": {
      transform: "scale(1.1)",
    },
    border: `1px solid ${theme.palette.dark.main}`,
  },
}));
const CardMedia = styled(Box)({
  width: "100%",
  maxHeight: 300,
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  "& img": {
    transition: "0.3s",
  },
});
const AddToCartButton = styled(IconButton)({
  top: 10,
  right: -40,
  position: "absolute",
  transition: "right 0.3s .1s",
});
const FavouriteButton = styled(IconButton)({
  top: 45,
  right: -40,
  position: "absolute",
  transition: "right 0.3s .2s",
});

// ==============================================================

// ==============================================================

const ProductCard20 = ({ product }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { state, dispatch } = useAppContext();
  const [openDialog, setOpenDialog] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const cartItem = state.cart.find((item) => item.slug === product.slug);

  // handle favourite
  const handleFavorite = () => setIsFavorite((fav) => !fav);

  // handle add to cart
  const handleAddToCart = (product) => {
    const payload = {
      id: product.id,
      slug: product.slug,
      name: product.title,
      price: product.price,
      imgUrl: product.thumbnail,
      qty: (cartItem?.qty || 0) + 1,
    };
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload,
    });
    enqueueSnackbar("Added to Cart", {
      variant: "success",
    });
  };
  return (
    <Card height="100%">
      <CardMedia>
        <Link href={`/product/${product.slug}`}>
          <LazyImage
            width={300}
            height={300}
            alt="category"
            className="product-img"
            src={product.thumbnail}
          />
        </Link>

        <AddToCartButton
          className="product-actions"
          onClick={() => setOpenDialog(true)}
        >
          <RemoveRedEye color="disabled" fontSize="small" />
        </AddToCartButton>

        <FavouriteButton className="product-actions" onClick={handleFavorite}>
          {isFavorite ? (
            <Favorite color="primary" fontSize="small" />
          ) : (
            <FavoriteBorder color="disabled" fontSize="small" />
          )}
        </FavouriteButton>
      </CardMedia>

      <ProductViewDialog
        openDialog={openDialog}
        handleCloseDialog={() => setOpenDialog(false)}
        product={{
          id: product.id,
          slug: product.slug,
          title: product.title,
          price: product.price,
          imgGroup: [product.thumbnail, product.thumbnail],
        }}
      />

      <Box p={2} textAlign="center">
        <Paragraph>{product.title}</Paragraph>
        <H4 fontWeight={700} py={0.5}>
          {currency(product.price)}
        </H4>

        <FlexRowCenter gap={1} mb={2}>
          <Rating
            name="read-only"
            value={product.rating || 4}
            readOnly
            sx={{
              fontSize: 14,
            }}
          />
          <Small fontWeight={600} color="grey.500">
            ({product.reviews.length})
          </Small>
        </FlexRowCenter>

        <Button
          fullWidth
          color="dark"
          variant="outlined"
          onClick={() => handleAddToCart(product)}
        >
          Add To Cart
        </Button>
      </Box>
    </Card>
  );
};
export default ProductCard20;
