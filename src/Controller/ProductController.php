<?php


namespace ExampleApp\Controller;


use Laminas\Diactoros\ServerRequest;

class ProductController extends BaseController
{
    public function show(ServerRequest $request, $productSlug) {
        $slug = $request->getAttribute('slug');
        $product = $this->getProductBySlug($slug);

        if (!$product) {
            echo '404';
            die();
        }

        return $this->render('product.html.twig', [
            'product' => $product,
        ]);
    }

    /**
     * @param $slug
     * @return mixed|null
     */
    private function getProductBySlug($slug) {
        $products = json_decode(file_get_contents(dirname(__DIR__).'/home_products.json'));

        foreach ($products as $product) {

            if ($product->slug === $slug) {
                return $product;
            }
        }

        return null;
    }
}
