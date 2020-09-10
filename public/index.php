<?php
declare(strict_types=1);

use DI\ContainerBuilder;
use Laminas\Diactoros\ServerRequestFactory;
use Middlewares\FastRoute;
use Middlewares\RequestHandler;
use Narrowspark\HttpEmitter\SapiEmitter;
use Relay\Relay;

require_once dirname(__DIR__) . '/vendor/autoload.php';

$configFile = dirname(__DIR__) . '/app/config.php';

$GLOBALS['viewDir'] = __DIR__ . '/../src/views/templates';
$GLOBALS['layoutDir'] = __DIR__ . '/../src/views/layouts';
$GLOBALS['smartyCacheDir'] = __DIR__ . '/../var/cache';
$GLOBALS['smartyCompileDir'] = __DIR__ . '/../var/compile';
$GLOBALS['smartyConfigsDir'] = __DIR__ . '/../var/config';
$GLOBALS['bladeCacheDir'] = __DIR__ . '/../var/cache';
$GLOBALS['styleDir'] = __DIR__ . '/../src/views/styles';

$containerBuilder = new ContainerBuilder();
$containerBuilder->useAutowiring(false);
$containerBuilder->useAnnotations(false);
$containerBuilder->addDefinitions($configFile);

try {
    $container = $containerBuilder->build();
} catch (Exception $e) {
    var_dump($e->getMessage());
}

$routes = include dirname(__DIR__) . '/app/routes.php';

$middlewareQueue = [];
$middlewareQueue[] = new FastRoute($routes);
$middlewareQueue[] = new RequestHandler($container);

$requestHandler = new Relay($middlewareQueue);
$response = $requestHandler->handle(ServerRequestFactory::fromGlobals());

$emitter = new SapiEmitter();
$emitter->emit($response);