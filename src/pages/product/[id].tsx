import { useRouter } from "next/router";
import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from "../../styles/pages/product";
import { GetStaticProps } from "next";
import { stripe } from "../../lib/stripe";

export default function Product() {
  const { query } = useRouter();

  return (
    <ProductContainer>
      <ImageContainer></ImageContainer>

      <ProductDetails>
        <h1>Camiseta X</h1>
        <span>R$ 79,90</span>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est dolorum
          natus, perspiciatis laborum omnis dicta quod sapiente, nihil tenetur,
          fuga eos quia ad a accusamus necessitatibus voluptas voluptates atque
          doloribus?
        </p>
        <button>Compre agora</button>
      </ProductDetails>
    </ProductContainer>
  );
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  const productId = params?.id;

  const product = await stripe.products.retrieve(productId, {
    expand: ["default_price"],
  });

  return {
    props: {},
    revalidate: 60 * 60 * 1, // 1 hour
  };
};
