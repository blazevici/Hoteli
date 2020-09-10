<?php

namespace ExampleApp\Controller;

use Psr\Http\Message\ResponseInterface;
use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Error\SyntaxError;
use Twig\Extension\DebugExtension;
use Twig\Loader\FilesystemLoader;

class BaseController
{
    protected $response;

    public function __construct(
        ResponseInterface $response
    )
    {
        $this->response = $response;
    }

    protected function render(string $template, array $data = [])
    {
        $this->response->withHeader('Content-Type', 'text/html');

        $loader = new FilesystemLoader([$GLOBALS['viewDir'], $GLOBALS['layoutDir']]);
        $twig = new Environment($loader, [
            'debug' => true,
        ]);

        $twig->addExtension(new DebugExtension());

        try {
            $this->response->getBody()->write(
                $twig->render($template, $data)
            );
        } catch (LoaderError $e) {
            $this->response->getBody()->write($e->getMessage());
        } catch (RuntimeError $e) {
            $this->response->getBody()->write($e->getMessage());
        } catch (SyntaxError $e) {
            $this->response->getBody()->write($e->getMessage());
        }

        return $this->response;
    }

    protected function respondWithSuccess($data, $statusCode = 200)
    {
        return $this->response
            ->setStatusCode($statusCode)
            ->withHeader('Content-Type', 'text/html')
            ->getBody()
            ->write(json_encode([
                'data' => $data
            ]));
    }

    protected function respondWithError(array $errors = [], $statusCode = 400)
    {
        return $this->response
            ->setStatusCode($statusCode)
            ->withHeader('Content-Type', 'text/html')
            ->getBody()
            ->write(json_encode([
                'errors' => $errors
            ]));
    }
}
