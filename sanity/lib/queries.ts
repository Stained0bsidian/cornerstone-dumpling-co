export const allProductsQuery = `*[_type == "product" && defined(slug.current)] | order(order asc, name asc)`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0]`;
