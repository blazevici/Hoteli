<?php

namespace ExampleApp\Controller;

use ExampleApp\Library\PHPTemplateRenderer;
use Jenssegers\Blade\Blade;
use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use Twig\Loader\FilesystemLoader;

class HomeController extends BaseController
{
    public function index()
    {
        $products = json_decode(file_get_contents(dirname(__DIR__).'/home_products.json'));
        $news = json_decode(file_get_contents(dirname(__DIR__).'/home_products.json'));
        $reviews = json_decode(file_get_contents(dirname(__DIR__).'/home_products.json'));

        return $this->render('home.html.twig', [
            'products' => $products,
            'news' => $news,
            'reviews' => $reviews
        ]);
    }

    public function dashboard()
    {
        return $this->render('dashboard.html.twig', []);
    }


    public function create()
    {
        return [];
    }

    public function show()
    {
        return $this->respondWithSuccess([]);
    }
}
