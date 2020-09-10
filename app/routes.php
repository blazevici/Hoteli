<?php

use ExampleApp\Hello\HelloWorld;
use FastRoute\RouteCollector;
use function FastRoute\simpleDispatcher;

$params = include __DIR__ . '/config/container.php';

return simpleDispatcher(function(RouteCollector $routeCollector) use ($params) {
    foreach ($params['routes'] as $routeName => $routeDefinition) {
        $routeCollector->addRoute($routeDefinition['method'], '/'.$routeName, $routeDefinition['handler']);
    }
});