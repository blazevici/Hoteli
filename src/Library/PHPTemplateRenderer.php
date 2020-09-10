<?php

namespace ExampleApp\Library;

class PHPTemplateRenderer
{
    protected $templateDir;

    protected $vars = array();

    public function __construct() {
        $this->templateDir = $GLOBALS['viewDir'];
    }

    public function render($templateFile) {
        if (file_exists($this->templateDir . '/' .$templateFile)) {
            include $this->templateDir . '/' .$templateFile;
        } else {
            throw new Exception('No template file ' . $templateFile . ' present in directory ' . $this->templateDir);
        }
    }

    public function __set($name, $value) {
        $this->vars[$name] = $value;
    }
    public function __get($name) {
        return $this->vars[$name];
    }

}