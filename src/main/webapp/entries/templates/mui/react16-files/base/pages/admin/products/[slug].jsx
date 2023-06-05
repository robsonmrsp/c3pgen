import { useState } from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import * as yup from "yup";
import { H3 } from "components/Typography";
import { ProductForm } from "pages-sections/admin";
import DashboardLayout from "components/layouts/admin";
// import api from "utils/__api__/products";

// =============================================================================
EditProduct.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
// =============================================================================

const INITIAL_VALUES = {
  name: "",
  tags: "",
  stock: "",
  price: 0,
  category: [],
  sale_price: "",
  description: "",
};

// form field validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("required"),
  category: yup.array().min(1).required("required"),
  description: yup.string().required("required"),
  stock: yup.number().required("required"),
  price: yup.number().required("required"),
  sale_price: yup.number().required("required"),
  tags: yup.string().required("required"),
});
export default function EditProduct() {
  const { query } = useRouter();
  const [product, setProduct] = useState({
    ...INITIAL_VALUES,
  });

  // useEffect(() => {
  //   api.getProduct(query.slug as string).then((data) => {
  //     setProduct((state) => ({
  //       ...state,
  //       name: data.title,
  //       price: data.price,
  //       category: data.categories,
  //     }));
  //   });
  // }, [query.slug]);

  const handleFormSubmit = () => {};
  return (
    <Box py={4}>
      <H3 mb={2}>Edit Product</H3>

      <ProductForm
        initialValues={product}
        validationSchema={validationSchema}
        handleFormSubmit={handleFormSubmit}
      />
    </Box>
  );
}
