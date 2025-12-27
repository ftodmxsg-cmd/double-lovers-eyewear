
/**
 * Shopify Storefront API integration
 * Uses environment variables for store configuration
 */

import { Product } from "../types";
import { PRODUCTS } from "../constants";

const SHOPIFY_STORE_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_API_VERSION = import.meta.env.VITE_SHOPIFY_API_VERSION || '2024-01';

const USE_MOCK_DATA = !SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN;

if (USE_MOCK_DATA) {
  console.warn('⚠️ Shopify credentials not configured. Using mock data. See README for setup instructions.');
}

// GraphQL queries
const PRODUCTS_QUERY = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          productType
          tags
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                priceV2 {
                  amount
                  currencyCode
                }
                availableForSale
              }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_QUERY = `
  query getProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      images(first: 5) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            priceV2 {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
    }
  }
`;

const CHECKOUT_CREATE_MUTATION = `
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

/**
 * Makes a GraphQL request to Shopify Storefront API
 */
async function shopifyFetch<T>(query: string, variables: Record<string, any> = {}): Promise<T> {
  const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
  
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  
  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
}

/**
 * Converts Shopify product data to our Product type
 */
function convertShopifyProduct(shopifyProduct: any): Product {
  const allImages = shopifyProduct.images.edges.map((edge: any) => edge.node.url);
  const firstVariant = shopifyProduct.variants.edges[0]?.node;
  
  // Extract color options from variants
  const colors = shopifyProduct.variants.edges
    .map((edge: any) => edge.node.title)
    .filter((title: string) => title !== 'Default Title');

  // Determine category based on product tags or type (fallback to 'Optical')
  // You may want to customize this logic based on your Shopify product organization
  const category = shopifyProduct.productType === 'Sunglasses' ? 'Sunglasses' : 
                   shopifyProduct.tags?.includes('collab') ? 'Collab' : 
                   'Optical';

  return {
    id: shopifyProduct.id,
    handle: shopifyProduct.handle,
    name: shopifyProduct.title,
    price: parseFloat(firstVariant?.priceV2?.amount || '0'),
    category: category as 'Optical' | 'Sunglasses' | 'Collab',
    images: allImages.length > 0 ? allImages : ['https://via.placeholder.com/800x1000?text=No+Image'],
    description: shopifyProduct.description || '',
    colors: colors.length > 0 ? colors : ['Standard'],
    variants: shopifyProduct.variants.edges.map((edge: any) => ({
      id: edge.node.id,
      title: edge.node.title,
      price: parseFloat(edge.node.priceV2?.amount || '0'),
      availableForSale: edge.node.availableForSale ?? true,
    })),
    availableForSale: firstVariant?.availableForSale ?? true,
  };
}

/**
 * Fetches products from Shopify or returns mock data
 */
export const fetchShopifyProducts = async (): Promise<Product[]> => {
  if (USE_MOCK_DATA) {
    // Return mock data with a simulated delay
    return new Promise((resolve) => {
      setTimeout(() => resolve(PRODUCTS), 500);
    });
  }

  try {
    const data = await shopifyFetch<{ products: { edges: Array<{ node: any }> } }>(
      PRODUCTS_QUERY,
      { first: 50 }
    );

    return data.products.edges.map(edge => convertShopifyProduct(edge.node));
  } catch (error) {
    console.error('Error fetching Shopify products:', error);
    console.warn('Falling back to mock data');
    return PRODUCTS;
  }
};

/**
 * Creates a Shopify checkout and redirects to checkout page
 */
export const createShopifyCheckout = async (variantId: string, quantity: number) => {
  if (USE_MOCK_DATA) {
    console.log(`Creating mock checkout for variant: ${variantId}, qty: ${quantity}`);
    alert("Mock mode: Redirecting to Shopify Secure Checkout...");
    return;
  }

  try {
    const data = await shopifyFetch<{
      checkoutCreate: {
        checkout: { webUrl: string };
        checkoutUserErrors: Array<{ message: string }>;
      };
    }>(CHECKOUT_CREATE_MUTATION, {
      input: {
        lineItems: [
          {
            variantId,
            quantity,
          },
        ],
      },
    });

    if (data.checkoutCreate.checkoutUserErrors.length > 0) {
      throw new Error(data.checkoutCreate.checkoutUserErrors[0].message);
    }

    // Redirect to Shopify checkout
    window.location.href = data.checkoutCreate.checkout.webUrl;
  } catch (error) {
    console.error('Error creating checkout:', error);
    alert(`Failed to create checkout: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
