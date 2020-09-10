<?php

use ExampleApp\Hello\HelloWorld;
use Laminas\Diactoros\Response;
use function DI\create;
use function DI\get;

$params = include __DIR__ . '/config/container.php';

$config = [];

foreach ($params['controllers'] as $controllerAlias => $controllerDefinition) {
    $getArguments = [];

    foreach($controllerDefinition['arguments'] as $argumentName => $argumentValue) {
        $getArguments[] = get($argumentName);
    }

    $getArguments[] = get('Response');

    $config[$controllerDefinition['class']] = create($controllerDefinition['class'])->constructor(...$getArguments);

    $config = array_merge(
        $config,
        $controllerDefinition['arguments'],
        [
            'Response' => function() {
                return new Response();
            }
        ]
    );
}

return $config;