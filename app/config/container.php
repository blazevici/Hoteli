<?php
return [
    'controllers' => [
        'hello_world_class' => [
            'class' => 'ExampleApp\Controller\HelloWorldController',
            'arguments' => []
        ],
        'home_class' => [
            'class' => 'ExampleApp\Controller\HomeController',
            'arguments' => []
        ],
        'product_class' => [
            'class' => 'ExampleApp\Controller\ProductController',
            'arguments' => []
        ]
    ],
    'routes' => [
        '' => [
            'handler' => ['ExampleApp\Controller\HomeController', 'index'],
            'method' => 'GET'
        ],
        'room/{slug}' => [
            'handler' => ['ExampleApp\Controller\ProductController', 'show'],
            'method' => 'GET'
        ],

    ]
];
